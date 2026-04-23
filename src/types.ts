export type WidgetType = 
  | 'kpi' 
  | 'line-chart' 
  | 'bar-chart' 
  | 'pie-chart' 
  | 'table' 
  | 'gauge' 
  | 'assistant';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  w: number; // width in grid columns
  h: number; // height in grid rows
  dataKey: string;
  color?: string;
}

export type Role = 'Admin' | 'Editor' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  lastLogin?: string;
}

export interface KPIData {
  label: string;
  currentValue: number;
  previousValue: number;
  trend: number;
  trendDirection: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  unitPrice: number;
  status: 'available' | 'low-stock' | 'out-of-stock';
  image: string;
  revenue?: number;
  rating?: number;
  sold?: number;
}

export interface Outlet {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'active' | 'inactive';
  lastDelivery: string;
  volume: number;
}

export interface Depot {
  id: string;
  name: string;
  stock: number;
  status: 'optimal' | 'low' | 'critical';
}

export interface SKUPerformance {
  sku: string;
  name: string;
  percentage: number;
  status: 'high' | 'medium' | 'low';
}

export interface LogisticsMetric {
  label: string;
  value: string | number;
  percentage: number;
  status: 'high' | 'medium' | 'low';
}

export interface StockAlert {
  sku: string;
  location: string;
  doi: number;
  status: 'critical' | 'warning' | 'healthy';
  daysToStockout: number;
  action: string;
}

export interface ExpiryInventory {
  sku: string;
  depot: string;
  quantity: number;
  expiryDate: string;
  value: number;
  action: string;
}

export interface AlertMessage {
  id: string;
  text: string;
  type: 'critical' | 'warning' | 'info';
}

export interface FleetVehicle {
  id: string;
  driver: string;
  status: 'in-transit' | 'delayed' | 'loading' | 'maintenance';
  location: string;
  lat: number;
  lng: number;
  eta: string;
  loadPercentage: number;
}

export interface FinancialMetric {
  label: string;
  value: number;
  trend: number;
  prefix?: string;
  suffix?: string;
}

export interface Invoice {
  id: string;
  customerName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  items: number;
}

export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  description: string;
  timestamp: string;
  category: string;
}
