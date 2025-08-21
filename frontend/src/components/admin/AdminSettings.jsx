import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Shield, 
  Database, 
  Bell, 
  Users,
  Settings as SettingsIcon,
  Save,
  AlertTriangle,
  Download,
  Upload
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    userRegistration: true,
    emailNotifications: true,
    dataRetention: '365',
    backupFrequency: 'daily',
    maxFileSize: '10',
    maintenanceMode: false,
    twoFactorRequired: false,
    sessionTimeout: '60'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Admin settings have been successfully updated."
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup started",
      description: "System backup has been initiated."
    });
  };

  const SettingCard = ({ title, description, children, icon: Icon, variant = "default" }) => (
    <Card className={`p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md ${
      variant === 'warning' 
        ? 'bg-orange-50 border-orange-200' 
        : variant === 'danger'
        ? 'bg-red-50 border-red-200'
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="flex items-start space-x-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          variant === 'warning'
            ? 'bg-gradient-to-r from-orange-500 to-orange-600'
            : variant === 'danger'
            ? 'bg-gradient-to-r from-red-500 to-red-600'
            : 'bg-gradient-to-r from-emerald-500 to-teal-500'
        }`}>
          <Icon size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
          <p className="text-sm text-slate-600 mb-4">{description}</p>
          {children}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Settings</h1>
          <p className="text-slate-600 mt-1">Configure system-wide settings and preferences</p>
        </div>
        <Button 
          onClick={handleSave}
          className="mt-4 lg:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Save size={20} className="mr-2" />
          Save All Settings
        </Button>
      </div>

      <div className="space-y-6">
        {/* User Management */}
        <SettingCard
          title="User Management"
          description="Control user registration and account settings"
          icon={Users}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="userRegistration" className="text-slate-700">Allow User Registration</Label>
              <Switch
                id="userRegistration"
                checked={settings.userRegistration}
                onCheckedChange={(value) => handleSettingChange('userRegistration', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactorRequired" className="text-slate-700">Require Two-Factor Authentication</Label>
              <Switch
                id="twoFactorRequired"
                checked={settings.twoFactorRequired}
                onCheckedChange={(value) => handleSettingChange('twoFactorRequired', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Session Timeout</Label>
                <p className="text-sm text-slate-500">Minutes before automatic logout</p>
              </div>
              <Select 
                value={settings.sessionTimeout} 
                onValueChange={(value) => handleSettingChange('sessionTimeout', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SettingCard>

        {/* System Security */}
        <SettingCard
          title="System Security"
          description="Configure security policies and access controls"
          icon={Shield}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Maximum File Upload Size</Label>
                <p className="text-sm text-slate-500">Maximum size for file uploads (MB)</p>
              </div>
              <div className="w-32">
                <Input
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange('maxFileSize', e.target.value)}
                  className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Data Retention Period</Label>
                <p className="text-sm text-slate-500">Days to keep user data</p>
              </div>
              <Select 
                value={settings.dataRetention} 
                onValueChange={(value) => handleSettingChange('dataRetention', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">6 months</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="730">2 years</SelectItem>
                  <SelectItem value="-1">Permanent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SettingCard>

        {/* Notifications */}
        <SettingCard
          title="System Notifications"
          description="Configure email and system notification settings"
          icon={Bell}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications" className="text-slate-700">Email Notifications</Label>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(value) => handleSettingChange('emailNotifications', value)}
              />
            </div>
          </div>
        </SettingCard>

        {/* Database Management */}
        <SettingCard
          title="Database Management"
          description="Backup and maintenance operations"
          icon={Database}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Backup Frequency</Label>
                <p className="text-sm text-slate-500">Automatic backup schedule</p>
              </div>
              <Select 
                value={settings.backupFrequency} 
                onValueChange={(value) => handleSettingChange('backupFrequency', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline"
                  onClick={handleBackup}
                  className="justify-start hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  Create Backup
                </Button>
                <Button 
                  variant="outline"
                  className="justify-start hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                >
                  <Upload size={16} className="mr-2" />
                  Restore Backup
                </Button>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Maintenance Mode */}
        <SettingCard
          title="Maintenance Mode"
          description="Enable maintenance mode to restrict user access during updates"
          icon={AlertTriangle}
          variant="warning"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenanceMode" className="text-slate-700">Enable Maintenance Mode</Label>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(value) => handleSettingChange('maintenanceMode', value)}
              />
            </div>
            {settings.maintenanceMode && (
              <div className="p-3 bg-orange-100 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-800">
                  ⚠️ Maintenance mode is enabled. Users will see a maintenance message when trying to access the application.
                </p>
              </div>
            )}
          </div>
        </SettingCard>

        {/* System Information */}
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-0 shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <SettingsIcon size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">System Information</h3>
              <p className="text-sm text-slate-600">Current system status and information</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Version:</span>
                <span className="font-medium text-slate-900">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Uptime:</span>
                <span className="font-medium text-slate-900">15 days, 8 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Database Size:</span>
                <span className="font-medium text-slate-900">245 MB</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Last Backup:</span>
                <span className="font-medium text-slate-900">2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Active Users:</span>
                <span className="font-medium text-slate-900">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Storage Used:</span>
                <span className="font-medium text-slate-900">1.2 GB / 10 GB</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;