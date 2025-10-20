import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import QRScanner from '@/components/QRScanner';
import SignaturePad from '@/components/SignaturePad';
import DocumentCamera from '@/components/DocumentCamera';
import { generateInvoicePDF, generatePaymentReceiptPDF } from '@/utils/pdfGenerator';

const lineData = [
  { name: 'Янв', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Фев', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Мар', revenue: 5000, expenses: 3800, profit: 1200 },
  { name: 'Апр', revenue: 7800, expenses: 3908, profit: 3892 },
  { name: 'Май', revenue: 5890, expenses: 4800, profit: 1090 },
  { name: 'Июн', revenue: 8390, expenses: 3800, profit: 4590 },
  { name: 'Июл', revenue: 9490, expenses: 4300, profit: 5190 },
];

const barData = [
  { name: 'Утеплитель', sales: 4200 },
  { name: 'Гидроизоляция', sales: 3800 },
  { name: 'Геосинтетика', sales: 2900 },
  { name: 'Плоская кровля', sales: 2400 },
  { name: 'Звукоизоляция', sales: 1950 },
];

const pieData = [
  { name: 'Розница', value: 42, color: '#003d7a' },
  { name: 'Опт', value: 35, color: '#ff7e1f' },
  { name: 'Дилеры', value: 15, color: '#0066a1' },
  { name: 'Онлайн', value: 8, color: '#ffb366' },
];

const forecastData = [
  { material: 'Утеплитель ROCKWOOL', current: 842, forecast: 920, trend: '+9.3%', status: 'up' },
  { material: 'Гидроизоляция ТЕХНОНИКОЛЬ', current: 654, forecast: 710, trend: '+8.6%', status: 'up' },
  { material: 'Геосинтетика', current: 423, forecast: 395, trend: '-6.6%', status: 'down' },
  { material: 'Фасадные системы', current: 318, forecast: 355, trend: '+11.6%', status: 'up' },
  { material: 'Звукоизоляция', current: 267, forecast: 285, trend: '+6.7%', status: 'up' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [notifications, setNotifications] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [customerLoyaltyPoints, setCustomerLoyaltyPoints] = useState<any>({});
  const [activePromotions, setActivePromotions] = useState<any[]>([]);
  const [referralCode, setReferralCode] = useState('');
  const [emailCampaigns, setEmailCampaigns] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([
    {
      id: 'ЗК-2850',
      date: '2024-10-18',
      status: 'delivered',
      total: 543800,
      items: [
        { name: 'Гидроизоляция ТЕХНОНИКОЛЬ', quantity: 38, price: 3200, image: '💧' },
        { name: 'Утеплитель ROCKWOOL', quantity: 120, price: 2850, image: '🏗️' }
      ],
      customer: 'ООО "СтройТех"',
      address: 'Москва, ул. Строителей, д. 15',
      trackingSteps: [
        { label: 'Заказ оформлен', date: '18.10.2024 10:15', completed: true },
        { label: 'Подтверждён менеджером', date: '18.10.2024 10:45', completed: true },
        { label: 'Собран на складе', date: '18.10.2024 14:20', completed: true },
        { label: 'Отправлен в доставку', date: '19.10.2024 08:00', completed: true },
        { label: 'Доставлен', date: '19.10.2024 15:30', completed: true }
      ]
    },
    {
      id: 'ЗК-2845',
      date: '2024-10-17',
      status: 'in-transit',
      total: 728500,
      items: [
        { name: 'Плоская кровля LOGICROOF', quantity: 62, price: 4500, image: '🏢' },
        { name: 'Фасадные панели Hauberk', quantity: 112, price: 2100, image: '🧱' }
      ],
      customer: 'ООО "МонолитСтрой"',
      address: 'Санкт-Петербург, Невский пр., д. 88',
      trackingSteps: [
        { label: 'Заказ оформлен', date: '17.10.2024 09:20', completed: true },
        { label: 'Подтверждён менеджером', date: '17.10.2024 10:00', completed: true },
        { label: 'Собран на складе', date: '17.10.2024 16:30', completed: true },
        { label: 'Отправлен в доставку', date: '18.10.2024 07:15', completed: true },
        { label: 'Доставлен', date: '', completed: false, estimated: '20.10.2024' }
      ]
    },
    {
      id: 'ЗК-2843',
      date: '2024-10-16',
      status: 'processing',
      total: 445600,
      items: [
        { name: 'Звукоизоляция ROCKWOOL', quantity: 76, price: 3400, image: '🔇' },
        { name: 'Геотекстиль Дорнит', quantity: 2890, price: 45, image: '🗺️' }
      ],
      customer: 'ИП Соколов А.В.',
      address: 'Казань, пр. Победы, д. 45',
      trackingSteps: [
        { label: 'Заказ оформлен', date: '16.10.2024 14:50', completed: true },
        { label: 'Подтверждён менеджером', date: '16.10.2024 15:20', completed: true },
        { label: 'Собран на складе', date: '', completed: false, estimated: '20.10.2024 12:00' },
        { label: 'Отправлен в доставку', date: '', completed: false },
        { label: 'Доставлен', date: '', completed: false }
      ]
    },
    {
      id: 'ЗК-2840',
      date: '2024-10-15',
      status: 'cancelled',
      total: 156800,
      items: [
        { name: 'Базальтовая вата ISOVER', quantity: 143, price: 2200, image: '🏗️' }
      ],
      customer: 'ООО "Ремонт+"',
      address: 'Екатеринбург, ул. Ленина, д. 23',
      trackingSteps: [
        { label: 'Заказ оформлен', date: '15.10.2024 11:10', completed: true },
        { label: 'Отменён клиентом', date: '15.10.2024 12:40', completed: true }
      ]
    }
  ]);
  
  const openModal = (content: any) => {
    setModalContent(content);
    setModalOpen(true);
    if (content.type === 'product') {
      setProductQuantity(1);
    }
  };

  const addToCart = (product: any, quantity: number) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    setModalOpen(false);
    setTimeout(() => {
      setCartOpen(true);
    }, 300);
  };

  const createOrder = (customerData: any) => {
    const newOrder = {
      id: `ЗК-${Math.floor(Math.random() * 10000 + 2000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      total: getCartTotal(),
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: parseInt(item.price.replace(/[^0-9]/g, '')),
        image: item.image
      })),
      customer: customerData.name || 'Не указано',
      address: customerData.address || 'Не указано',
      trackingSteps: [
        { label: 'Заказ оформлен', date: new Date().toLocaleString('ru-RU'), completed: true },
        { label: 'Подтверждён менеджером', date: '', completed: false },
        { label: 'Собран на складе', date: '', completed: false },
        { label: 'Отправлен в доставку', date: '', completed: false },
        { label: 'Доставлен', date: '', completed: false }
      ]
    };
    setOrders([newOrder, ...orders]);
    return newOrder.id;
  };

  const getStatusLabel = (status: string) => {
    const labels: any = {
      'processing': 'В обработке',
      'in-transit': 'В пути',
      'delivered': 'Доставлен',
      'cancelled': 'Отменён'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      'processing': 'bg-blue-100 text-blue-700',
      'in-transit': 'bg-orange-100 text-orange-700',
      'delivered': 'bg-green-100 text-green-700',
      'cancelled': 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const categories = [
    { id: 'all', label: 'Все материалы', icon: 'Grid3x3' },
    { id: 'insulation', label: 'Утеплитель', icon: 'Home' },
    { id: 'waterproofing', label: 'Гидроизоляция', icon: 'Droplet' },
    { id: 'roofing', label: 'Плоская кровля', icon: 'Building2' },
    { id: 'facade', label: 'Фасадные системы', icon: 'Layers' },
    { id: 'geosynthetics', label: 'Геосинтетика', icon: 'Map' },
    { id: 'soundproofing', label: 'Звукоизоляция', icon: 'Volume2' },
  ];

  const products = [
    { id: 1, name: 'ROCKWOOL Лайт Баттс Скандик', category: 'insulation', price: '₽2,850/м²', stock: 12450, rating: 4.8, image: '🏗️', brand: 'ROCKWOOL', specs: '1000×600×50 мм' },
    { id: 2, name: 'ТЕХНОНИКОЛЬ Техноэласт ЭПП', category: 'waterproofing', price: '₽3,200/м²', stock: 8340, rating: 4.9, image: '💧', brand: 'ТЕХНОНИКОЛЬ', specs: 'Рулон 10×1 м' },
    { id: 3, name: 'LOGICPIR Балкон', category: 'insulation', price: '₽1,950/м²', stock: 15600, rating: 4.7, image: '🏗️', brand: 'ТЕХНОНИКОЛЬ', specs: '1185×585×30 мм' },
    { id: 4, name: 'Гидроизоляция Филизол Стандарт', category: 'waterproofing', price: '₽1,450/м²', stock: 9870, rating: 4.6, image: '💧', brand: 'Филизол', specs: 'Рулон 15×1 м' },
    { id: 5, name: 'ПВХ мембрана LOGICROOF V-RP', category: 'roofing', price: '₽4,500/м²', stock: 6230, rating: 4.9, image: '🏢', brand: 'ТЕХНОНИКОЛЬ', specs: '2.05×20 м' },
    { id: 6, name: 'Фасадные панели Hauberk', category: 'facade', price: '₽2,100/м²', stock: 11200, rating: 4.8, image: '🧱', brand: 'ТЕХНОНИКОЛЬ', specs: '1000×250 мм' },
    { id: 7, name: 'Геотекстиль Дорнит 200', category: 'geosynthetics', price: '₽45/м²', stock: 28900, rating: 4.5, image: '🗺️', brand: 'Дорнит', specs: 'Рулон 50×2.2 м' },
    { id: 8, name: 'ROCKWOOL Акустик Баттс', category: 'soundproofing', price: '₽3,400/м²', stock: 7650, rating: 4.9, image: '🔇', brand: 'ROCKWOOL', specs: '1000×600×50 мм' },
    { id: 9, name: 'Базальтовая вата ISOVER', category: 'insulation', price: '₽2,200/м²', stock: 14300, rating: 4.6, image: '🏗️', brand: 'ISOVER', specs: '1170×610×50 мм' },
    { id: 10, name: 'Мастика битумная AquaMast', category: 'waterproofing', price: '₽890/м²', stock: 18400, rating: 4.4, image: '💧', brand: 'ТЕХНОНИКОЛЬ', specs: 'Ведро 18 кг' },
    { id: 11, name: 'Фасадная система Ceresit', category: 'facade', price: '₽5,200/м²', stock: 4580, rating: 4.8, image: '🧱', brand: 'Ceresit', specs: 'Комплект' },
    { id: 12, name: 'Геомембрана LDPE', category: 'geosynthetics', price: '₽320/м²', stock: 22100, rating: 4.7, image: '🗺️', brand: 'Solmax', specs: 'Рулон 50×7 м' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'catalog', label: 'Каталог', icon: 'Grid3x3' },
    { id: 'orders', label: 'Заказы', icon: 'ShoppingBag' },
    { id: 'crm', label: 'CRM', icon: 'Users' },
    { id: 'marketing', label: 'Маркетинг', icon: 'Megaphone' },
    { id: 'analytics', label: 'Аналитика', icon: 'TrendingUp' },
    { id: 'finance', label: 'Финансы', icon: 'Wallet' },
    { id: 'mobile', label: 'Мобильные', icon: 'Smartphone' },
    { id: 'reports', label: 'Отчёты', icon: 'FileText' },
    { id: 'history', label: 'История', icon: 'Clock' },
  ];

  const topCustomers = [
    { 
      id: 1,
      name: 'ООО "СтройТех"', 
      purchases: 3450000, 
      orders: 28, 
      growth: '+15.3%', 
      status: 'vip', 
      loyaltyPoints: 34500, 
      tier: 'Платина',
      manager: 'Иванов И.И.',
      phone: '+7 (495) 123-45-67',
      email: 'info@stroyteh.ru',
      lastContact: '2024-10-18',
      nextTask: 'Отправить КП на фасадные системы',
      taskDate: '2024-10-21',
      source: 'Реклама Яндекс',
      tags: ['VIP', 'Опт', 'Постоянный']
    },
    { 
      id: 2,
      name: 'ООО "МонолитСтрой"', 
      purchases: 2890000, 
      orders: 22, 
      growth: '+22.8%', 
      status: 'vip', 
      loyaltyPoints: 28900, 
      tier: 'Платина',
      manager: 'Петрова А.С.',
      phone: '+7 (499) 234-56-78',
      email: 'zakaz@monolitstroy.ru',
      lastContact: '2024-10-17',
      nextTask: 'Перезвонить по новому заказу',
      taskDate: '2024-10-20',
      source: 'Рекомендация',
      tags: ['VIP', 'Строительство', 'Быстрая оплата']
    },
    { 
      id: 3,
      name: 'ИП Петров А.С.', 
      purchases: 1650000, 
      orders: 35, 
      growth: '+8.5%', 
      status: 'regular', 
      loyaltyPoints: 16500, 
      tier: 'Золото',
      manager: 'Сидоров В.М.',
      phone: '+7 (926) 345-67-89',
      email: 'petrov.as@mail.ru',
      lastContact: '2024-10-19',
      nextTask: 'Согласовать условия доставки',
      taskDate: '2024-10-22',
      source: 'Сайт',
      tags: ['Розница', 'Частые заказы']
    },
    { 
      id: 4,
      name: 'ООО "ГлавСтрой"', 
      purchases: 1480000, 
      orders: 18, 
      growth: '+12.1%', 
      status: 'regular', 
      loyaltyPoints: 14800, 
      tier: 'Золото',
      manager: 'Иванов И.И.',
      phone: '+7 (495) 456-78-90',
      email: 'glavstroy@yandex.ru',
      lastContact: '2024-10-16',
      nextTask: 'Презентация новых материалов',
      taskDate: '2024-10-23',
      source: 'Холодный звонок',
      tags: ['Опт', 'Сезонный']
    },
    { 
      id: 5,
      name: 'ООО "Базис"', 
      purchases: 1320000, 
      orders: 24, 
      growth: '+19.4%', 
      status: 'regular', 
      loyaltyPoints: 13200, 
      tier: 'Серебро',
      manager: 'Петрова А.С.',
      phone: '+7 (499) 567-89-01',
      email: 'order@basis.com',
      lastContact: '2024-10-15',
      nextTask: 'Уточнить потребность на ноябрь',
      taskDate: '2024-10-25',
      source: 'Выставка',
      tags: ['Опт', 'Новый']
    },
    { 
      id: 6,
      name: 'ИП Сидоров В.М.', 
      purchases: 980000, 
      orders: 16, 
      growth: '+5.2%', 
      status: 'regular', 
      loyaltyPoints: 9800, 
      tier: 'Серебро',
      manager: 'Сидоров В.М.',
      phone: '+7 (916) 678-90-12',
      email: 'sidorov.vm@gmail.com',
      lastContact: '2024-10-14',
      nextTask: 'Отправить счёт',
      taskDate: '2024-10-20',
      source: 'Referral',
      tags: ['Розница', 'Требует внимания']
    },
  ];

  const managers = [
    { 
      id: 1, 
      name: 'Иванов И.И.', 
      clients: 45, 
      revenue: 8900000, 
      tasks: 12, 
      completedTasks: 89,
      conversion: 34.5,
      avgDeal: 197800,
      photo: '👨‍💼'
    },
    { 
      id: 2, 
      name: 'Петрова А.С.', 
      clients: 38, 
      revenue: 7200000, 
      tasks: 8, 
      completedTasks: 92,
      conversion: 41.2,
      avgDeal: 189500,
      photo: '👩‍💼'
    },
    { 
      id: 3, 
      name: 'Сидоров В.М.', 
      clients: 52, 
      revenue: 6800000, 
      tasks: 15, 
      completedTasks: 85,
      conversion: 28.7,
      avgDeal: 130800,
      photo: '👨‍💼'
    }
  ];

  const tasks = [
    { 
      id: 1, 
      client: 'ООО "СтройТех"', 
      manager: 'Иванов И.И.', 
      task: 'Отправить КП на фасадные системы', 
      dueDate: '2024-10-21', 
      priority: 'high', 
      status: 'pending',
      type: 'proposal',
      estimatedValue: 850000
    },
    { 
      id: 2, 
      client: 'ООО "МонолитСтрой"', 
      manager: 'Петрова А.С.', 
      task: 'Перезвонить по новому заказу', 
      dueDate: '2024-10-20', 
      priority: 'high', 
      status: 'pending',
      type: 'call',
      estimatedValue: 650000
    },
    { 
      id: 3, 
      client: 'ИП Петров А.С.', 
      manager: 'Сидоров В.М.', 
      task: 'Согласовать условия доставки', 
      dueDate: '2024-10-22', 
      priority: 'medium', 
      status: 'pending',
      type: 'meeting',
      estimatedValue: 245000
    },
    { 
      id: 4, 
      client: 'ООО "ГлавСтрой"', 
      manager: 'Иванов И.И.', 
      task: 'Презентация новых материалов', 
      dueDate: '2024-10-23', 
      priority: 'medium', 
      status: 'pending',
      type: 'presentation',
      estimatedValue: 420000
    },
    { 
      id: 5, 
      client: 'ООО "Базис"', 
      manager: 'Петрова А.С.', 
      task: 'Уточнить потребность на ноябрь', 
      dueDate: '2024-10-25', 
      priority: 'low', 
      status: 'pending',
      type: 'call',
      estimatedValue: 180000
    },
    { 
      id: 6, 
      client: 'ИП Сидоров В.М.', 
      manager: 'Сидоров В.М.', 
      task: 'Отправить счёт', 
      dueDate: '2024-10-20', 
      priority: 'high', 
      status: 'completed',
      type: 'invoice',
      estimatedValue: 95000
    }
  ];

  const commercialProposals = [
    {
      id: 1,
      client: 'ООО "СтройТех"',
      date: '2024-10-15',
      total: 850000,
      status: 'sent',
      validUntil: '2024-10-30',
      items: [
        { name: 'Фасадная система Ceresit', quantity: 120, price: 5200, discount: 5 },
        { name: 'Утеплитель ROCKWOOL', quantity: 85, price: 2850, discount: 10 }
      ]
    },
    {
      id: 2,
      client: 'ООО "МонолитСтрой"',
      date: '2024-10-18',
      total: 650000,
      status: 'accepted',
      validUntil: '2024-11-01',
      items: [
        { name: 'LOGICROOF V-RP', quantity: 95, price: 4500, discount: 0 },
        { name: 'Гидроизоляция ТЕХНОНИКОЛЬ', quantity: 65, price: 3200, discount: 15 }
      ]
    }
  ];

  const promotions = [
    {
      id: 1,
      name: '2+1 на утеплители',
      type: 'bundle',
      description: 'При покупке 2 упаковок утеплителя — третья в подарок',
      discount: '33%',
      validUntil: '2024-10-31',
      status: 'active',
      category: 'insulation',
      used: 42,
      revenue: 1250000,
      conditions: 'Минимальный заказ от 50,000₽'
    },
    {
      id: 2,
      name: 'Скидка 20% на гидроизоляцию',
      type: 'discount',
      description: 'Специальная скидка на всю линейку ТЕХНОНИКОЛЬ',
      discount: '20%',
      validUntil: '2024-10-25',
      status: 'active',
      category: 'waterproofing',
      used: 38,
      revenue: 890000,
      conditions: 'Для зарегистрированных клиентов'
    },
    {
      id: 3,
      name: 'Осенняя распродажа фасадов',
      type: 'seasonal',
      description: 'Сезонная распродажа фасадных систем',
      discount: '15%',
      validUntil: '2024-11-15',
      status: 'active',
      category: 'facade',
      used: 26,
      revenue: 645000,
      conditions: 'До окончания сезона'
    },
    {
      id: 4,
      name: 'Комплект "Тёплый дом"',
      type: 'bundle',
      description: 'Утеплитель + гидроизоляция + пароизоляция со скидкой',
      discount: '25%',
      validUntil: '2024-11-30',
      status: 'active',
      category: 'insulation',
      used: 31,
      revenue: 1120000,
      conditions: 'При покупке полного комплекта'
    },
    {
      id: 5,
      name: 'Бонусы за отзыв',
      type: 'loyalty',
      description: 'Получите 500 бонусов за фото объекта с нашими материалами',
      discount: '500 баллов',
      validUntil: '2024-12-31',
      status: 'active',
      category: 'all',
      used: 67,
      revenue: 0,
      conditions: 'Опубликуйте отзыв с фото'
    }
  ];

  const loyaltyTiers = [
    { name: 'Серебро', minSpend: 0, maxSpend: 1500000, cashback: 1, discount: 3, color: 'bg-gray-400' },
    { name: 'Золото', minSpend: 1500000, maxSpend: 3000000, cashback: 2, discount: 5, color: 'bg-yellow-500' },
    { name: 'Платина', minSpend: 3000000, maxSpend: Infinity, cashback: 3, discount: 10, color: 'bg-blue-600' }
  ];

  const referralStats = [
    { customer: 'ООО "СтройТех"', referrals: 8, revenue: 4200000, bonus: 126000, status: 'active' },
    { customer: 'ООО "МонолитСтрой"', referrals: 5, revenue: 2850000, bonus: 85500, status: 'active' },
    { customer: 'ИП Петров А.С.', referrals: 3, revenue: 1450000, bonus: 43500, status: 'active' }
  ];

  const emailCampaignsData = [
    { id: 1, name: 'Осенние акции 2024', sent: 2847, opened: 1892, clicked: 456, conversions: 89, revenue: 1250000, date: '2024-10-15', status: 'completed' },
    { id: 2, name: 'Новинки ROCKWOOL', sent: 1956, opened: 1234, clicked: 312, conversions: 62, revenue: 890000, date: '2024-10-12', status: 'completed' },
    { id: 3, name: 'Персональные предложения', sent: 456, opened: 389, clicked: 178, conversions: 41, revenue: 645000, date: '2024-10-18', status: 'active' }
  ];

  const profitabilityData = [
    { name: 'ROCKWOOL Лайт Баттс', margin: 28.5, revenue: 842000, profit: 239970, trend: 'up' },
    { name: 'ТЕХНОНИКОЛЬ Техноэласт', margin: 32.1, revenue: 654000, profit: 209934, trend: 'up' },
    { name: 'LOGICROOF V-RP', margin: 25.3, revenue: 728000, profit: 184184, trend: 'down' },
    { name: 'Hauberk панели', margin: 29.8, revenue: 512000, profit: 152576, trend: 'up' },
    { name: 'Геотекстиль Дорнит', margin: 18.2, revenue: 423000, profit: 76986, trend: 'down' },
  ];

  const invoices = [
    { 
      id: 'СЧ-2024-158', 
      date: '2024-10-18', 
      customer: 'ООО "СтройТех"', 
      amount: 543800, 
      status: 'paid', 
      dueDate: '2024-10-25', 
      paidDate: '2024-10-20',
      items: [
        { name: 'Гидроизоляция ТЕХНОНИКОЛЬ Техноэласт', quantity: 38, price: 3200, image: '💧' },
        { name: 'Утеплитель ROCKWOOL Лайт Баттс', quantity: 120, price: 2850, image: '🏗️' }
      ]
    },
    { 
      id: 'СЧ-2024-159', 
      date: '2024-10-19', 
      customer: 'ООО "МонолитСтрой"', 
      amount: 728500, 
      status: 'pending', 
      dueDate: '2024-10-26', 
      paidDate: null,
      items: [
        { name: 'Плоская кровля LOGICROOF V-RP', quantity: 62, price: 4500, image: '🏢' },
        { name: 'Фасадные панели Hauberk', quantity: 112, price: 2100, image: '🧱' }
      ]
    },
    { 
      id: 'СЧ-2024-160', 
      date: '2024-10-19', 
      customer: 'ИП Петров А.С.', 
      amount: 445600, 
      status: 'overdue', 
      dueDate: '2024-10-20', 
      paidDate: null,
      items: [
        { name: 'Звукоизоляция ROCKWOOL Акустик Баттс', quantity: 85, price: 3400, image: '🔇' },
        { name: 'Геотекстиль Дорнит 200', quantity: 2800, price: 45, image: '🗺️' }
      ]
    },
    { 
      id: 'СЧ-2024-157', 
      date: '2024-10-17', 
      customer: 'ООО "ГлавСтрой"', 
      amount: 892300, 
      status: 'paid', 
      dueDate: '2024-10-24', 
      paidDate: '2024-10-19',
      items: [
        { name: 'Фасадная система Ceresit', quantity: 95, price: 5200, image: '🧱' },
        { name: 'Утеплитель LOGICPIR Балкон', quantity: 158, price: 1950, image: '🏗️' }
      ]
    },
    { 
      id: 'СЧ-2024-156', 
      date: '2024-10-16', 
      customer: 'ООО "Базис"', 
      amount: 320100, 
      status: 'cancelled', 
      dueDate: '2024-10-23', 
      paidDate: null,
      items: [
        { name: 'Базальтовая вата ISOVER', quantity: 145, price: 2200, image: '🏗️' }
      ]
    },
  ];

  const payments = [
    { id: 'ПЛ-4582', date: '2024-10-20 14:32', invoice: 'СЧ-2024-158', customer: 'ООО "СтройТех"', amount: 543800, method: 'Банковский перевод', status: 'completed' },
    { id: 'ПЛ-4581', date: '2024-10-19 11:15', invoice: 'СЧ-2024-157', customer: 'ООО "ГлавСтрой"', amount: 892300, method: 'Банковский перевод', status: 'completed' },
    { id: 'ПЛ-4580', date: '2024-10-18 16:45', invoice: 'СЧ-2024-155', customer: 'ИП Сидоров В.М.', amount: 234500, method: 'Наличные', status: 'completed' },
    { id: 'ПЛ-4579', date: '2024-10-17 09:22', invoice: 'СЧ-2024-154', customer: 'ООО "СтройТех"', amount: 675200, method: 'Онлайн оплата', status: 'completed' },
    { id: 'ПЛ-4578', date: '2024-10-16 13:50', invoice: 'СЧ-2024-153', customer: 'ООО "МонолитСтрой"', amount: 456800, method: 'Банковский перевод', status: 'processing' },
  ];

  const customerAccounts = [
    { customer: 'ООО "СтройТех"', creditLimit: 2000000, used: 728500, available: 1271500, deferralDays: 14, discount: 5 },
    { customer: 'ООО "МонолитСтрой"', creditLimit: 1500000, used: 728500, available: 771500, deferralDays: 7, discount: 3 },
    { customer: 'ИП Петров А.С.', creditLimit: 800000, used: 445600, available: 354400, deferralDays: 0, discount: 0 },
    { customer: 'ООО "ГлавСтрой"', creditLimit: 1200000, used: 0, available: 1200000, deferralDays: 10, discount: 4 },
  ];

  const seasonalityData = [
    { month: 'Янв', sales: 420000, avgYear: 450000, forecast: 440000 },
    { month: 'Фев', sales: 380000, avgYear: 420000, forecast: 405000 },
    { month: 'Мар', sales: 720000, avgYear: 680000, forecast: 750000 },
    { month: 'Апр', sales: 980000, avgYear: 920000, forecast: 1020000 },
    { month: 'Май', sales: 1250000, avgYear: 1180000, forecast: 1300000 },
    { month: 'Июн', sales: 1450000, avgYear: 1350000, forecast: 1500000 },
    { month: 'Июл', sales: 1620000, avgYear: 1520000, forecast: 1680000 },
    { month: 'Авг', sales: 1580000, avgYear: 1480000, forecast: 1640000 },
    { month: 'Сен', sales: 1320000, avgYear: 1240000, forecast: 1380000 },
    { month: 'Окт', sales: 890000, avgYear: 820000, forecast: 920000 },
    { month: 'Ноя', sales: 0, avgYear: 580000, forecast: 640000 },
    { month: 'Дек', sales: 0, avgYear: 420000, forecast: 460000 },
  ];

  const metrics = [
    { title: 'Выручка за месяц', value: '₽18,4 млн', change: '+15.3%', trend: 'up', icon: 'TrendingUp' },
    { title: 'Отгружено м²', value: '42,847', change: '+8.7%', trend: 'up', icon: 'Package' },
    { title: 'Активных заказов', value: '184', change: '+12%', trend: 'up', icon: 'ShoppingCart' },
    { title: 'Клиентов за неделю', value: '457', change: '+5.2%', trend: 'up', icon: 'Users' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r border-sidebar-border bg-sidebar">
        <div className="p-6">
          <div className="mb-8">
            <img 
              src="https://cdn.poehali.dev/files/a3da5ee5-6618-43ea-83b8-86810035fa1a.png" 
              alt="BAUSTOV" 
              className="w-full"
            />
            <p className="text-xs text-sidebar-foreground/60 mt-2 text-center">Строительные материалы</p>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h2 className="text-2xl font-semibold">Дашборд</h2>
              <p className="text-sm text-muted-foreground mt-1">Обзор ключевых показателей</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Последние 24 часа</SelectItem>
                  <SelectItem value="7d">Последние 7 дней</SelectItem>
                  <SelectItem value="30d">Последние 30 дней</SelectItem>
                  <SelectItem value="90d">Последние 90 дней</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все регионы</SelectItem>
                  <SelectItem value="moscow">Москва</SelectItem>
                  <SelectItem value="spb">Санкт-Петербург</SelectItem>
                  <SelectItem value="kazan">Казань</SelectItem>
                  <SelectItem value="ekb">Екатеринбург</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => openModal({ type: 'refresh' })}
              >
                <Icon name="RefreshCcw" size={18} />
              </Button>

              <Button 
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => {
                  setNotifications(0);
                  openModal({ type: 'notifications' });
                }}
              >
                <Icon name="Bell" size={18} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {notifications}
                  </span>
                )}
              </Button>

              <Button 
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setCartOpen(true)}
              >
                <Icon name="ShoppingCart" size={18} />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {getCartItemsCount()}
                  </span>
                )}
              </Button>
              
              <Button onClick={() => openModal({ type: 'export', dateRange })}>
                <Icon name="Download" size={18} className="mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'catalog' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Каталог материалов</h2>
                  <p className="text-sm text-muted-foreground mt-1">Выберите категорию и найдите нужный товар</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Поиск материалов..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring w-64"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-card border border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon name={cat.icon} size={18} />
                    <span className="text-sm font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => openModal({ type: 'product', product })}
                  >
                    <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                      {product.image}
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-xs text-primary font-semibold">{product.brand}</p>
                        <h3 className="font-semibold text-sm mt-1 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon 
                            key={i} 
                            name="Star" 
                            size={14} 
                            className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-primary">{product.price}</p>
                            <p className="text-xs text-muted-foreground">В наличии: {product.stock.toLocaleString()} м²</p>
                          </div>
                          <Button 
                            size="sm" 
                            className="group-hover:bg-primary group-hover:text-primary-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, 1);
                            }}
                          >
                            <Icon name="ShoppingCart" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <Card className="p-12 text-center">
                  <Icon name="PackageX" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                  <p className="text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
                </Card>
              )}
            </div>
          ) : activeTab === 'orders' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">История заказов</h2>
                  <p className="text-sm text-muted-foreground mt-1">Отслеживайте статус ваших заказов</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{orders.length} заказов</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {orders.map((order) => (
                  <Card 
                    key={order.id} 
                    className="p-6 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => openModal({ type: 'order-details', order })}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Package" size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Заказ #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          <p className="text-sm text-muted-foreground mt-1">{order.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                        <p className="text-xl font-bold text-primary mt-2">₽{order.total.toLocaleString()}</p>
                      </div>
                    </div>

                    <Separator className="mb-4" />

                    <div className="space-y-2">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.image}</span>
                            <span>{item.name}</span>
                          </div>
                          <span className="text-muted-foreground">{item.quantity} м² × ₽{item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="MapPin" size={16} />
                        <span className="line-clamp-1">{order.address}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Подробнее
                        <Icon name="ChevronRight" size={16} className="ml-1" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {orders.length === 0 && (
                <Card className="p-12 text-center">
                  <Icon name="ShoppingBag" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Заказов пока нет</h3>
                  <p className="text-muted-foreground mb-6">Оформите первый заказ из каталога</p>
                  <Button onClick={() => setActiveTab('catalog')}>
                    Перейти в каталог
                  </Button>
                </Card>
              )}
            </div>
          ) : activeTab === 'analytics' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Аналитика продаж</h2>
                  <p className="text-sm text-muted-foreground mt-2">Полный анализ эффективности бизнеса BAUSTOV</p>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="30d">
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">7 дней</SelectItem>
                      <SelectItem value="30d">30 дней</SelectItem>
                      <SelectItem value="90d">90 дней</SelectItem>
                      <SelectItem value="year">Год</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Icon name="Download" size={18} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Icon name="TrendingUp" size={20} className="text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">+18.2%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Общая выручка</p>
                  <p className="text-2xl font-bold">₽{(9490000).toLocaleString()}</p>
                </Card>

                <Card className="p-5 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                      <Icon name="Percent" size={20} className="text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">+4.1%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Средняя маржа</p>
                  <p className="text-2xl font-bold">26.8%</p>
                </Card>

                <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                      <Icon name="Users" size={20} className="text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">+12.5%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Активные клиенты</p>
                  <p className="text-2xl font-bold">348</p>
                </Card>

                <Card className="p-5 bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
                      <Icon name="Package" size={20} className="text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">+9.3%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Средний чек</p>
                  <p className="text-2xl font-bold">₽{(27270).toLocaleString()}</p>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Icon name="BarChart3" size={20} className="text-primary" />
                        График продаж по категориям
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Сравнение объёмов за месяц</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.75rem',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Bar dataKey="sales" fill="#003d7a" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Icon name="PieChart" size={20} className="text-primary" />
                        Сегментация клиентов
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Распределение по типам</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Icon name="TrendingUp" size={20} className="text-primary" />
                      Сезонность и прогноз продаж
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">Анализ по месяцам с прогнозированием</p>
                  </div>
                  <Badge variant="outline">2024 год</Badge>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={seasonalityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                      formatter={(value: number) => `₽${value.toLocaleString()}`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#003d7a" strokeWidth={3} name="Продажи 2024" dot={{ fill: '#003d7a', r: 5 }} />
                    <Line type="monotone" dataKey="avgYear" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="Средние за годы" />
                    <Line type="monotone" dataKey="forecast" stroke="#ff7e1f" strokeWidth={2} strokeDasharray="3 3" name="Прогноз" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Lightbulb" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-blue-900">Инсайт по сезонности</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Пик продаж стройматериалов приходится на июль-август (строительный сезон). 
                        Рекомендуем увеличить запасы популярных позиций за 2 месяца до пика.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Icon name="Crown" size={20} className="text-yellow-600" />
                        Топ клиентов
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">По объёму закупок за месяц</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {topCustomers.map((customer, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            idx < 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-muted text-muted-foreground'
                          }`}>
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-semibold">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.orders} заказов</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">₽{customer.purchases.toLocaleString()}</p>
                          <p className="text-sm text-green-600 font-semibold">{customer.growth}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Icon name="Target" size={20} className="text-primary" />
                        Прогноз спроса на материалы
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Следующий месяц</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {forecastData.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-lg border border-border hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-semibold text-sm">{item.material}</p>
                          <Badge 
                            variant="outline" 
                            className={item.status === 'up' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}
                          >
                            {item.trend}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Текущий: {item.current} м²</span>
                          <span className="font-semibold text-primary">Прогноз: {item.forecast} м²</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Icon name="DollarSign" size={20} className="text-primary" />
                      Анализ рентабельности товаров
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">Маржинальность и прибыль</p>
                  </div>
                  <Select defaultValue="margin">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="margin">По марже</SelectItem>
                      <SelectItem value="profit">По прибыли</SelectItem>
                      <SelectItem value="revenue">По выручке</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  {profitabilityData.map((product, idx) => (
                    <div key={idx} className="p-5 rounded-lg border border-border hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center font-bold text-primary">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-muted-foreground">Выручка: ₽{product.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                        <Icon 
                          name={product.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                          size={20} 
                          className={product.trend === 'up' ? 'text-green-600' : 'text-red-600'}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Маржа</p>
                          <p className="text-lg font-bold text-primary">{product.margin}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Прибыль</p>
                          <p className="text-lg font-bold text-green-600">₽{product.profit.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Статус</p>
                          <Badge className={product.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                            {product.trend === 'up' ? 'Рост' : 'Падение'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : activeTab === 'finance' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Финансы</h2>
                  <p className="text-sm text-muted-foreground mt-2">Счета, платежи, взаиморасчёты и кредитные лимиты</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => openModal({ type: 'create-invoice' })}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Новый счёт
                  </Button>
                  <Button onClick={() => openModal({ type: 'payment-link' })}>
                    <Icon name="Link" size={18} className="mr-2" />
                    Ссылка на оплату
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                      <Icon name="DollarSign" size={20} className="text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">Оплачено</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">К получению</p>
                  <p className="text-2xl font-bold">₽{(1436100).toLocaleString()}</p>
                </Card>

                <Card className="p-5 bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-600 flex items-center justify-center">
                      <Icon name="Clock" size={20} className="text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Ожидание</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Не оплачено</p>
                  <p className="text-2xl font-bold">₽{(728500).toLocaleString()}</p>
                </Card>

                <Card className="p-5 bg-gradient-to-br from-red-50 to-red-100/50 border-red-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
                      <Icon name="AlertCircle" size={20} className="text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-red-700">Просрочено</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Дебиторка</p>
                  <p className="text-2xl font-bold">₽{(445600).toLocaleString()}</p>
                </Card>

                <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Icon name="CreditCard" size={20} className="text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">Кредит</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Доступный лимит</p>
                  <p className="text-2xl font-bold">₽{(3597400).toLocaleString()}</p>
                </Card>
              </div>

              <Tabs defaultValue="invoices" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="invoices">Счета</TabsTrigger>
                  <TabsTrigger value="payments">Платежи</TabsTrigger>
                  <TabsTrigger value="accounts">Взаиморасчёты</TabsTrigger>
                  <TabsTrigger value="discounts">Скидки</TabsTrigger>
                </TabsList>

                <TabsContent value="invoices" className="space-y-4 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Счета на оплату</h3>
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все статусы</SelectItem>
                          <SelectItem value="paid">Оплачено</SelectItem>
                          <SelectItem value="pending">Ожидание</SelectItem>
                          <SelectItem value="overdue">Просрочено</SelectItem>
                          <SelectItem value="cancelled">Отменено</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {invoices.map((invoice) => (
                      <Card 
                        key={invoice.id} 
                        className="p-5 hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => openModal({ type: 'invoice-details', invoice })}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              invoice.status === 'paid' ? 'bg-green-100' :
                              invoice.status === 'overdue' ? 'bg-red-100' :
                              invoice.status === 'cancelled' ? 'bg-gray-100' :
                              'bg-yellow-100'
                            }`}>
                              <Icon 
                                name={invoice.status === 'paid' ? 'CheckCircle' : invoice.status === 'overdue' ? 'AlertCircle' : invoice.status === 'cancelled' ? 'XCircle' : 'Clock'} 
                                size={24} 
                                className={
                                  invoice.status === 'paid' ? 'text-green-600' :
                                  invoice.status === 'overdue' ? 'text-red-600' :
                                  invoice.status === 'cancelled' ? 'text-gray-600' :
                                  'text-yellow-600'
                                }
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-bold">Счёт #{invoice.id}</h4>
                                <Badge className={
                                  invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                                  invoice.status === 'overdue' ? 'bg-red-100 text-red-700' :
                                  invoice.status === 'cancelled' ? 'bg-gray-100 text-gray-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }>
                                  {invoice.status === 'paid' ? 'Оплачен' : invoice.status === 'overdue' ? 'Просрочен' : invoice.status === 'cancelled' ? 'Отменён' : 'Ожидание'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{invoice.customer}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span>Выставлен: {new Date(invoice.date).toLocaleDateString('ru-RU')}</span>
                                <span>Срок: {new Date(invoice.dueDate).toLocaleDateString('ru-RU')}</span>
                                {invoice.paidDate && <span className="text-green-600">Оплачен: {new Date(invoice.paidDate).toLocaleDateString('ru-RU')}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">₽{invoice.amount.toLocaleString()}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                generateInvoicePDF(invoice);
                              }}
                            >
                              <Icon name="Download" size={16} className="mr-1" />
                              PDF
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="payments" className="space-y-4 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">История платежей</h3>
                    <Button variant="outline" size="sm">
                      <Icon name="Filter" size={16} className="mr-2" />
                      Фильтры
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {payments.map((payment) => (
                      <Card key={payment.id} className="p-5 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              payment.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                            }`}>
                              <Icon 
                                name={payment.method === 'Банковский перевод' ? 'Building2' : payment.method === 'Наличные' ? 'Wallet' : 'CreditCard'} 
                                size={24} 
                                className={payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-bold">{payment.id}</h4>
                                <Badge className={payment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                                  {payment.status === 'completed' ? 'Проведён' : 'Обработка'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{payment.customer}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Счёт: {payment.invoice}</span>
                                <span>{payment.method}</span>
                                <span>{payment.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600">₽{payment.amount.toLocaleString()}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                generatePaymentReceiptPDF(payment);
                              }}
                            >
                              <Icon name="Download" size={16} className="mr-1" />
                              Квитанция
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="accounts" className="space-y-4 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Взаиморасчёты с клиентами</h3>
                      <p className="text-sm text-muted-foreground mt-1">Кредитные лимиты и отсрочки платежа</p>
                    </div>
                    <Button variant="outline" onClick={() => openModal({ type: 'edit-credit-limit' })}>
                      <Icon name="Settings" size={16} className="mr-2" />
                      Настроить
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {customerAccounts.map((account, idx) => (
                      <Card key={idx} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-bold text-lg">{account.customer}</h4>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                <Icon name="Calendar" size={14} className="mr-1" />
                                Отсрочка: {account.deferralDays} дней
                              </Badge>
                              {account.discount > 0 && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <Icon name="Percent" size={14} className="mr-1" />
                                  Скидка: {account.discount}%
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Icon name="MoreVertical" size={18} />
                          </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">Кредитный лимит</p>
                            <p className="text-lg font-bold">₽{account.creditLimit.toLocaleString()}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-red-50">
                            <p className="text-xs text-muted-foreground mb-1">Использовано</p>
                            <p className="text-lg font-bold text-red-600">₽{account.used.toLocaleString()}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-green-50">
                            <p className="text-xs text-muted-foreground mb-1">Доступно</p>
                            <p className="text-lg font-bold text-green-600">₽{account.available.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Использование лимита</span>
                            <span className="font-semibold">{((account.used / account.creditLimit) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                (account.used / account.creditLimit) > 0.8 ? 'bg-red-500' :
                                (account.used / account.creditLimit) > 0.5 ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${(account.used / account.creditLimit) * 100}%` }}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="discounts" className="space-y-4 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Система скидок и бонусов</h3>
                      <p className="text-sm text-muted-foreground mt-1">Настройте программы лояльности для клиентов</p>
                    </div>
                    <Button onClick={() => openModal({ type: 'create-discount' })}>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Новая акция
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-6 border-2 border-primary/20 bg-primary/5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge className="bg-green-100 text-green-700 mb-2">Активна</Badge>
                          <h4 className="font-bold text-lg">Скидка за объём</h4>
                          <p className="text-sm text-muted-foreground mt-1">От 100 м² — 3%, от 500 м² — 5%, от 1000 м² — 7%</p>
                        </div>
                        <Icon name="Percent" size={32} className="text-primary" />
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Участников:</span>
                          <span className="font-semibold">156 клиентов</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Экономия клиентов:</span>
                          <span className="font-semibold text-green-600">₽342,500</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-2 border-orange-200 bg-orange-50/50">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge className="bg-orange-100 text-orange-700 mb-2">Активна</Badge>
                          <h4 className="font-bold text-lg">Реферальная программа</h4>
                          <p className="text-sm text-muted-foreground mt-1">Приведи клиента — получи 2% от первого заказа</p>
                        </div>
                        <Icon name="Users" size={32} className="text-orange-600" />
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Новых клиентов:</span>
                          <span className="font-semibold">23 человека</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Выплачено бонусов:</span>
                          <span className="font-semibold text-orange-600">₽84,200</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-2 border-blue-200 bg-blue-50/50">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge className="bg-blue-100 text-blue-700 mb-2">Активна</Badge>
                          <h4 className="font-bold text-lg">Программа лояльности</h4>
                          <p className="text-sm text-muted-foreground mt-1">1 балл за каждые 100₽. 100 баллов = 100₽ скидки</p>
                        </div>
                        <Icon name="Award" size={32} className="text-blue-600" />
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Участников:</span>
                          <span className="font-semibold">284 клиента</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Потрачено баллов:</span>
                          <span className="font-semibold text-blue-600">145,800 баллов</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-2 border-purple-200 bg-purple-50/50">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge className="bg-purple-100 text-purple-700 mb-2">Запланирована</Badge>
                          <h4 className="font-bold text-lg">Сезонная распродажа</h4>
                          <p className="text-sm text-muted-foreground mt-1">Скидка 15% на утеплители с 1 по 15 ноября</p>
                        </div>
                        <Icon name="Calendar" size={32} className="text-purple-600" />
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Начало:</span>
                          <span className="font-semibold">01.11.2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Прогноз продаж:</span>
                          <span className="font-semibold text-purple-600">+₽1,200,000</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : activeTab === 'mobile' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Мобильные инструменты</h2>
                  <p className="text-sm text-muted-foreground mt-2">Работа менеджеров на выезде: сканер, подписи, документы</p>
                </div>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <Icon name="Smartphone" size={16} className="mr-1" />
                  PWA Ready
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                      <Icon name="QrCode" size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold">QR-сканер</p>
                      <p className="text-xs text-muted-foreground">Товары</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => openModal({ type: 'qr-scanner' })}
                  >
                    <Icon name="Camera" size={18} className="mr-2" />
                    Сканировать
                  </Button>
                </Card>

                <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                      <Icon name="Pen" size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold">Подпись</p>
                      <p className="text-xs text-muted-foreground">Доставка</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => openModal({ type: 'signature-pad', customerName: 'ООО "СтройТех"' })}
                  >
                    <Icon name="Edit" size={18} className="mr-2" />
                    Получить
                  </Button>
                </Card>

                <Card className="p-5 bg-gradient-to-br from-pink-50 to-pink-100/50 border-pink-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-pink-600 flex items-center justify-center">
                      <Icon name="Camera" size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold">Документы</p>
                      <p className="text-xs text-muted-foreground">Паспорт</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-pink-600 hover:bg-pink-700"
                    onClick={() => openModal({ type: 'document-camera', documentType: 'passport' })}
                  >
                    <Icon name="Image" size={18} className="mr-2" />
                    Сфотографировать
                  </Button>
                </Card>
              </div>

              <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="Smartphone" size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">PWA приложение BAUSTOV</h3>
                    <p className="text-muted-foreground mb-4">
                      Установите приложение на главный экран для быстрого доступа ко всем функциям. 
                      Работает офлайн и отправляет push-уведомления о новых заказах.
                    </p>
                    <div className="flex gap-3">
                      <Button size="lg" onClick={() => {
                        if ('serviceWorker' in navigator) {
                          navigator.serviceWorker.register('/sw.js');
                          alert('PWA активировано! Теперь можно установить приложение через меню браузера.');
                        }
                      }}>
                        <Icon name="Download" size={20} className="mr-2" />
                        Установить приложение
                      </Button>
                      <Button variant="outline" size="lg">
                        <Icon name="Info" size={20} className="mr-2" />
                        Инструкция
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="History" size={20} className="text-primary" />
                    Недавние сканирования
                  </h3>
                  <div className="space-y-3">
                    {[
                      { code: 'QR-ROCK-8423', product: 'ROCKWOOL Лайт Баттс', time: '5 мин назад', status: 'success' },
                      { code: 'QR-TECH-5621', product: 'ТЕХНОНИКОЛЬ Техноэласт', time: '12 мин назад', status: 'success' },
                      { code: 'QR-LOG-3347', product: 'LOGICROOF V-RP', time: '1 час назад', status: 'success' },
                    ].map((scan, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <Icon name="CheckCircle" size={20} className="text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{scan.product}</p>
                            <p className="text-xs text-muted-foreground">{scan.code}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{scan.time}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="FileCheck" size={20} className="text-primary" />
                    Собранные подписи
                  </h3>
                  <div className="space-y-3">
                    {[
                      { order: 'ЗК-2850', customer: 'ООО "СтройТех"', time: 'Сегодня 14:32', driver: 'Иванов С.А.' },
                      { order: 'ЗК-2845', customer: 'ООО "МонолитСтрой"', time: 'Сегодня 11:15', driver: 'Петров В.М.' },
                      { order: 'ЗК-2843', customer: 'ИП Сидоров', time: 'Вчера 16:48', driver: 'Иванов С.А.' },
                    ].map((sig, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Icon name="Pen" size={20} className="text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{sig.customer}</p>
                            <p className="text-xs text-muted-foreground">Заказ #{sig.order} • {sig.driver}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Icon name="Eye" size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Image" size={20} className="text-primary" />
                  Фото документов клиентов
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { type: 'Паспорт', customer: 'ООО "СтройТех"', date: '18.10.2024', icon: 'IdCard' },
                    { type: 'Доверенность', customer: 'ООО "МонолитСтрой"', date: '17.10.2024', icon: 'FileText' },
                    { type: 'Паспорт', customer: 'ИП Петров А.С.', date: '16.10.2024', icon: 'IdCard' },
                    { type: 'Договор', customer: 'ООО "ГлавСтрой"', date: '15.10.2024', icon: 'File' },
                  ].map((doc, idx) => (
                    <Card 
                      key={idx} 
                      className="p-4 hover:shadow-lg transition-all cursor-pointer border-2 border-dashed"
                      onClick={() => alert(`Просмотр документа: ${doc.type} - ${doc.customer}`)}
                    >
                      <div className="aspect-[3/4] bg-gradient-to-br from-muted/50 to-muted rounded-lg flex items-center justify-center mb-3">
                        <Icon name={doc.icon as any} size={48} className="text-muted-foreground" />
                      </div>
                      <p className="font-semibold text-sm mb-1">{doc.type}</p>
                      <p className="text-xs text-muted-foreground mb-1">{doc.customer}</p>
                      <p className="text-xs text-muted-foreground">{doc.date}</p>
                    </Card>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <div className="flex items-start gap-4">
                  <Icon name="Lightbulb" size={32} className="text-orange-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Возможности мобильного режима</h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Работа без интернета (офлайн-режим)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Push-уведомления о новых заказах</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>GPS-геолокация для маршрутов</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Синхронизация данных в фоне</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : activeTab === 'marketing' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-primary">Маркетинг и лояльность</h2>
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Создать акцию
                </Button>
              </div>

              <Tabs defaultValue="promotions" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="promotions">
                    <Icon name="Tag" size={18} className="mr-2" />
                    Акции
                  </TabsTrigger>
                  <TabsTrigger value="loyalty">
                    <Icon name="Award" size={18} className="mr-2" />
                    Программа лояльности
                  </TabsTrigger>
                  <TabsTrigger value="referral">
                    <Icon name="Users" size={18} className="mr-2" />
                    Реферальная система
                  </TabsTrigger>
                  <TabsTrigger value="campaigns">
                    <Icon name="Mail" size={18} className="mr-2" />
                    Email рассылки
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="promotions" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-600 mb-1">Активные акции</p>
                          <p className="text-3xl font-bold text-orange-700">{promotions.filter(p => p.status === 'active').length}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center">
                          <Icon name="Percent" size={24} className="text-orange-700" />
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 mb-1">Использовано промо</p>
                          <p className="text-3xl font-bold text-blue-700">{promotions.reduce((sum, p) => sum + p.used, 0)}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
                          <Icon name="ShoppingCart" size={24} className="text-blue-700" />
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 mb-1">Выручка по акциям</p>
                          <p className="text-2xl font-bold text-green-700">₽{(promotions.reduce((sum, p) => sum + p.revenue, 0) / 1000000).toFixed(1)}М</p>
                        </div>
                        <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
                          <Icon name="TrendingUp" size={24} className="text-green-700" />
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="grid gap-4">
                    {promotions.map((promo) => (
                      <Card key={promo.id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-primary">{promo.name}</h3>
                              <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                                {promo.discount}
                              </Badge>
                              <Badge className="bg-green-100 text-green-700 border-green-300">
                                <Icon name="CheckCircle" size={14} className="mr-1" />
                                Активна
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{promo.description}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Icon name="Calendar" size={16} />
                                <span>До {promo.validUntil}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Users" size={16} />
                                <span>Использовано: {promo.used} раз</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="DollarSign" size={16} />
                                <span>Выручка: ₽{promo.revenue.toLocaleString()}</span>
                              </div>
                            </div>
                            <p className="text-sm text-blue-600 mt-2">
                              <Icon name="Info" size={14} className="inline mr-1" />
                              {promo.conditions}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Icon name="Edit" size={16} className="mr-1" />
                              Редактировать
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="BarChart3" size={16} />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="loyalty" className="space-y-4">
                  <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Программа лояльности BAUSTOV</h3>
                        <p className="text-blue-100">Три уровня привилегий для постоянных клиентов</p>
                      </div>
                      <Icon name="Award" size={64} className="opacity-20" />
                    </div>
                  </Card>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {loyaltyTiers.map((tier, index) => (
                      <Card key={index} className={`p-6 border-2 ${index === 2 ? 'border-blue-600 shadow-lg scale-105' : 'border-gray-200'}`}>
                        <div className={`w-16 h-16 ${tier.color} rounded-2xl flex items-center justify-center mb-4`}>
                          <Icon name="Crown" size={32} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary mb-2">{tier.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {tier.minSpend === 0 ? 'От начала' : `От ₽${(tier.minSpend / 1000000).toFixed(1)}М`}
                          {tier.maxSpend !== Infinity ? ` до ₽${(tier.maxSpend / 1000000).toFixed(1)}М` : '+'}
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <span className="text-sm text-gray-700">Кэшбэк</span>
                            <span className="font-bold text-green-600">{tier.cashback}%</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <span className="text-sm text-gray-700">Скидка</span>
                            <span className="font-bold text-orange-600">{tier.discount}%</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-4">Клиенты по уровням</h3>
                  <div className="grid gap-3">
                    {topCustomers.map((customer, index) => (
                      <Card key={index} className="p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              customer.tier === 'Платина' ? 'bg-blue-100' : 
                              customer.tier === 'Золото' ? 'bg-yellow-100' : 'bg-gray-100'
                            }`}>
                              <Icon name="Building2" size={24} className={
                                customer.tier === 'Платина' ? 'text-blue-600' : 
                                customer.tier === 'Золото' ? 'text-yellow-600' : 'text-gray-600'
                              } />
                            </div>
                            <div>
                              <h4 className="font-bold text-primary">{customer.name}</h4>
                              <p className="text-sm text-gray-600">Уровень: {customer.tier}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon name="Coins" size={16} className="text-orange-600" />
                              <span className="font-bold text-lg text-orange-600">{customer.loyaltyPoints.toLocaleString()}</span>
                              <span className="text-sm text-gray-500">баллов</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Покупок на ₽{(customer.purchases / 1000000).toFixed(1)}М
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="referral" className="space-y-4">
                  <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-800 text-white mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Приведи друга — получи бонус</h3>
                        <p className="text-purple-100">3% от первого заказа приведённого клиента</p>
                      </div>
                      <Icon name="UserPlus" size={64} className="opacity-20" />
                    </div>
                  </Card>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-indigo-600 mb-1">Всего рефералов</p>
                          <p className="text-3xl font-bold text-indigo-700">{referralStats.reduce((sum, r) => sum + r.referrals, 0)}</p>
                        </div>
                        <Icon name="Users" size={28} className="text-indigo-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 mb-1">Выручка от рефералов</p>
                          <p className="text-2xl font-bold text-green-700">₽{(referralStats.reduce((sum, r) => sum + r.revenue, 0) / 1000000).toFixed(1)}М</p>
                        </div>
                        <Icon name="TrendingUp" size={28} className="text-green-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-600 mb-1">Выплачено бонусов</p>
                          <p className="text-2xl font-bold text-orange-700">₽{(referralStats.reduce((sum, r) => sum + r.bonus, 0) / 1000).toFixed(0)}К</p>
                        </div>
                        <Icon name="Gift" size={28} className="text-orange-600" />
                      </div>
                    </Card>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-4">Топ реферальщики</h3>
                  <div className="grid gap-4">
                    {referralStats.map((stat, index) => (
                      <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                              <Icon name="Award" size={28} className="text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-primary text-lg mb-1">{stat.customer}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Icon name="Users" size={14} />
                                  {stat.referrals} рефералов
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="DollarSign" size={14} />
                                  Выручка: ₽{(stat.revenue / 1000000).toFixed(1)}М
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Начислено бонусов</p>
                            <p className="text-2xl font-bold text-green-600">₽{stat.bonus.toLocaleString()}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Card className="p-6 bg-blue-50 border-blue-200 mt-6">
                    <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                      <Icon name="Info" size={20} />
                      Как работает реферальная программа
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-green-600 mt-0.5" />
                        <span>Клиент получает уникальную реферальную ссылку</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-green-600 mt-0.5" />
                        <span>Новый клиент переходит по ссылке и делает первый заказ</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-green-600 mt-0.5" />
                        <span>Реферал получает 3% от суммы первого заказа бонусами</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-green-600 mt-0.5" />
                        <span>Новый клиент получает скидку 5% на первый заказ</span>
                      </li>
                    </ul>
                  </Card>
                </TabsContent>

                <TabsContent value="campaigns" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 mb-1">Отправлено писем</p>
                          <p className="text-3xl font-bold text-blue-700">{emailCampaignsData.reduce((sum, c) => sum + c.sent, 0).toLocaleString()}</p>
                        </div>
                        <Icon name="Send" size={28} className="text-blue-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 mb-1">Открываемость</p>
                          <p className="text-3xl font-bold text-green-700">
                            {((emailCampaignsData.reduce((sum, c) => sum + c.opened, 0) / emailCampaignsData.reduce((sum, c) => sum + c.sent, 0)) * 100).toFixed(1)}%
                          </p>
                        </div>
                        <Icon name="Eye" size={28} className="text-green-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600 mb-1">Конверсия</p>
                          <p className="text-3xl font-bold text-purple-700">
                            {((emailCampaignsData.reduce((sum, c) => sum + c.conversions, 0) / emailCampaignsData.reduce((sum, c) => sum + c.sent, 0)) * 100).toFixed(1)}%
                          </p>
                        </div>
                        <Icon name="Target" size={28} className="text-purple-600" />
                      </div>
                    </Card>
                  </div>

                  <div className="grid gap-4">
                    {emailCampaignsData.map((campaign) => (
                      <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-primary">{campaign.name}</h3>
                              <Badge className={campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                                {campaign.status === 'active' ? 'Активна' : 'Завершена'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">Отправлено: {campaign.date}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" size={16} className="mr-1" />
                            Посмотреть
                          </Button>
                        </div>
                        <div className="grid grid-cols-5 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{campaign.sent}</p>
                            <p className="text-xs text-gray-500">Отправлено</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-600">{campaign.opened}</p>
                            <p className="text-xs text-gray-500">Открыто</p>
                            <p className="text-xs text-green-600">{((campaign.opened / campaign.sent) * 100).toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-purple-600">{campaign.clicked}</p>
                            <p className="text-xs text-gray-500">Кликов</p>
                            <p className="text-xs text-purple-600">{((campaign.clicked / campaign.sent) * 100).toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-orange-600">{campaign.conversions}</p>
                            <p className="text-xs text-gray-500">Покупок</p>
                            <p className="text-xs text-orange-600">{((campaign.conversions / campaign.sent) * 100).toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-xl font-bold text-primary">₽{(campaign.revenue / 1000).toFixed(0)}К</p>
                            <p className="text-xs text-gray-500">Выручка</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать новую рассылку
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          ) : activeTab === 'crm' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-primary">CRM - Управление клиентами</h2>
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить клиента
                </Button>
              </div>

              <Tabs defaultValue="clients" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="clients">
                    <Icon name="Users" size={18} className="mr-2" />
                    База клиентов
                  </TabsTrigger>
                  <TabsTrigger value="managers">
                    <Icon name="UserCog" size={18} className="mr-2" />
                    Менеджеры
                  </TabsTrigger>
                  <TabsTrigger value="tasks">
                    <Icon name="CheckSquare" size={18} className="mr-2" />
                    Задачи
                  </TabsTrigger>
                  <TabsTrigger value="proposals">
                    <Icon name="FileText" size={18} className="mr-2" />
                    Коммерческие предложения
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="clients" className="space-y-4">
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 mb-1">Всего клиентов</p>
                          <p className="text-3xl font-bold text-blue-700">{topCustomers.length}</p>
                        </div>
                        <Icon name="Users" size={28} className="text-blue-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600 mb-1">VIP клиенты</p>
                          <p className="text-3xl font-bold text-purple-700">{topCustomers.filter(c => c.status === 'vip').length}</p>
                        </div>
                        <Icon name="Crown" size={28} className="text-purple-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 mb-1">Общая выручка</p>
                          <p className="text-2xl font-bold text-green-700">₽{(topCustomers.reduce((sum, c) => sum + c.purchases, 0) / 1000000).toFixed(1)}М</p>
                        </div>
                        <Icon name="TrendingUp" size={28} className="text-green-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-600 mb-1">Средний чек</p>
                          <p className="text-2xl font-bold text-orange-700">₽{(topCustomers.reduce((sum, c) => sum + c.purchases, 0) / topCustomers.reduce((sum, c) => sum + c.orders, 0) / 1000).toFixed(0)}К</p>
                        </div>
                        <Icon name="ShoppingCart" size={28} className="text-orange-600" />
                      </div>
                    </Card>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 relative">
                      <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Поиск клиента по названию, телефону, email..." 
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Менеджер" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все менеджеры</SelectItem>
                        <SelectItem value="ivanov">Иванов И.И.</SelectItem>
                        <SelectItem value="petrova">Петрова А.С.</SelectItem>
                        <SelectItem value="sidorov">Сидоров В.М.</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="regular">Обычные</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4">
                    {topCustomers.map((customer) => (
                      <Card key={customer.id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                              customer.status === 'vip' ? 'bg-purple-100' : 'bg-blue-100'
                            }`}>
                              🏢
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-primary">{customer.name}</h3>
                                {customer.status === 'vip' && (
                                  <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                                    <Icon name="Crown" size={14} className="mr-1" />
                                    VIP
                                  </Badge>
                                )}
                                <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                                  {customer.tier}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-3 gap-4 mb-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Icon name="Phone" size={16} />
                                  <span>{customer.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Icon name="Mail" size={16} />
                                  <span>{customer.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Icon name="User" size={16} />
                                  <span>{customer.manager}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-6 text-sm">
                                <span className="text-gray-600">
                                  <Icon name="ShoppingBag" size={14} className="inline mr-1" />
                                  {customer.orders} заказов
                                </span>
                                <span className="text-gray-600">
                                  <Icon name="DollarSign" size={14} className="inline mr-1" />
                                  ₽{(customer.purchases / 1000000).toFixed(1)}М
                                </span>
                                <span className={customer.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                                  <Icon name="TrendingUp" size={14} className="inline mr-1" />
                                  {customer.growth}
                                </span>
                                <span className="text-orange-600">
                                  <Icon name="Coins" size={14} className="inline mr-1" />
                                  {customer.loyaltyPoints.toLocaleString()} баллов
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {customer.tags.map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex gap-2 mb-3">
                              <Button variant="outline" size="sm">
                                <Icon name="Phone" size={16} className="mr-1" />
                                Позвонить
                              </Button>
                              <Button variant="outline" size="sm">
                                <Icon name="Mail" size={16} className="mr-1" />
                                Email
                              </Button>
                              <Button variant="outline" size="sm">
                                <Icon name="Edit" size={16} />
                              </Button>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <p className="text-xs text-orange-600 mb-1">Следующая задача:</p>
                              <p className="text-sm font-semibold text-orange-700">{customer.nextTask}</p>
                              <p className="text-xs text-orange-600 mt-1">
                                <Icon name="Calendar" size={12} className="inline mr-1" />
                                {customer.taskDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="managers" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-6">
                    {managers.map((manager) => (
                      <Card key={manager.id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-5xl">{manager.photo}</div>
                          <div>
                            <h3 className="text-xl font-bold text-primary">{manager.name}</h3>
                            <p className="text-sm text-gray-600">{manager.clients} клиентов</p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <span className="text-sm text-gray-700">Выручка</span>
                            <span className="font-bold text-green-600">₽{(manager.revenue / 1000000).toFixed(1)}М</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <span className="text-sm text-gray-700">Конверсия</span>
                            <span className="font-bold text-blue-600">{manager.conversion}%</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <span className="text-sm text-gray-700">Средняя сделка</span>
                            <span className="font-bold text-orange-600">₽{(manager.avgDeal / 1000).toFixed(0)}К</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                            <span className="text-sm text-gray-700">Активные задачи</span>
                            <span className="font-bold text-purple-600">{manager.tasks}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">Выполнено задач</span>
                            <span className="font-bold text-gray-600">{manager.completedTasks}%</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                          <Icon name="Eye" size={16} className="mr-2" />
                          Посмотреть клиентов
                        </Button>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tasks" className="space-y-4">
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-red-600 mb-1">Высокий приоритет</p>
                          <p className="text-3xl font-bold text-red-700">{tasks.filter(t => t.priority === 'high' && t.status === 'pending').length}</p>
                        </div>
                        <Icon name="AlertCircle" size={28} className="text-red-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-yellow-600 mb-1">Средний приоритет</p>
                          <p className="text-3xl font-bold text-yellow-700">{tasks.filter(t => t.priority === 'medium' && t.status === 'pending').length}</p>
                        </div>
                        <Icon name="Clock" size={28} className="text-yellow-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 mb-1">Выполнено</p>
                          <p className="text-3xl font-bold text-green-700">{tasks.filter(t => t.status === 'completed').length}</p>
                        </div>
                        <Icon name="CheckCircle" size={28} className="text-green-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 mb-1">Потенциал</p>
                          <p className="text-2xl font-bold text-blue-700">₽{(tasks.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.estimatedValue, 0) / 1000000).toFixed(1)}М</p>
                        </div>
                        <Icon name="DollarSign" size={28} className="text-blue-600" />
                      </div>
                    </Card>
                  </div>

                  <div className="grid gap-4">
                    {tasks.filter(t => t.status === 'pending').map((task) => (
                      <Card key={task.id} className={`p-6 hover:shadow-lg transition-shadow border-l-4 ${
                        task.priority === 'high' ? 'border-red-500' :
                        task.priority === 'medium' ? 'border-yellow-500' : 'border-blue-500'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-primary">{task.task}</h3>
                              <Badge className={
                                task.priority === 'high' ? 'bg-red-100 text-red-700 border-red-300' :
                                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                                'bg-blue-100 text-blue-700 border-blue-300'
                              }>
                                {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                              </Badge>
                              <Badge className="bg-gray-100 text-gray-700 border-gray-300">
                                {task.type === 'call' ? '📞 Звонок' : 
                                 task.type === 'meeting' ? '🤝 Встреча' :
                                 task.type === 'proposal' ? '📄 КП' :
                                 task.type === 'presentation' ? '📊 Презентация' : '💰 Счёт'}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Icon name="Building2" size={16} />
                                <span>{task.client}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Icon name="User" size={16} />
                                <span>{task.manager}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Icon name="Calendar" size={16} />
                                <span>Срок: {task.dueDate}</span>
                              </div>
                              <div className="flex items-center gap-2 text-green-600">
                                <Icon name="DollarSign" size={16} />
                                <span>Потенциал: ₽{task.estimatedValue.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              <Icon name="Check" size={16} className="mr-1" />
                              Выполнено
                            </Button>
                            <Button variant="outline">
                              <Icon name="Edit" size={16} />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать задачу
                  </Button>
                </TabsContent>

                <TabsContent value="proposals" className="space-y-4">
                  <Card className="p-6 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Генератор коммерческих предложений</h3>
                        <p className="text-indigo-100">Создавайте профессиональные КП с автоматическим расчётом</p>
                      </div>
                      <Icon name="FileText" size={64} className="opacity-20" />
                    </div>
                  </Card>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 mb-1">Отправлено КП</p>
                          <p className="text-3xl font-bold text-blue-700">{commercialProposals.length}</p>
                        </div>
                        <Icon name="Send" size={28} className="text-blue-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 mb-1">Принято</p>
                          <p className="text-3xl font-bold text-green-700">{commercialProposals.filter(p => p.status === 'accepted').length}</p>
                        </div>
                        <Icon name="CheckCircle" size={28} className="text-green-600" />
                      </div>
                    </Card>
                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600 mb-1">Сумма КП</p>
                          <p className="text-2xl font-bold text-purple-700">₽{(commercialProposals.reduce((sum, p) => sum + p.total, 0) / 1000000).toFixed(1)}М</p>
                        </div>
                        <Icon name="TrendingUp" size={28} className="text-purple-600" />
                      </div>
                    </Card>
                  </div>

                  <div className="grid gap-4">
                    {commercialProposals.map((proposal) => (
                      <Card key={proposal.id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-primary">КП #{proposal.id} - {proposal.client}</h3>
                              <Badge className={
                                proposal.status === 'accepted' ? 'bg-green-100 text-green-700 border-green-300' :
                                proposal.status === 'sent' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                                'bg-gray-100 text-gray-700 border-gray-300'
                              }>
                                {proposal.status === 'accepted' ? 'Принято' : proposal.status === 'sent' ? 'Отправлено' : 'Черновик'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                              <span>
                                <Icon name="Calendar" size={14} className="inline mr-1" />
                                {proposal.date}
                              </span>
                              <span>
                                <Icon name="Clock" size={14} className="inline mr-1" />
                                Действует до {proposal.validUntil}
                              </span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 mb-3">
                              <h4 className="font-semibold text-gray-700 mb-2">Позиции:</h4>
                              {proposal.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-gray-200 last:border-0">
                                  <span className="flex-1">{item.name}</span>
                                  <span className="text-gray-600 mx-4">{item.quantity} шт × ₽{item.price.toLocaleString()}</span>
                                  {item.discount > 0 && (
                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 mr-2">
                                      -{item.discount}%
                                    </Badge>
                                  )}
                                  <span className="font-bold">₽{((item.quantity * item.price * (100 - item.discount) / 100)).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-right ml-6">
                            <p className="text-sm text-gray-500 mb-1">Итоговая сумма</p>
                            <p className="text-3xl font-bold text-primary mb-3">₽{proposal.total.toLocaleString()}</p>
                            <div className="flex flex-col gap-2">
                              <Button variant="outline" size="sm">
                                <Icon name="Download" size={16} className="mr-1" />
                                Скачать PDF
                              </Button>
                              <Button variant="outline" size="sm">
                                <Icon name="Send" size={16} className="mr-1" />
                                Отправить
                              </Button>
                              <Button variant="outline" size="sm">
                                <Icon name="Edit" size={16} className="mr-1" />
                                Редактировать
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                    <Icon name="Plus" size={24} className="mr-2" />
                    Создать коммерческое предложение
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 animate-fade-in border-l-4 cursor-pointer"
                style={{ 
                  borderLeftColor: index === 0 ? '#003d7a' : index === 1 ? '#ff7e1f' : index === 2 ? '#003d7a' : '#ff7e1f',
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => openModal({
                  type: 'metric',
                  title: metric.title,
                  value: metric.value,
                  change: metric.change,
                  trend: metric.trend,
                  icon: metric.icon
                })}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    index === 0 ? 'bg-primary/10' : index === 1 ? 'bg-secondary/10' : index === 2 ? 'bg-primary/10' : 'bg-secondary/10'
                  }`}>
                    <Icon 
                      name={metric.icon} 
                      size={24} 
                      className={
                        index === 0 ? 'text-primary' : index === 1 ? 'text-secondary' : index === 2 ? 'text-primary' : 'text-secondary'
                      }
                    />
                  </div>
                  <span className={`text-sm font-semibold flex items-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                    <Icon name={metric.trend === 'up' ? 'ArrowUp' : 'ArrowDown'} size={14} />
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Динамика выручки</h3>
                  <p className="text-sm text-muted-foreground">Доходы, расходы и прибыль</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => alert('Настройки графика:\n• Изменить период\n• Добавить показатель\n• Экспорт в PDF')}
                >
                  <Icon name="MoreVertical" size={18} />
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#003d7a" strokeWidth={3} name="Доходы" />
                  <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name="Расходы" />
                  <Line type="monotone" dataKey="profit" stroke="#ff7e1f" strokeWidth={3} name="Прибыль" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Продажи по категориям</h3>
                  <p className="text-sm text-muted-foreground">Топ-5 материалов</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => alert('Настройки графика:\n• Изменить категории\n• Сортировка\n• Экспорт данных')}
                >
                  <Icon name="MoreVertical" size={18} />
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="sales" fill="#ff7e1f" radius={[8, 8, 0, 0]} name="Продажи" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6 mb-6 animate-fade-in bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20" style={{ animationDelay: '800ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="TrendingUp" size={24} className="text-primary" />
                  <h3 className="text-xl font-bold">Прогноз поставок на следующий месяц</h3>
                </div>
                <p className="text-sm text-muted-foreground">На основе исторических данных и текущих трендов</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  alert('Экспорт прогноза поставок...');
                  setTimeout(() => alert('Файл "Прогноз_поставок_ноябрь_2025.pdf" сохранён!'), 500);
                }}
              >
                <Icon name="FileDown" size={18} className="mr-2" />
                Экспорт прогноза
              </Button>
            </div>
            
            <div className="space-y-3">
              {forecastData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-card rounded-lg hover:shadow-md transition-all">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-2 h-2 rounded-full ${item.status === 'up' ? 'bg-green-500' : 'bg-orange-500'}`} />
                      <span className="font-semibold text-base">{item.material}</span>
                      <span className={`text-sm font-semibold flex items-center gap-1 ${
                        item.status === 'up' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {item.trend}
                        <Icon name={item.status === 'up' ? 'ArrowUp' : 'ArrowDown'} size={14} />
                      </span>
                    </div>
                    <div className="flex items-center gap-6 ml-5">
                      <div>
                        <p className="text-xs text-muted-foreground">Текущий месяц</p>
                        <p className="text-lg font-bold text-foreground">{item.current} т</p>
                      </div>
                      <Icon name="ArrowRight" size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Прогноз</p>
                        <p className="text-lg font-bold text-primary">{item.forecast} т</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          item.status === 'up' ? 'bg-green-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${Math.abs(parseFloat(item.trend))}0%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Рекомендация системы</p>
                  <p className="text-sm text-muted-foreground">
                    Увеличить складские запасы кирпича и пиломатериалов на 15-20% для покрытия прогнозируемого спроса. 
                    Рассмотреть снижение закупки арматуры в связи с падением спроса.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Каналы сбыта</h3>
                  <p className="text-sm text-muted-foreground">Структура продаж</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => alert('Дополнительные опции:\n• Детальная статистика\n• Сравнение с прошлым периодом\n• Экспорт данных')}
                >
                  <Icon name="MoreVertical" size={18} />
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 lg:col-span-2 animate-fade-in" style={{ animationDelay: '700ms' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Последние операции</h3>
                  <p className="text-sm text-muted-foreground">Недавняя активность</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setActiveTab('history');
                    alert('Переход в полную историю операций...');
                  }}
                >
                  Смотреть всё
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  { type: 'sale', desc: 'Заказ #ЗК-2845 - Утеплитель ROCKWOOL', amount: '+₽342,500', time: '8 мин назад', status: 'success' },
                  { type: 'sale', desc: 'Заказ #ЗК-2843 - Гидроизоляция ТЕХНОНИКОЛЬ', amount: '+₽189,300', time: '45 мин назад', status: 'success' },
                  { type: 'refund', desc: 'Возврат #ЗК-2811 - Геосинтетика', amount: '-₽43,400', time: '2 часа назад', status: 'warning' },
                  { type: 'sale', desc: 'Заказ #ЗК-2840 - Плоская кровля', amount: '+₽615,800', time: '3 часа назад', status: 'success' },
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.status === 'success' ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        <Icon 
                          name={transaction.type === 'sale' ? 'ArrowUpRight' : 'ArrowDownLeft'} 
                          size={18}
                          className={transaction.status === 'success' ? 'text-green-600' : 'text-orange-600'}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.desc}</p>
                        <p className="text-sm text-muted-foreground">{transaction.time}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      transaction.status === 'success' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {transaction.amount}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
            </>
          )}
        </div>
      </main>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {modalContent?.type === 'metric' && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon name={modalContent.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{modalContent.title}</h3>
                    <p className="text-sm text-muted-foreground font-normal">Детальная статистика</p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-primary/5">
                    <p className="text-sm text-muted-foreground mb-1">Текущее значение</p>
                    <p className="text-3xl font-bold text-primary">{modalContent.value}</p>
                  </Card>
                  <Card className="p-4 bg-secondary/5">
                    <p className="text-sm text-muted-foreground mb-1">Изменение</p>
                    <p className={`text-3xl font-bold ${modalContent.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {modalContent.change}
                    </p>
                  </Card>
                </div>

                <Separator />

                <Tabs defaultValue="week" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="week">Неделя</TabsTrigger>
                    <TabsTrigger value="month">Месяц</TabsTrigger>
                    <TabsTrigger value="year">Год</TabsTrigger>
                  </TabsList>
                  <TabsContent value="week" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Понедельник</span>
                        <Badge variant="outline">+2.3%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Вторник</span>
                        <Badge variant="outline">+5.1%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Среда</span>
                        <Badge variant="outline">+3.8%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Четверг</span>
                        <Badge variant="outline">+1.9%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Пятница</span>
                        <Badge variant="outline">+2.2%</Badge>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="month" className="space-y-4">
                    <p className="text-sm text-muted-foreground">Данные за последние 30 дней показывают стабильный рост показателя.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Неделя 1</p>
                        <p className="text-xl font-bold">+4.2%</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Неделя 2</p>
                        <p className="text-xl font-bold">+6.8%</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Неделя 3</p>
                        <p className="text-xl font-bold">+3.5%</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Неделя 4</p>
                        <p className="text-xl font-bold">+5.1%</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="year" className="space-y-4">
                    <p className="text-sm text-muted-foreground">Годовая динамика демонстрирует положительную тенденцию роста.</p>
                    <div className="space-y-2">
                      {['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт'].map((month, idx) => (
                        <div key={month} className="flex justify-between items-center p-2 hover:bg-muted/50 rounded">
                          <span className="text-sm">{month}</span>
                          <span className="text-sm font-semibold text-green-600">+{(Math.random() * 10 + 2).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}

          {modalContent?.type === 'notifications' && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={24} className="text-primary" />
                  Уведомления
                </DialogTitle>
                <DialogDescription>
                  Важные события и обновления системы
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-3 mt-4">
                <Card className="p-4 border-l-4 border-l-orange-500 bg-orange-50/50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Icon name="AlertTriangle" size={20} className="text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Низкий запас утеплителя на складе №3</p>
                      <p className="text-xs text-muted-foreground mt-1">Осталось 1,245 м². Рекомендуется пополнить запас ROCKWOOL.</p>
                      <p className="text-xs text-muted-foreground mt-2">15 минут назад</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-50/50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon name="ShoppingCart" size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Новый заказ #ЗК-2850</p>
                      <p className="text-xs text-muted-foreground mt-1">Гидроизоляция ТЕХНОНИКОЛЬ - 3,800 м². Клиент: ООО "СтройТех"</p>
                      <p className="text-xs text-muted-foreground mt-2">1 час назад</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-l-4 border-l-green-500 bg-green-50/50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Icon name="CheckCircle" size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Завершена отгрузка #ЗК-2842</p>
                      <p className="text-xs text-muted-foreground mt-1">Плоская кровля - 2,145 м² успешно отгружена.</p>
                      <p className="text-xs text-muted-foreground mt-2">3 часа назад</p>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {modalContent?.type === 'export' && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Icon name="Download" size={24} className="text-primary" />
                  Экспорт данных
                </DialogTitle>
                <DialogDescription>
                  Выберите формат и параметры экспорта
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col gap-2"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => alert(`Файл "Баустов_Отчёт_${modalContent.dateRange}.xlsx" загружен!`), 300);
                    }}
                  >
                    <Icon name="FileSpreadsheet" size={32} className="text-green-600" />
                    <span>Excel (.xlsx)</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col gap-2"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => alert(`Файл "Баустов_Отчёт_${modalContent.dateRange}.pdf" загружен!`), 300);
                    }}
                  >
                    <Icon name="FileText" size={32} className="text-red-600" />
                    <span>PDF (.pdf)</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col gap-2"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => alert(`Файл "Баустов_Отчёт_${modalContent.dateRange}.csv" загружен!`), 300);
                    }}
                  >
                    <Icon name="Database" size={32} className="text-blue-600" />
                    <span>CSV (.csv)</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col gap-2"
                    onClick={() => {
                      setModalOpen(false);
                      setTimeout(() => alert(`Данные скопированы в буфер обмена!`), 300);
                    }}
                  >
                    <Icon name="Copy" size={32} className="text-purple-600" />
                    <span>Копировать</span>
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Параметры экспорта</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Включить графики
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Включить таблицы
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      Включить прогнозы
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {modalContent?.type === 'product' && modalContent.product && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-4xl">
                    {modalContent.product.image}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-primary font-semibold">{modalContent.product.brand}</p>
                    <h3 className="text-xl font-bold mt-1">{modalContent.product.name}</h3>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Детальная информация о товаре
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-primary/5">
                    <p className="text-sm text-muted-foreground mb-1">Цена</p>
                    <p className="text-2xl font-bold text-primary">{modalContent.product.price}</p>
                  </Card>
                  <Card className="p-4 bg-green-50">
                    <p className="text-sm text-muted-foreground mb-1">В наличии</p>
                    <p className="text-2xl font-bold text-green-600">{modalContent.product.stock.toLocaleString()} м²</p>
                  </Card>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={20} 
                        className={i < Math.floor(modalContent.product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{modalContent.product.rating}</span>
                  <span className="text-sm text-muted-foreground">(248 отзывов)</span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Характеристики</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Размеры</span>
                      <span className="text-sm font-semibold">{modalContent.product.specs}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Бренд</span>
                      <span className="text-sm font-semibold">{modalContent.product.brand}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Категория</span>
                      <span className="text-sm font-semibold">
                        {categories.find(c => c.id === modalContent.product.category)?.label || 'Не указана'}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Количество</h4>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setProductQuantity(Math.max(1, productQuantity - 1))}
                    >
                      <Icon name="Minus" size={18} />
                    </Button>
                    <input 
                      type="number" 
                      value={productQuantity}
                      onChange={(e) => setProductQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      className="w-24 text-center border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setProductQuantity(productQuantity + 1)}
                    >
                      <Icon name="Plus" size={18} />
                    </Button>
                    <span className="text-sm text-muted-foreground ml-2">м²</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    size="lg"
                    onClick={() => addToCart(modalContent.product, productQuantity)}
                  >
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Добавить в корзину
                  </Button>
                  <Button variant="outline" size="lg">
                    <Icon name="Heart" size={20} />
                  </Button>
                </div>
              </div>
            </>
          )}

          {modalContent?.type === 'refresh' && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Icon name="RefreshCcw" size={24} className="text-primary" />
                  Обновление данных
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Icon name="CheckCircle" size={24} className="text-green-600" />
                  <div>
                    <p className="font-semibold text-sm">Данные успешно обновлены</p>
                    <p className="text-xs text-muted-foreground mt-1">Последнее обновление: только что</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span className="text-sm">Метрики дашборда</span>
                    <Icon name="Check" size={18} className="text-green-600" />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span className="text-sm">Графики и диаграммы</span>
                    <Icon name="Check" size={18} className="text-green-600" />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span className="text-sm">Прогноз поставок</span>
                    <Icon name="Check" size={18} className="text-green-600" />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span className="text-sm">История операций</span>
                    <Icon name="Check" size={18} className="text-green-600" />
                  </div>
                </div>

                <Button className="w-full" onClick={() => setModalOpen(false)}>
                  Закрыть
                </Button>
              </div>
            </>
          )}

          {modalContent?.type === 'qr-scanner' && (
            <QRScanner
              onScan={(result) => {
                setModalOpen(false);
                alert(`QR-код отсканирован:\n${result}\n\nТовар найден в системе!`);
              }}
              onClose={() => setModalOpen(false)}
            />
          )}

          {modalContent?.type === 'signature-pad' && (
            <SignaturePad
              customerName={modalContent.customerName}
              onSave={(signature) => {
                setModalOpen(false);
                alert('Подпись клиента успешно сохранена!\n\nДокумент отправлен на email клиента.');
              }}
              onClose={() => setModalOpen(false)}
            />
          )}

          {modalContent?.type === 'document-camera' && (
            <DocumentCamera
              documentType={modalContent.documentType || 'passport'}
              onCapture={(photo, type) => {
                setModalOpen(false);
                alert(`Фото документа сохранено!\nТип: ${type}\n\nДобавлено в заказ клиента.`);
              }}
              onClose={() => setModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="ShoppingCart" size={24} className="text-primary" />
              Корзина
              {getCartItemsCount() > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getCartItemsCount()} товаров
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              Проверьте ваш заказ и оформите покупку
            </DialogDescription>
          </DialogHeader>

          {cart.length === 0 ? (
            <div className="py-12 text-center">
              <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
              <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
              <Button onClick={() => { setCartOpen(false); setActiveTab('catalog'); }}>
                Перейти в каталог
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3">
                {cart.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center text-3xl flex-shrink-0">
                        {item.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-primary font-semibold">{item.brand}</p>
                        <h4 className="font-semibold text-sm mt-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{item.specs}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="text-sm font-semibold w-12 text-center">{item.quantity} м²</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-primary">
                          ₽{(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{item.price}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="Trash2" size={16} className="mr-1" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Separator />

              <Card className="p-6 bg-muted/30">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Товары ({getCartItemsCount()} м²)</span>
                    <span className="font-semibold">₽{getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Доставка</span>
                    <span className="font-semibold text-green-600">Бесплатно</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Итого</span>
                    <span className="font-bold text-primary text-2xl">₽{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </Card>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const customerData = {
                  name: formData.get('name'),
                  phone: formData.get('phone'),
                  email: formData.get('email'),
                  address: formData.get('address'),
                  comment: formData.get('comment')
                };
                const orderId = createOrder(customerData);
                setCartOpen(false);
                setCart([]);
                openModal({ type: 'order-success', orderId });
              }}>
                <div className="space-y-4">
                  <h4 className="font-semibold">Контактные данные</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Имя</label>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Иван Иванов"
                        required
                        className="w-full border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Телефон</label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="+7 (999) 123-45-67"
                        required
                        className="w-full border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="info@example.com"
                        required
                        className="w-full border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm text-muted-foreground mb-1 block">Адрес доставки</label>
                      <textarea 
                        name="address"
                        placeholder="Москва, ул. Примерная, д. 123, офис 456"
                        rows={2}
                        required
                        className="w-full border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm text-muted-foreground mb-1 block">Комментарий к заказу (опционально)</label>
                      <textarea 
                        name="comment"
                        placeholder="Укажите удобное время доставки или другие пожелания"
                        rows={2}
                        className="w-full border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setCartOpen(false)}
                  >
                    Продолжить покупки
                  </Button>
                  <Button 
                    type="submit"
                    className="flex-1" 
                    size="lg"
                  >
                    <Icon name="CheckCircle" size={20} className="mr-2" />
                    Оформить заказ на ₽{getCartTotal().toLocaleString()}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={modalOpen && modalContent?.type === 'order-success'} onOpenChange={(open) => { if (!open) setModalOpen(false); }}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={48} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Заказ оформлен!</h3>
            <p className="text-muted-foreground mb-6">
              Номер заказа: #{modalContent?.orderId || 'ЗК-' + Math.floor(Math.random() * 10000 + 2000)}
            </p>
            <Card className="p-4 bg-muted/30 mb-6 text-left">
              <p className="text-sm text-muted-foreground mb-2">Наш менеджер свяжется с вами в течение</p>
              <p className="text-2xl font-bold text-primary">15 минут</p>
            </Card>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span>Подтверждение отправлено на email</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span>Ожидайте звонок менеджера</span>
              </div>
            </div>
            <Button className="w-full" onClick={() => { setModalOpen(false); setActiveTab('dashboard'); }}>
              Вернуться на главную
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={modalOpen && modalContent?.type === 'order-details'} onOpenChange={(open) => { if (!open) setModalOpen(false); }}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {modalContent?.order && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon name="Package" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Заказ #{modalContent.order.id}</h3>
                    <p className="text-sm text-muted-foreground font-normal">
                      {new Date(modalContent.order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Детальная информация о заказе и отслеживание доставки
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <Card className="p-6 bg-muted/30">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Клиент</p>
                      <p className="font-semibold">{modalContent.order.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Статус</p>
                      <Badge className={getStatusColor(modalContent.order.status)}>
                        {getStatusLabel(modalContent.order.status)}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Адрес доставки</p>
                      <div className="flex items-start gap-2">
                        <Icon name="MapPin" size={16} className="text-primary mt-1 flex-shrink-0" />
                        <p className="font-semibold">{modalContent.order.address}</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Сумма заказа</p>
                      <p className="text-3xl font-bold text-primary">₽{modalContent.order.total.toLocaleString()}</p>
                    </div>
                  </div>
                </Card>

                <div>
                  <h4 className="font-semibold mb-3">Состав заказа</h4>
                  <div className="space-y-2">
                    {modalContent.order.items.map((item: any, idx: number) => (
                      <Card key={idx} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center text-2xl">
                              {item.image}
                            </div>
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.quantity} м² × ₽{item.price.toLocaleString()}</p>
                            </div>
                          </div>
                          <p className="text-lg font-bold text-primary">₽{(item.quantity * item.price).toLocaleString()}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-4">Отслеживание доставки</h4>
                  <div className="relative">
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
                    <div className="space-y-6">
                      {modalContent.order.trackingSteps.map((step: any, idx: number) => (
                        <div key={idx} className="relative flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
                            step.completed ? 'bg-green-100' : 'bg-muted'
                          }`}>
                            {step.completed ? (
                              <Icon name="Check" size={20} className="text-green-600" />
                            ) : (
                              <Icon name="Clock" size={20} className="text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 pt-2">
                            <p className={`font-semibold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {step.label}
                            </p>
                            {step.date && (
                              <p className="text-sm text-muted-foreground mt-1">{step.date}</p>
                            )}
                            {!step.completed && step.estimated && (
                              <p className="text-sm text-muted-foreground mt-1">Ожидается: {step.estimated}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {modalContent.order.status !== 'cancelled' && modalContent.order.status !== 'delivered' && (
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-start gap-3">
                      <Icon name="Info" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-blue-900">Уведомления о доставке</p>
                        <p className="text-sm text-blue-700 mt-1">
                          Мы отправим SMS-уведомление за час до доставки
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setModalOpen(false)}>
                    Закрыть
                  </Button>
                  {modalContent.order.status === 'processing' && (
                    <Button variant="destructive" className="flex-1">
                      <Icon name="X" size={18} className="mr-2" />
                      Отменить заказ
                    </Button>
                  )}
                  {modalContent.order.status === 'delivered' && (
                    <Button className="flex-1">
                      <Icon name="RefreshCcw" size={18} className="mr-2" />
                      Повторить заказ
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;