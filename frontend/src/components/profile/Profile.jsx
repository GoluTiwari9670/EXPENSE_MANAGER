import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  Target,
  TrendingUp,
  Edit,
  Save,
  Camera
} from 'lucide-react';
import { mockCurrentUser, mockExpenses } from '../../mock';
import { useToast } from '../../hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockCurrentUser.name,
    email: mockCurrentUser.email,
    monthlyBudget: mockCurrentUser.monthlyBudget
  });

  const userStats = {
    totalExpenses: mockExpenses.filter(exp => exp.userId === mockCurrentUser.id).length,
    totalAmount: mockExpenses
      .filter(exp => exp.userId === mockCurrentUser.id)
      .reduce((sum, exp) => sum + exp.amount, 0),
    avgMonthly: mockCurrentUser.totalExpenses / 6, // Assuming 6 months
    memberSince: new Date(mockCurrentUser.createdAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
  };

  const handleSave = () => {
    // Mock save
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated."
    });
    setIsEditing(false);
  };

  const StatCard = ({ icon: Icon, label, value, color = "emerald" }) => (
    <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
        color === "emerald" ? "bg-gradient-to-r from-emerald-500 to-emerald-600" :
        color === "blue" ? "bg-gradient-to-r from-blue-500 to-blue-600" :
        color === "purple" ? "bg-gradient-to-r from-purple-500 to-purple-600" :
        color === "orange" ? "bg-gradient-to-r from-orange-500 to-orange-600" :
        "bg-gradient-to-r from-slate-500 to-slate-600"
      }`}>
        <Icon size={24} className="text-white" />
      </div>
      <p className="text-sm font-medium text-slate-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-600 mt-1">Manage your account and preferences</p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="mt-4 lg:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isEditing ? (
            <>
              <Save size={20} className="mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit size={20} className="mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Personal Information</h2>
            
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-emerald-100">
                    <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-2xl font-semibold">
                      {mockCurrentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      size="icon" 
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Camera size={14} />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{mockCurrentUser.name}</h3>
                  <p className="text-slate-600">{mockCurrentUser.email}</p>
                  <Badge className="mt-2 bg-emerald-100 text-emerald-700 border-emerald-200">
                    {mockCurrentUser.role === 'admin' ? 'Administrator' : 'User'}
                  </Badge>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium">Full Name</Label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={!isEditing}
                      className="pl-10 h-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 disabled:bg-slate-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={!isEditing}
                      className="pl-10 h-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 disabled:bg-slate-50"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="budget" className="text-slate-700 font-medium">Monthly Budget</Label>
                  <div className="relative">
                    <Target size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-slate-500 font-semibold">$</span>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.monthlyBudget}
                      onChange={(e) => setFormData({...formData, monthlyBudget: parseFloat(e.target.value)})}
                      disabled={!isEditing}
                      className="pl-16 h-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 disabled:bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Account Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-slate-400" />
                    <span className="text-slate-600">Member since:</span>
                    <span className="font-medium text-slate-900">{userStats.memberSince}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-slate-400" />
                    <span className="text-slate-600">Account ID:</span>
                    <span className="font-mono text-slate-900">{mockCurrentUser.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <StatCard
            icon={TrendingUp}
            label="Total Expenses"
            value={userStats.totalExpenses}
            color="emerald"
          />
          
          <StatCard
            icon={Target}
            label="Total Spent"
            value={`$${userStats.totalAmount.toFixed(2)}`}
            color="blue"
          />
          
          <StatCard
            icon={Calendar}
            label="Avg Monthly"
            value={`$${userStats.avgMonthly.toFixed(2)}`}
            color="purple"
          />

          {/* Quick Actions */}
          <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-0 shadow-md">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white/60 hover:bg-white transition-colors"
              >
                Change Password
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white/60 hover:bg-white transition-colors"
              >
                Export Data
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white/60 hover:bg-white text-red-600 border-red-300 hover:bg-red-50 transition-colors"
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;