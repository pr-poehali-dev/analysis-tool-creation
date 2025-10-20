import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  { name: 'Кирпич', sales: 4200 },
  { name: 'Цемент', sales: 3800 },
  { name: 'Арматура', sales: 2900 },
  { name: 'Пиломатериалы', sales: 2400 },
  { name: 'Сухие смеси', sales: 1950 },
];

const pieData = [
  { name: 'Розница', value: 42, color: '#003d7a' },
  { name: 'Опт', value: 35, color: '#ff7e1f' },
  { name: 'Дилеры', value: 15, color: '#0066a1' },
  { name: 'Онлайн', value: 8, color: '#ffb366' },
];

const forecastData = [
  { material: 'Кирпич М150', current: 842, forecast: 920, trend: '+9.3%', status: 'up' },
  { material: 'Цемент ПЦ500', current: 654, forecast: 710, trend: '+8.6%', status: 'up' },
  { material: 'Арматура 12мм', current: 423, forecast: 395, trend: '-6.6%', status: 'down' },
  { material: 'Пиломатериалы', current: 318, forecast: 355, trend: '+11.6%', status: 'up' },
  { material: 'Сухие смеси', current: 267, forecast: 285, trend: '+6.7%', status: 'up' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [notifications, setNotifications] = useState(3);

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
    { title: 'Отгружено тонн', value: '2,847', change: '+8.7%', trend: 'up', icon: 'Package' },
    { title: 'Активных заказов', value: '184', change: '+12%', trend: 'up', icon: 'ShoppingCart' },
    { title: 'Клиентов за неделю', value: '457', change: '+5.2%', trend: 'up', icon: 'Users' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r border-sidebar-border bg-sidebar">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Icon name="Package" size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">БАУСТОВ</h1>
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
                onClick={() => {
                  alert('Обновление данных...');
                  setTimeout(() => alert('Данные обновлены!'), 500);
                }}
              >
                <Icon name="RefreshCcw" size={18} />
              </Button>

              <Button 
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => {
                  setNotifications(0);
                  alert('Уведомления:\n• Низкий запас цемента на складе №3\n• Новый заказ #ЗК-2850\n• Завершена отгрузка #ЗК-2842');
                }}
              >
                <Icon name="Bell" size={18} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {notifications}
                  </span>
                )}
              </Button>
              
              <Button onClick={() => {
                alert('Экспорт данных в Excel...');
                setTimeout(() => alert('Файл "Баустов_Отчёт_" + dateRange + ".xlsx" загружен!'), 500);
              }}>
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
                onClick={() => alert(`Детальная информация:\n\n${metric.title}\nТекущее значение: ${metric.value}\nИзменение: ${metric.change}\n\nНажмите для просмотра подробной статистики`)}
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
                  { type: 'sale', desc: 'Заказ #ЗК-2845 - Кирпич М150', amount: '+₽142,500', time: '8 мин назад', status: 'success' },
                  { type: 'sale', desc: 'Заказ #ЗК-2843 - Цемент ПЦ500', amount: '+₽89,300', time: '45 мин назад', status: 'success' },
                  { type: 'refund', desc: 'Возврат #ЗК-2811', amount: '-₽23,400', time: '2 часа назад', status: 'warning' },
                  { type: 'sale', desc: 'Заказ #ЗК-2840 - Арматура 12мм', amount: '+₽215,800', time: '3 часа назад', status: 'success' },
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
    </div>
  );
};

export default Index;