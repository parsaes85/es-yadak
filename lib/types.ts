export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}

export interface CarModel {
  id: string;
  name: string;
  years: string[];
}

export interface CarBrand {
  id: string;
  name: string;
  country: string;
  models: CarModel[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string;
  brand: string;
  categoryId: string;
  subcategoryId: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  isSpecialOffer: boolean;
  isBestSeller: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  shortDescription: string;
  description: string;
  compatibleVehicles: string[];
  specifications: Record<string, string>;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  excerpt: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TicketMessage {
  id: string;
  sender: 'user' | 'support';
  message: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: 'معمولی' | 'متوسط' | 'فوری';
  status: 'پاسخ داده شده' | 'در حال بررسی' | 'بسته شده';
  createdAt: string;
  messages: TicketMessage[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WalletTransaction {
  id: string;
  date: string;
  type: 'charge' | 'payment';
  amount: number;
  description: string;
  trackingCode: string;
}

export interface Order {
  id: string;
  trackingCode: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customerInfo: {
    name: string;
    phone: string;
    province: string;
    city: string;
    address: string;
    postalCode: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  status: 'در حال پردازش' | 'ارسال شده' | 'تحویل شده';
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  nationalCode?: string;
  province?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  carBrand?: string;
  carModel?: string;
  carYear?: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}
