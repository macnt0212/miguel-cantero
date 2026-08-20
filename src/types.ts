export type ServiceCategory = 'redes' | 'camaras' | 'automatizacion' | 'impresoras' | 'reparacion' | 'ventas';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  specs: { label: string; value: string }[];
  idealFor: string;
  startingPrice?: string;
  badge?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'pc_laptops' | 'redes' | 'seguridad' | 'impresoras' | 'componentes' | 'automatizacion';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  brand: string;
  description: string;
  specs: string[];
  tags: string[];
  featured?: boolean;
}

export interface JobOpening {
  id: string;
  title: string;
  department: 'Redes e Infraestructura' | 'Seguridad Electrónica' | 'Laboratorio Técnico' | 'Automatización & IoT' | 'Ventas y Comercial';
  type: 'Tiempo Completo' | 'Medio Tiempo' | 'Híbrido' | 'Presencial';
  location: 'Sede Central / En terreno' | 'Laboratorio Técnico' | 'Oficina Comercial';
  experience: string;
  salaryRange: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  urgency: 'Urgente' | 'Abierta' | 'Nuevo';
}

export interface RepairTimelineEvent {
  title: string;
  date: string;
  time: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
}

export interface RepairTicket {
  ticketCode: string;
  clientName: string;
  deviceType: string;
  model: string;
  serialOrImei: string;
  entryDate: string;
  estimatedDeliveryDate: string;
  currentStatus: 'Ingresado' | 'En Diagnóstico' | 'Aprobación de Presupuesto' | 'En Reparación' | 'Control de Calidad' | 'Listo para Retiro' | 'Entregado';
  progressPercentage: number;
  technicianAssigned: string;
  reportedIssue: string;
  diagnosticNotes: string;
  partsReplaced: string[];
  costEstimate: number;
  timeline: RepairTimelineEvent[];
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface SampleItem {
  id: string;
  title: string;
  category: 'reparaciones' | 'insumos' | 'redes_cctv' | 'impresoras';
  categoryLabel: string;
  image: string;
  thumbnail?: string;
  badge: string;
  description: string;
  details: string[];
  toolsUsedOrSpecs?: string[];
  dateOrCode?: string;
  price?: number;
  priceLabel?: string;
  costBreakdown?: { label: string; amount: number }[];
}

export interface CompanyStat {
  label: string;
  value: string;
  subtext: string;
  icon: string;
  change?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedNav?: string;
  suggestedActionLabel?: string;
  source?: string;
}

export interface ServiceRequestTicket {
  id: string;
  name: string;
  contact: string;
  serviceType: string;
  details: string;
  status: 'recibido' | 'en_revision' | 'contactado';
  createdAt: string;
}

