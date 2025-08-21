import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Plus,
  ArrowUpRight,
  Calendar,
  PieChart
} from 'lucide-react';
import { mockExpenses, mockCurrentUser, mockMonthlyData, mockCategoryExpenses } from '../../mock';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
  const thisMonthExpenses = mockExpenses
    .filter(expense => new Date(expense.date).getMonth() === new Date().getMonth())
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const lastMonthExpenses = 2180; // Mock data
  const expenseChange = ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses * 100).toFixed(1);
  const budgetUsed = (thisMonthExpenses / mockCurrentUser.monthlyBudget * 100).toFixed(1);

  const recentExpenses = mockExpenses.slice(0, 3);
  const topCategories = mockCategoryExpenses
    .filter(cat => cat.spent > 0)
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 3);

  const StatCard = ({ title, value, change, icon: Icon, color = "emerald" }) => (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">${value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change > 0 ? 'text-red-600' : 'text-emerald-600'
            }`}>
              {change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1">{Math.abs(change)}% vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-${color}-500 to-${color}-600 flex items-center justify-center shadow-lg`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {mockCurrentUser.name.split(' ')[0]}!</h1>
          <p className="text-slate-600 mt-1">Here's your expense overview for {currentMonth}</p>
        </div>
        <Button 
          className="mt-4 lg:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => navigate('/add-expense')}
        >
          <Plus size={20} className="mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="This Month"
          value={thisMonthExpenses.toFixed(2)}
          change={parseFloat(expenseChange)}
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Monthly Budget"
          value={mockCurrentUser.monthlyBudget.toFixed(2)}
          icon={Target}
          color="blue"
        />
        <StatCard
          title="Budget Used"
          value={`${budgetUsed}%`}
          icon={PieChart}
          color={budgetUsed > 80 ? "red" : "orange"}
        />
        <StatCard
          title="Total Expenses"
          value={mockCurrentUser.totalExpenses.toFixed(2)}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Expenses */}
        <Card className="p-6 shadow-md border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Recent Expenses</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/expenses')}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              View all <ArrowUpRight size={16} className="ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-500 rounded-lg flex items-center justify-center">
                    <DollarSign size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{expense.description}</p>
                    <p className="text-sm text-slate-600">{expense.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">${expense.amount}</p>
                  <p className="text-sm text-slate-500">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Categories */}
        <Card className="p-6 shadow-md border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Top Categories</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/categories')}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              View all <ArrowUpRight size={16} className="ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {topCategories.map((category, index) => {
              const spentPercentage = (category.spent / category.budget * 100).toFixed(0);
              return (
                <div key={category.id} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold"
                        style={{ backgroundColor: category.color }}
                      >
                        #{index + 1}
                      </div>
                      <span className="font-medium text-slate-900">{category.name}</span>
                    </div>
                    <span className="font-semibold text-slate-900">${category.spent.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(spentPercentage, 100)}%`,
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {spentPercentage}% of ${category.budget} budget
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 shadow-md border-0 bg-gradient-to-r from-emerald-50 to-teal-50">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Add Expense', path: '/add-expense', icon: Plus, color: 'emerald' },
            { label: 'View Reports', path: '/expenses', icon: PieChart, color: 'blue' },
            { label: 'Manage Categories', path: '/categories', icon: Calendar, color: 'purple' },
            { label: 'Settings', path: '/settings', icon: ArrowUpRight, color: 'orange' }
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.path}
                variant="outline"
                className={`h-16 flex-col space-y-2 bg-white/60 backdrop-blur-sm border-${action.color}-200 hover:bg-${action.color}-50 hover:border-${action.color}-300 transition-all duration-300`}
                onClick={() => navigate(action.path)}
              >
                <Icon size={20} className={`text-${action.color}-600`} />
                <span className={`text-sm font-medium text-${action.color}-700`}>{action.label}</span>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;