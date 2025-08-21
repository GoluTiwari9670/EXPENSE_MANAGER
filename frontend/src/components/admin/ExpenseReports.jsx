import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  Target,
  Users
} from 'lucide-react';
import { mockExpenses, mockUsers, mockCategories, mockMonthlyData } from '../../mock';
import { useToast } from '../../hooks/use-toast';

const ExpenseReports = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = totalExpenses / mockExpenses.length;
  const topSpender = mockUsers.reduce((prev, current) => 
    prev.totalExpenses > current.totalExpenses ? prev : current
  );

  const categoryBreakdown = mockCategories.map(category => {
    const categoryExpenses = mockExpenses.filter(expense => expense.categoryId === category.id);
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return {
      ...category,
      total,
      count: categoryExpenses.length,
      percentage: totalExpenses > 0 ? (total / totalExpenses * 100).toFixed(1) : 0
    };
  }).sort((a, b) => b.total - a.total);

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your expense report will be ready shortly."
    });
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color = "emerald", change }) => (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          )}
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change > 0 ? 'text-emerald-600' : 'text-red-600'
            }`}>
              <TrendingUp size={16} />
              <span className="ml-1">{Math.abs(change)}% vs last period</span>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Expense Reports</h1>
          <p className="text-slate-600 mt-1">Detailed analytics and spending insights</p>
        </div>
        <Button 
          onClick={handleExport}
          className="mt-4 lg:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download size={20} className="mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-md border-0">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Filters:</span>
          </div>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {mockCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toFixed(2)}`}
          subtitle="All time"
          icon={DollarSign}
          color="emerald"
          change={12.5}
        />
        <StatCard
          title="Average Expense"
          value={`$${averageExpense.toFixed(2)}`}
          subtitle="Per transaction"
          icon={BarChart3}
          color="blue"
        />
        <StatCard
          title="Total Transactions"
          value={mockExpenses.length}
          subtitle="All time"
          icon={Target}
          color="purple"
        />
        <StatCard
          title="Active Users"
          value={mockUsers.filter(u => u.role === 'user').length}
          subtitle="With expenses"
          icon={Users}
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="p-6 shadow-md border-0 bg-white/80 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Trend</h3>
          <div className="space-y-4">
            {mockMonthlyData.map((month) => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                      style={{ width: `${(month.amount / 3000) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="font-semibold text-slate-900">${month.amount}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Categories */}
        <Card className="p-6 shadow-md border-0 bg-white/80 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {categoryBreakdown.slice(0, 6).map((category) => (
              <div key={category.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{category.name}</p>
                    <p className="text-sm text-slate-600">{category.count} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">${category.total.toFixed(2)}</p>
                  <Badge variant="outline" className="text-xs">
                    {category.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Spenders */}
      <Card className="p-6 shadow-md border-0 bg-white/80 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Spenders</h3>
        <div className="space-y-3">
          {mockUsers.filter(u => u.role === 'user').map((user, index) => (
            <div key={user.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    #{index + 1}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-slate-900">{user.name}</p>
                  <p className="text-sm text-slate-600">{user.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900">${user.totalExpenses.toFixed(2)}</p>
                <p className="text-sm text-slate-600">Budget: ${user.monthlyBudget}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ExpenseReports;