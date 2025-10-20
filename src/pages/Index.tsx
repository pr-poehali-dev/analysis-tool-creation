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
  
  const openModal = (content: any) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'reports', label: 'Отчёты', icon: 'FileText' },
    { id: 'analytics', label: 'Аналитика', icon: 'TrendingUp' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
    { id: 'export', label: 'Экспорт', icon: 'Download' },
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
              
              <Button onClick={() => openModal({ type: 'export', dateRange })}>
                <Icon name="Download" size={18} className="mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
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
    </div>
  );
};

export default Index;