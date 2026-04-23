import { 
  KPIData, 
  ChartDataPoint, 
  Outlet, 
  Depot, 
  SKUPerformance, 
  LogisticsMetric, 
  StockAlert, 
  ExpiryInventory, 
  AlertMessage,
  FleetVehicle,
  FinancialMetric,
  Product,
  User,
  Invoice,
  Transaction
} from '../types';

export const mockKPIs: Record<string, KPIData> = {
  stockout: {
    label: 'Stockout Rate',
    currentValue: 3.8,
    previousValue: 2.6,
    trend: 1.2,
    trendDirection: 'up',
    icon: 'AlertTriangle'
  },
  doi: {
    label: 'Turns (DOI)',
    currentValue: 18.2,
    previousValue: 20.3,
    trend: -2.1,
    trendDirection: 'down',
    icon: 'RefreshCw'
  },
  fillRate: {
    label: 'Fill Rate (7d)',
    currentValue: 96.4,
    previousValue: 95.6,
    trend: 0.8,
    trendDirection: 'up',
    icon: 'CheckCircle'
  },
  otif: {
    label: 'OTIF Today',
    currentValue: 94.2,
    previousValue: 92.1,
    trend: 2.1,
    trendDirection: 'up',
    icon: 'Truck'
  }
};

export const mockAlertMessages: AlertMessage[] = [
  { id: '1', text: '3 SKUs critically low in Lagos depot', type: 'critical' },
  { id: '2', text: '2 Routes delayed by 2+ hours (Ogun/Ondo)', type: 'warning' },
  { id: '3', text: '₦4.2M inventory near expiry (45 days)', type: 'critical' },
];

export const mockDepots: Depot[] = [
  { id: 'D1', name: 'Lagos', stock: 12, status: 'critical' },
  { id: 'D2', name: 'Abuja', stock: 24, status: 'optimal' },
  { id: 'D3', name: 'Port Harcourt', stock: 28, status: 'optimal' },
  { id: 'D4', name: 'Kano', stock: 21, status: 'optimal' },
  { id: 'D5', name: 'Ibadan', stock: 15, status: 'low' },
  { id: 'D6', name: 'Enugu', stock: 26, status: 'optimal' },
];

export const mockSKUPerformance: SKUPerformance[] = [
  { sku: '#C-50PET', name: 'Coke 50cl PET', percentage: 96, status: 'high' },
  { sku: '#C-33CAN', name: 'Coke 33cl Can', percentage: 88, status: 'high' },
  { sku: '#S-50PET', name: 'Sprite 50cl PET', percentage: 72, status: 'medium' },
  { sku: '#F-50PET', name: 'Fanta 50cl PET', percentage: 65, status: 'medium' },
  { sku: '#C-1.5PET', name: 'Coke 1.5L PET', percentage: 42, status: 'low' },
];

export const mockLogisticsMetrics: LogisticsMetric[] = [
  { label: 'OTIF (On-Time-In-Full)', value: '94.2%', percentage: 94.2, status: 'high' },
  { label: 'Fleet Utilization', value: '87%', percentage: 87, status: 'high' },
  { label: 'Cost per Case Delivered', value: '₦142', percentage: 91, status: 'high' },
  { label: 'Return/Breakage Rate', value: '2.1%', percentage: 21, status: 'low' },
  { label: 'Empty Returnables Rate', value: '68%', percentage: 68, status: 'medium' },
];

export const mockStockAlerts: StockAlert[] = [
  { sku: 'Coke 50cl PET', location: 'Lagos Central', doi: 2.1, status: 'critical', daysToStockout: 2, action: 'Emergency restock' },
  { sku: 'Sprite 50cl PET', location: 'Lagos Central', doi: 3.4, status: 'critical', daysToStockout: 3, action: 'Rush order placed' },
  { sku: 'Fanta Orange 50cl', location: 'Lagos Central', doi: 4.2, status: 'warning', daysToStockout: 4, action: 'Prioritize production' },
  { sku: 'Coke 33cl Can', location: 'Ibadan', doi: 5.8, status: 'warning', daysToStockout: 6, action: 'Schedule delivery' },
  { sku: 'Schweppes Tonic 33cl', location: 'Port Harcourt', doi: 8.2, status: 'healthy', daysToStockout: 8, action: 'Monitor' },
];

export const mockExpiryInventory: ExpiryInventory[] = [
  { sku: 'Coke 1.5L PET', depot: 'Lagos North', quantity: 2840, expiryDate: 'May 15, 2026', value: 1420000, action: 'Promo push - Traditional trade' },
  { sku: 'Sprite 1L PET', depot: 'Kano', quantity: 1620, expiryDate: 'May 28, 2026', value: 810000, action: 'Redistribute velocity' },
  { sku: 'Fanta Pineapple 50cl', depot: 'Enugu', quantity: 3200, expiryDate: 'June 2, 2026', value: 1600000, action: 'Volume discount' },
  { sku: 'Schweppes Ginger 33cl', depot: 'Port Harcourt', quantity: 740, expiryDate: 'June 5, 2026', value: 370000, action: 'Transfer to Lagos' },
];

export const productionData: ChartDataPoint[] = [
  { name: 'Mon', value: 142000 },
  { name: 'Tue', value: 156000 },
  { name: 'Wed', value: 128000 },
  { name: 'Thu', value: 162000 },
  { name: 'Fri', value: 148000 },
  { name: 'Sat', value: 172000 },
  { name: 'Sun', value: 118000 },
];

export const fleetVehicles: FleetVehicle[] = [
  { id: 'NG-LAG-001', driver: 'Chinedu O.', status: 'in-transit', location: 'Lagos-Ibadan Exp', lat: 6.75, lng: 3.42, eta: '14:20', loadPercentage: 92 },
  { id: 'NG-LAG-012', driver: 'Babajide A.', status: 'delayed', location: 'Ikorodu Rd', lat: 6.60, lng: 3.35, eta: '16:00', loadPercentage: 85 },
  { id: 'NG-ABJ-004', driver: 'Sani M.', status: 'loading', location: 'Gwagwalada Depot', lat: 8.95, lng: 7.08, eta: 'N/A', loadPercentage: 45 },
  { id: 'NG-KNO-008', driver: 'Ibrahim K.', status: 'in-transit', location: 'Zaria Hwy', lat: 11.85, lng: 8.42, eta: '15:10', loadPercentage: 100 },
  { id: 'NG-PHC-002', driver: 'Ezenwa U.', status: 'maintenance', location: 'Main Workshop', lat: 4.85, lng: 7.02, eta: 'N/A', loadPercentage: 0 },
];

export const financialSummaries: FinancialMetric[] = [
  { label: 'Gross Revenue', value: 1420000000, trend: 12.4, prefix: '₦' },
  { label: 'COGS', value: 842000000, trend: -2.1, prefix: '₦' },
  { label: 'Delivery Cost', value: 156000000, trend: 4.8, prefix: '₦' },
  { label: 'Marketing ROI', value: 4.2, trend: 0.8, suffix: 'x' },
];

export const profitData: ChartDataPoint[] = [
  { name: 'Week 1', value: 12000, trend: 11000 },
  { name: 'Week 2', value: 14500, trend: 13000 },
  { name: 'Week 3', value: 13800, trend: 14200 },
  { name: 'Week 4', value: 16200, trend: 15500 },
  { name: 'Week 5', value: 15800, trend: 16000 },
  { name: 'Week 6', value: 18400, trend: 17200 },
  { name: 'Week 7', value: 17900, trend: 18100 },
  { name: 'Week 8', value: 20500, trend: 19400 },
];

export const mockOutlets: Outlet[] = [
  { id: 'O- Lagos-01', name: 'Ikeja Mega Plaza', lat: 6.5967, lng: 3.3442, status: 'active', lastDelivery: '2025-01-20', volume: 1200 },
  { id: 'O-Lagos-02', name: 'Victoria Island Mall', lat: 6.4281, lng: 3.4219, status: 'active', lastDelivery: '2025-01-21', volume: 1500 },
  { id: 'O-Abuja-01', name: 'Wuse District Store', lat: 9.0667, lng: 7.4833, status: 'active', lastDelivery: '2025-01-19', volume: 950 },
  { id: 'O-Ibadan-01', name: 'Bodija Market Hub', lat: 7.4167, lng: 3.9167, status: 'active', lastDelivery: '2025-01-22', volume: 800 },
  { id: 'O-Kano-01', name: 'Kano Central Plaza', lat: 12.0000, lng: 8.5167, status: 'inactive', lastDelivery: '2025-01-15', volume: 400 },
  { id: 'O-PortHarcourt-01', name: 'PH Garden City Mall', lat: 4.8156, lng: 7.0498, status: 'active', lastDelivery: '2025-01-21', volume: 1100 },
  { id: 'O-Enugu-01', name: 'Enugu City Center', lat: 6.4483, lng: 7.5139, status: 'active', lastDelivery: '2025-01-20', volume: 600 },
];

export const generateRealtimePulse = () => {
  return Math.random() * 10 - 5; // -5% to +5% jitter
};

export const mockProducts: Product[] = [
  {
    id: 'P1',
    name: 'Coca-Cola Classic',
    sku: 'CC-001',
    category: 'Carbonated Soft Drinks',
    stock: 12500,
    unitPrice: 150,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200',
    sold: 45000,
    revenue: 6750000
  },
  {
    id: 'P2',
    name: 'Sprite Lemon-Lime',
    sku: 'SP-002',
    category: 'Carbonated Soft Drinks',
    stock: 8400,
    unitPrice: 140,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=200',
    sold: 32000,
    revenue: 4480000
  },
  {
    id: 'P3',
    name: 'Fanta Orange',
    sku: 'FN-003',
    category: 'Carbonated Soft Drinks',
    stock: 1200,
    unitPrice: 140,
    status: 'low-stock',
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=200',
    sold: 28000,
    revenue: 3920000
  },
  {
    id: 'P4',
    name: 'Eva Water 75cl',
    sku: 'EV-004',
    category: 'Water',
    stock: 25000,
    unitPrice: 100,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=200',
    sold: 60000,
    revenue: 6000000
  },
  {
    id: 'P5',
    name: '5Alive Pulpy Orange',
    sku: '5A-005',
    category: 'Juice',
    stock: 0,
    unitPrice: 450,
    status: 'out-of-stock',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=200',
    sold: 15000,
    revenue: 6750000
  }
];

export const mockUsers: User[] = [
  {
    id: 'U1',
    name: 'Babajide Afolabi',
    email: 'b.afolabi@coke-ng.com',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?u=U1',
    lastLogin: '2026-04-22 08:45 AM'
  },
  {
    id: 'U2',
    name: 'Chinedu Okeke',
    email: 'c.okeke@coke-ng.com',
    role: 'Editor',
    avatar: 'https://i.pravatar.cc/150?u=U2',
    lastLogin: '2026-04-21 04:20 PM'
  },
  {
    id: 'U3',
    name: 'Sani Musa',
    email: 's.musa@coke-ng.com',
    role: 'Viewer',
    avatar: 'https://i.pravatar.cc/150?u=U3',
    lastLogin: '2026-04-22 09:12 AM'
  },
  {
    id: 'U4',
    name: 'Ibrahim Kazeem',
    email: 'i.kazeem@coke-ng.com',
    role: 'Editor',
    avatar: 'https://i.pravatar.cc/150?u=U4',
    lastLogin: '2026-04-20 11:30 AM'
  },
  {
    id: 'U5',
    name: 'Ezenwa Uzor',
    email: 'e.uzor@coke-ng.com',
    role: 'Viewer',
    avatar: 'https://i.pravatar.cc/150?u=U5',
    lastLogin: '2026-04-19 02:15 PM'
  }
];

export const mockInvoices: Invoice[] = [
  { id: 'INV-2026-001', customerName: 'Ikeja Mega Plaza', amount: 1420000, date: '2026-04-20', status: 'paid', items: 250 },
  { id: 'INV-2026-002', customerName: 'Victoria Island Mall', amount: 2850000, date: '2026-04-21', status: 'pending', items: 500 },
  { id: 'INV-2026-003', customerName: 'Bodija Market Hub', amount: 840000, date: '2026-04-18', status: 'overdue', items: 150 },
  { id: 'INV-2026-004', customerName: 'Wuse District Store', amount: 1120000, date: '2026-04-22', status: 'pending', items: 200 },
  { id: 'INV-2026-005', customerName: 'PH Garden City Mall', amount: 3200000, date: '2026-04-19', status: 'paid', items: 600 },
];

export const mockTransactions: Transaction[] = [
  { id: 'TXN-9901', type: 'incoming', amount: 1420000, description: 'Invoice Payment - Ikeja', timestamp: '2026-04-22 09:15 AM', category: 'Sales' },
  { id: 'TXN-9902', type: 'outgoing', amount: 450000, description: 'Logistics Partnership - GIGL', timestamp: '2026-04-21 02:30 PM', category: 'Logistics' },
  { id: 'TXN-9903', type: 'outgoing', amount: 120000, description: 'Fuel Subsidy - Lagos Fleet', timestamp: '2026-04-21 11:00 AM', category: 'Operations' },
  { id: 'TXN-9904', type: 'incoming', amount: 890000, description: 'Promotional Rebate - Retail', timestamp: '2026-04-20 04:45 PM', category: 'Marketing' },
  { id: 'TXN-9905', type: 'incoming', amount: 2100000, description: 'Bulk Order - Northern Cluster', timestamp: '2026-04-20 10:20 AM', category: 'Sales' },
];
