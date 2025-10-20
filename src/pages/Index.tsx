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
  { name: 'Продукт A', sales: 4000 },
  { name: 'Продукт B', sales: 3000 },
  { name: 'Продукт C', sales: 2000 },
  { name: 'Продукт D', sales: 2780 },
  { name: 'Продукт E', sales: 1890 },
];

const pieData = [
  { name: 'Онлайн', value: 45, color: '#0EA5E9' },
  { name: 'Офлайн', value: 30, color: '#8B5CF6' },
  { name: 'Партнёры', value: 15, color: '#10B981' },
  { name: 'Другое', value: 10, color: '#F59E0B' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('7d');

  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'reports', label: 'Отчёты', icon: 'FileText' },
    { id: 'analytics', label: 'Аналитика', icon: 'TrendingUp' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
    { id: 'export', label: 'Экспорт', icon: 'Download' },
    { id: 'history', label: 'История', icon: 'Clock' },
  ];

  const metrics = [
    { title: 'Общая выручка', value: '₽2,847,390', change: '+12.5%', trend: 'up', icon: 'TrendingUp' },
    { title: 'Активных клиентов', value: '1,284', change: '+8.2%', trend: 'up', icon: 'Users' },
    { title: 'Средний чек', value: '₽4,235', change: '-2.1%', trend: 'down', icon: 'CreditCard' },
    { title: 'Конверсия', value: '3.24%', change: '+0.4%', trend: 'up', icon: 'Target' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r border-border bg-card">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="BarChart3" size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-semibold">Analytics Pro</h1>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
              
              <Button variant="outline" size="icon">
                <Icon name="RefreshCcw" size={18} />
              </Button>
              
              <Button>
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
                className="p-6 hover:shadow-lg transition-all duration-300 animate-fade-in border-l-4"
                style={{ 
                  borderLeftColor: index === 0 ? '#0EA5E9' : index === 1 ? '#8B5CF6' : index === 2 ? '#10B981' : '#F59E0B',
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-purple-100' : index === 2 ? 'bg-green-100' : 'bg-orange-100'
                  }`}>
                    <Icon 
                      name={metric.icon} 
                      size={24} 
                      className={
                        index === 0 ? 'text-blue-600' : index === 1 ? 'text-purple-600' : index === 2 ? 'text-green-600' : 'text-orange-600'
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
                <Button variant="ghost" size="icon">
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
                  <Line type="monotone" dataKey="revenue" stroke="#0EA5E9" strokeWidth={3} name="Доходы" />
                  <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name="Расходы" />
                  <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} name="Прибыль" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Продажи по продуктам</h3>
                  <p className="text-sm text-muted-foreground">Топ-5 продуктов месяца</p>
                </div>
                <Button variant="ghost" size="icon">
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
                  <Bar dataKey="sales" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="Продажи" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Каналы продаж</h3>
                  <p className="text-sm text-muted-foreground">Распределение по источникам</p>
                </div>
                <Button variant="ghost" size="icon">
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
                <Button variant="outline" size="sm">
                  Смотреть всё
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  { type: 'sale', desc: 'Продажа #12845', amount: '+₽12,500', time: '5 мин назад', status: 'success' },
                  { type: 'refund', desc: 'Возврат #12834', amount: '-₽3,200', time: '23 мин назад', status: 'warning' },
                  { type: 'sale', desc: 'Продажа #12843', amount: '+₽8,900', time: '1 час назад', status: 'success' },
                  { type: 'sale', desc: 'Продажа #12841', amount: '+₽15,400', time: '2 часа назад', status: 'success' },
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
