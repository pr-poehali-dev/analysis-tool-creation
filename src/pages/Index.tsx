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
    { id: 'reports', label: 'Отчёты', icon: 'FileText' },
    { id: 'analytics', label: 'Аналитика', icon: 'TrendingUp' },
    { id: 'history', label: 'История', icon: 'Clock' },
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