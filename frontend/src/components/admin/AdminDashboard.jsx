import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  ArrowUpRight,
  Calendar,
  Target,
  BarChart3
} from 'lucide-react';
import { mockUsers, mockExpenses, mockStats } from '../../mock';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const recentUsers = mockUsers.filter(user => user.role === 'user').slice(0, 3);
  const recentExpenses = mockExpenses.slice(0, 5);
  
  const StatCard = ({ title, value, change, icon: Icon, color = "emerald", subtitle }) => (
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
              {change > 0 ? <TrendingUp size={16} /> : <AlertTriangle size={16} />}
              <span className="ml-1">{Math.abs(change)}% vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
          color === "emerald" ? "bg-gradient-to-r from-emerald-500 to-emerald-600" :
          color === "blue" ? "bg-gradient-to-r from-blue-500 to-blue-600" :
          color === "purple" ? "bg-gradient-to-r from-purple-500 to-purple-600" :
          color === "orange" ? "bg-gradient-to-r from-orange-500 to-orange-600" :
          "bg-gradient-to-r from-slate-500 to-slate-600"
        }`}>
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
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">Overview of system activity and user management</p>
        </div>
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <Button 
            variant="outline"
            onClick={() => navigate('/admin/reports')}
            className="hover:bg-slate-100 transition-colors"
          >
            <BarChart3 size={20} className="mr-2" />
            View Reports
          </Button>
          <Button 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/admin/users')}
          >
            <Plus size={20} className="mr-2" />
            Manage Users
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={mockStats.totalUsers}
          change={15.2}
          icon={Users}
          color="emerald"
          subtitle="Active accounts"
        />
        <StatCard
          title="Total Expenses"
          value={`$${mockStats.totalExpenses.toFixed(2)}`}
          change={mockStats.monthlyGrowth}
          icon={DollarSign}
          color="blue"
          subtitle="This month"
        />
        <StatCard
          title="Avg Monthly"
          value={`$${mockStats.averageMonthlyExpense.toFixed(2)}`}
          icon={Target}
          color="purple"
          subtitle="Per user"
        />
        <StatCard
          title="Top Category"
          value={mockStats.topCategory}
          icon={TrendingUp}
          color="orange"
          subtitle="Most used"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <Card className="p-6 shadow-md border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Recent Users</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/admin/users')}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              View all <ArrowUpRight size={16} className="ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-600">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">${user.totalExpenses}</p>
                  <Badge variant="outline" className="text-xs">
                    {user.role}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 shadow-md border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/admin/reports')}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              View reports <ArrowUpRight size={16} className="ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentExpenses.map((expense, index) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-slate-400 to-slate-500 rounded-lg flex items-center justify-center">
                    <DollarSign size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{expense.description}</p>
                    <p className="text-sm text-slate-600">{expense.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">${expense.amount}</p>
                  <p className="text-xs text-slate-500">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-0 shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <h3 className="font-semibold text-slate-900">User Management</h3>
          </div>
          <p className="text-slate-600 mb-4">Manage user accounts, permissions, and activity monitoring.</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin/users')}
            className="w-full bg-white/60 hover:bg-white transition-colors"
          >
            Manage Users
          </Button>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <BarChart3 size={20} className="text-white" />
            </div>
            <h3 className="font-semibold text-slate-900">Analytics</h3>
          </div>
          <p className="text-slate-600 mb-4">View detailed reports and analytics on user spending patterns.</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin/reports')}
            className="w-full bg-white/60 hover:bg-white transition-colors"
          >
            View Reports
          </Button>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Target size={20} className="text-white" />
            </div>
            <h3 className="font-semibold text-slate-900">Categories</h3>
          </div>
          <p className="text-slate-600 mb-4">Configure and manage expense categories for all users.</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin/categories')}
            className="w-full bg-white/60 hover:bg-white transition-colors"
          >
            Manage Categories
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;