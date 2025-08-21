import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { 
  LayoutDashboard, 
  Plus, 
  List, 
  Grid3x3, 
  User, 
  Settings,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { mockCurrentUser, mockAdminUser } from '../../mock';

const Layout = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  const currentUser = isAdmin ? mockAdminUser : mockCurrentUser;

  const userMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Plus, label: 'Add Expense', path: '/add-expense' },
    { icon: List, label: 'Expenses', path: '/expenses' },
    { icon: Grid3x3, label: 'Categories', path: '/categories' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
    { icon: Grid3x3, label: 'Categories', path: '/admin/categories' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' }
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleRoleSwitch = () => {
    if (isAdmin) {
      navigate('/');
    } else {
      navigate('/admin');
    }
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          ExpenseTracker
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hover:bg-slate-100 transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-64 h-screen bg-white shadow-xl transition-transform duration-300 ease-in-out`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ExpenseTracker
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {isAdmin ? 'Admin Panel' : 'Personal Finance'}
            </p>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-slate-900">{currentUser.name}</p>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start h-12 transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg' 
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200 space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start h-10 text-sm hover:bg-slate-50 transition-colors"
              onClick={handleRoleSwitch}
            >
              <Users size={16} className="mr-2" />
              {isAdmin ? 'User View' : 'Admin Panel'}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-10 text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;