import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Shield,
  User,
  Mail,
  Calendar
} from 'lucide-react';
import { mockUsers } from '../../mock';
import { useToast } from '../../hooks/use-toast';

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = () => {
    toast({
      title: "Feature coming soon",
      description: "User creation will be available soon."
    });
  };

  const handleEditUser = (userId) => {
    toast({
      title: "Feature coming soon",
      description: "User editing will be available soon."
    });
  };

  const handleDeleteUser = (userId) => {
    toast({
      title: "User deleted",
      description: "The user has been successfully deleted."
    });
  };

  const handleToggleRole = (userId) => {
    toast({
      title: "Role updated",
      description: "User role has been successfully updated."
    });
  };

  const UserCard = ({ user }) => (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12 border-2 border-emerald-100">
            <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-slate-900">{user.name}</h3>
              <Badge 
                variant={user.role === 'admin' ? 'default' : 'secondary'}
                className={user.role === 'admin' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : ''}
              >
                {user.role === 'admin' ? 'Admin' : 'User'}
              </Badge>
            </div>
            
            <div className="space-y-1 text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <Mail size={12} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-right mr-4">
            <p className="font-semibold text-slate-900">${user.totalExpenses.toFixed(2)}</p>
            <p className="text-sm text-slate-600">Total spent</p>
          </div>
          
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleToggleRole(user.id)}
              className="h-8 w-8 hover:bg-emerald-100 hover:text-emerald-600"
            >
              <Shield size={14} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleEditUser(user.id)}
              className="h-8 w-8 hover:bg-blue-100 hover:text-blue-600"
            >
              <Edit size={14} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleDeleteUser(user.id)}
              className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <Button 
          onClick={handleCreateUser}
          className="mt-4 lg:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus size={20} className="mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="text-2xl font-bold text-slate-900">{mockUsers.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Admins</p>
              <p className="text-2xl font-bold text-slate-900">
                {mockUsers.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Regular Users</p>
              <p className="text-2xl font-bold text-slate-900">
                {mockUsers.filter(u => u.role === 'user').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">New This Month</p>
              <p className="text-2xl font-bold text-slate-900">2</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-md border-0">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span>{filteredUsers.length} users found</span>
          </div>
        </div>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <Card className="p-12 text-center shadow-md border-0 bg-white/80 backdrop-blur-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No users found</h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your search criteria or add a new user.
          </p>
          <Button 
            onClick={handleCreateUser}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
          >
            <Plus size={16} className="mr-2" />
            Add First User
          </Button>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;