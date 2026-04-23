# Firestore Security Specification

## Data Invariants
1. KPI data can only be modified by Admins.
2. User profiles can only be modified by the owner or an Admin.
3. Products can only be modified by Admins.
4. All IDs must be alphanumeric and under 128 characters.

## The Dirty Dozen Payloads (Rejections)
1. Write to `/kpis/pageViews` as unauthenticated user.
2. Update `/users/alex` as user `bob`.
3. Create KPI with string as `currentValue`.
4. Inject 1MB string into product name.
5. Set `role: "Admin"` on user profile during self-registration as a non-admin.
6. Delete a KPI as a regular User.
7. List all user profiles without filtering for own profile (unless Admin).
8. Create product with negative revenue.
9. Change `createdAt` timestamp on a user profile.
10. Use a 200 character ID.
11. Update product selling status for someone else's store (if multi-tenant added later).
12. Read private system logs collection (if added).

## Draft Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 0. Global Safety Net
    match /{document=**} {
      allow read, write: if false;
    }

    // 3. Primitives
    function isSignedIn() { return request.auth != null; }
    function isValidId(id) { return id is string && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\\\-]+$'); }
    function incoming() { return request.resource.data; }
    function existing() { return resource.data; }
    
    // Auth token checks
    function isOwner(userId) { return isSignedIn() && request.auth.uid == userId; }
    function isAdmin() { 
      return isSignedIn() && (
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "Admin"
      );
    }

    // 2. Validation Blueprints
    function isValidUser(data) {
      return data.keys().hasAll(['id', 'name', 'email', 'role']) && 
             data.keys().size() <= 6 &&
             data.id is string && data.id.size() <= 128 &&
             data.name is string && data.name.size() <= 100 &&
             data.email is string && data.email.size() <= 100 &&
             data.role in ['Admin', 'Editor', 'Viewer'] &&
             (data.avatar == null || (data.avatar is string && data.avatar.size() <= 2000));
    }

    function isValidKPI(data) {
      return data.label is string && data.label.size() <= 50 &&
             data.currentValue is number &&
             (data.previousValue == null || data.previousValue is number) &&
             (data.trend == null || data.trend is number);
    }

    // 4. match blocks
    match /users/{userId} {
      allow get: if isSignedIn();
      allow list: if isAdmin() || isOwner(userId);
      allow create: if isSignedIn() && isValidId(userId) && isValidUser(incoming()) && (
        // Prevent self-escalation to Admin during creation
        (incoming().role != "Admin") || isAdmin()
      );
      allow update: if isSignedIn() && isValidUser(incoming()) && (
        isAdmin() || (isOwner(userId) && incoming().role == existing().role)
      );
    }

    match /kpis/{kpiId} {
      allow read: if isSignedIn();
      allow write: if isAdmin() && isValidKPI(incoming());
    }

    match /products/{productId} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
  }
}
```
