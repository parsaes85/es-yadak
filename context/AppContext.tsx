'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import initialData from '@/data/data.json';
import {
  Product,
  Category,
  CarBrand,
  BlogPost,
  FAQItem,
  CartItem,
  Order,
  Ticket,
  UserProfile,
  WalletTransaction,
  ToastNotification,
} from '@/lib/types';
import { getTodayPersianDate } from '@/lib/formatters';

interface AppContextType {
  // Static Data
  categories: Category[];
  carBrands: CarBrand[];
  products: Product[];
  blogPosts: BlogPost[];
  faq: FAQItem[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalPrice: number;
  couponCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Selected Vehicle (Vehicle selector filter)
  selectedVehicle: {
    brandId: string;
    modelId: string;
    year: string;
  } | null;
  setSelectedVehicle: (vehicle: { brandId: string; modelId: string; year: string } | null) => void;
  clearVehicleFilter: () => void;

  // User & Auth
  user: UserProfile | null;
  login: (phoneOrEmail: string, pass: string) => boolean;
  register: (name: string, phone: string, email: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // Wallet
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  chargeWallet: (amount: number) => void;
  payWithWallet: (amount: number) => boolean;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customerInfo: Order['customerInfo'];
    shippingMethod: string;
    paymentMethod: string;
  }) => Order;

  // Support Tickets
  tickets: Ticket[];
  createTicket: (subject: string, category: string, priority: 'معمولی' | 'متوسط' | 'فوری', message: string) => void;
  replyTicket: (ticketId: string, message: string) => void;
  simulateSupportReply: (ticketId: string) => void;

  // Toast System
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: UserProfile = {
  id: 'USR-8821',
  name: 'علی محمدی',
  phone: '۰۹۱۲۳۴۵۶۷۸۹',
  email: 'ali.mohammadi@example.com',
  nationalCode: '۰۰۱۲۳۴۵۶۷۸',
  province: 'تهران',
  city: 'تهران',
  address: 'خیابان شریعتی، بالاتر از پل رومی، پلاک ۴۲، زنگ ۳',
  postalCode: '۱۹۶۴۸۱۲۳۴۵',
  carBrand: 'peugeot',
  carModel: '206-v5',
  carYear: '۱۳۹۲ تا ۱۴۰۱',
};

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'TRX-101',
    date: '۱۴۰۳/۰۷/۲۵',
    type: 'charge',
    amount: 5000000,
    description: 'افزایش موجودی از درگاه بانک سامان',
    trackingCode: 'SAMAN-889123',
  },
  {
    id: 'TRX-102',
    date: '۱۴۰۳/۰۷/۲۸',
    type: 'payment',
    amount: 1680000,
    description: 'پرداخت سفارش خرید لنت ترمز تکستار',
    trackingCode: 'ORD-7741',
  },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Static catalog data from data.json
  const categories = (initialData.categories as unknown) as Category[];
  const carBrands = (initialData.carBrands as unknown) as CarBrand[];
  const products = (initialData.products as unknown) as Product[];
  const blogPosts = (initialData.blogPosts as unknown) as BlogPost[];
  const faq = (initialData.faq as unknown) as FAQItem[];

  // State with LocalStorage persistence after mount to avoid SSR hydration mismatch
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<{
    brandId: string;
    modelId: string;
    year: string;
  } | null>(null);
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [walletBalance, setWalletBalance] = useState<number>(3320000);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>(
    () => (initialData.initialTickets as unknown) as Ticket[]
  );

  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Load state from localStorage after mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const storedCart = localStorage.getItem('yadak_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem('yadak_wishlist');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedVehicle = localStorage.getItem('yadak_vehicle');
      if (storedVehicle) setSelectedVehicle(JSON.parse(storedVehicle));

      const storedUser = localStorage.getItem('yadak_user');
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedWallet = localStorage.getItem('yadak_wallet');
      if (storedWallet) setWalletBalance(Number(storedWallet));

      const storedTransactions = localStorage.getItem('yadak_transactions');
      if (storedTransactions) setWalletTransactions(JSON.parse(storedTransactions));

      const storedOrders = localStorage.getItem('yadak_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedTickets = localStorage.getItem('yadak_tickets');
      if (storedTickets) setTickets(JSON.parse(storedTickets));
    } catch {}
  }, []);

  // Save to localStorage when states update (only after mount)
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('yadak_cart', JSON.stringify(cart));
    } catch {}
  }, [cart, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('yadak_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      if (selectedVehicle) {
        localStorage.setItem('yadak_vehicle', JSON.stringify(selectedVehicle));
      } else {
        localStorage.removeItem('yadak_vehicle');
      }
    } catch {}
  }, [selectedVehicle, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      if (user) {
        localStorage.setItem('yadak_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('yadak_user');
      }
    } catch {}
  }, [user, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('yadak_wallet', walletBalance.toString());
      localStorage.setItem('yadak_transactions', JSON.stringify(walletTransactions));
    } catch {}
  }, [walletBalance, walletTransactions, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('yadak_orders', JSON.stringify(orders));
    } catch {}
  }, [orders, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('yadak_tickets', JSON.stringify(tickets));
    } catch {}
  }, [tickets, isMounted]);

  // Toast Notifications
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stockCount) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stockCount) }];
    });
    showToast(`«${product.title.slice(0, 28)}...» به سبد خرید افزوده شد`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('کالا از سبد خرید حذف شد', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity: Math.min(quantity, item.product.stockCount) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal === 0 ? 0 : subtotal >= 1500000 ? 0 : 75000;
  const totalPrice = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'YADAK10') {
      setCouponCode(cleanCode);
      setDiscountPercent(10);
      showToast('کد تخفیف ۱۰٪ با موفقیت اعمال شد', 'success');
      return { success: true, message: 'کد تخفیف ۱۰٪ اعمال شد' };
    } else if (cleanCode === 'NOROOZ') {
      setCouponCode(cleanCode);
      setDiscountPercent(15);
      showToast('کد تخفیف ویژه نوروز ۱۵٪ اعمال شد', 'success');
      return { success: true, message: 'کد تخفیف ویژه ۱۵٪ اعمال شد' };
    }
    showToast('کد تخفیف وارد شده نامعتبر یا منقضی شده است', 'error');
    return { success: false, message: 'کد تخفیف نامعتبر است' };
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('از لیست علاقه‌مندی‌ها حذف شد', 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast('به لیست علاقه‌مندی‌ها اضافه شد', 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const clearVehicleFilter = () => {
    setSelectedVehicle(null);
    showToast('فیلتر انتخاب خودرو پاک شد', 'info');
  };

  // User & Auth
  const login = (phoneOrEmail: string) => {
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      phone: phoneOrEmail.includes('@') ? DEFAULT_USER.phone : phoneOrEmail,
      email: phoneOrEmail.includes('@') ? phoneOrEmail : DEFAULT_USER.email,
    };
    setUser(newUser);
    setAuthModalOpen(false);
    showToast(`خوش آمدید، ${newUser.name}`, 'success');
    return true;
  };

  const register = (name: string, phone: string, email: string) => {
    const newUser: UserProfile = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || 'کاربر جدید',
      phone: phone || '۰۹۱۲۰۰۰۰۰۰۰',
      email: email || 'user@example.com',
      nationalCode: '۰۰۱۰۰۰۰۰۰۰',
      province: 'تهران',
      city: 'تهران',
      address: '',
      postalCode: '',
    };
    setUser(newUser);
    setAuthModalOpen(false);
    showToast(`ثبت‌نام با موفقیت انجام شد. خوش آمدید، ${newUser.name}`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('شما با موفقیت از حساب کاربری خارج شدید', 'info');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    showToast('اطلاعات کاربری با موفقیت به‌روزرسانی شد', 'success');
  };

  // Wallet
  const chargeWallet = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
    const newTrx: WalletTransaction = {
      id: `TRX-${Date.now().toString().slice(-6)}`,
      date: getTodayPersianDate(),
      type: 'charge',
      amount,
      description: 'شارژ آنلاین کیف پول از درگاه شتاب',
      trackingCode: `SHETAB-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setWalletTransactions((prev) => [newTrx, ...prev]);
    showToast(`کیف پول با موفقیت به مبلغ ${amount.toLocaleString('fa-IR')} تومان شارژ شد`, 'success');
  };

  const payWithWallet = (amount: number) => {
    if (walletBalance < amount) {
      showToast('موجودی کیف پول برای پرداخت این سفارش کافی نیست', 'error');
      return false;
    }
    setWalletBalance((prev) => prev - amount);
    const newTrx: WalletTransaction = {
      id: `TRX-${Date.now().toString().slice(-6)}`,
      date: getTodayPersianDate(),
      type: 'payment',
      amount,
      description: 'پرداخت فاکتور خرید سفارش',
      trackingCode: `PAY-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setWalletTransactions((prev) => [newTrx, ...prev]);
    return true;
  };

  // Orders
  const createOrder = (orderData: {
    customerInfo: Order['customerInfo'];
    shippingMethod: string;
    paymentMethod: string;
  }) => {
    const orderId = `YDK-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingCode = `POST-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const newOrder: Order = {
      id: orderId,
      trackingCode,
      date: getTodayPersianDate(),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shippingFee,
      total: totalPrice,
      customerInfo: orderData.customerInfo,
      shippingMethod: orderData.shippingMethod,
      paymentMethod: orderData.paymentMethod,
      status: 'در حال پردازش',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`سفارش شما با شناسه ${orderId} با موفقیت ثبت شد`, 'success');
    return newOrder;
  };

  // Support Tickets
  const createTicket = (
    subject: string,
    category: string,
    priority: 'معمولی' | 'متوسط' | 'فوری',
    message: string
  ) => {
    const newTicket: Ticket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject,
      category,
      priority,
      status: 'در حال بررسی',
      createdAt: `${getTodayPersianDate()} - ۱۲:۰۰`,
      messages: [
        {
          id: `m-${Date.now()}`,
          sender: 'user',
          message,
          timestamp: `${getTodayPersianDate()} - ۱۲:۰۰`,
        },
      ],
    };
    setTickets((prev) => [newTicket, ...prev]);
    showToast('تیکت پشتیبانی جدید با موفقیت ثبت شد', 'success');
  };

  const replyTicket = (ticketId: string, message: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'در حال بررسی',
            messages: [
              ...t.messages,
              {
                id: `m-${Date.now()}`,
                sender: 'user',
                message,
                timestamp: `${getTodayPersianDate()} - دقایقی پیش`,
              },
            ],
          };
        }
        return t;
      })
    );
    showToast('پاسخ شما با موفقیت به تیکت ارسال شد', 'success');
  };

  const simulateSupportReply = (ticketId: string) => {
    setTimeout(() => {
      setTickets((prev) =>
        prev.map((t) => {
          if (t.id === ticketId) {
            return {
              ...t,
              status: 'پاسخ داده شده',
              messages: [
                ...t.messages,
                {
                  id: `m-${Date.now()}`,
                  sender: 'support',
                  message:
                    'سلام و احترام؛ پیام شما توسط تیم فنی ای‌اس یدک بررسی گردید. کالا یا درخواست شما کاملاً مورد تایید است و همکاران بخش انبار اقدامات لازم را انجام دادند. در صورت داشتن هرگونه سوال تکمیلی در خدمت شما هستیم.',
                  timestamp: `${getTodayPersianDate()} - همین الان`,
                },
              ],
            };
          }
          return t;
        })
      );
      showToast('پاسخ جدید کارشناس پشتیبانی برای تیکت شما دریافت شد', 'info');
    }, 900);
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        carBrands,
        products,
        blogPosts,
        faq,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        shippingFee,
        totalPrice,
        couponCode,
        applyCoupon,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        selectedVehicle,
        setSelectedVehicle,
        clearVehicleFilter,
        user,
        login,
        register,
        logout,
        updateProfile,
        isAuthModalOpen,
        setAuthModalOpen,
        walletBalance,
        walletTransactions,
        chargeWallet,
        payWithWallet,
        orders,
        createOrder,
        tickets,
        createTicket,
        replyTicket,
        simulateSupportReply,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
