import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { 
  Moon, 
  Sun, 
  Bell, 
  Globe, 
  DollarSign, 
  Shield,
  Download,
  Trash2,
  Save
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailAlerts: true,
    currency: 'USD',
    language: 'en',
    budgetWarnings: true,
    autoBackup: false
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
      description: "Your settings have been successfully updated."
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Your data export will be ready shortly."
    });
  };

  const SettingCard = ({ title, description, children, icon: Icon }) => (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Icon size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
            <p className="text-sm text-slate-600 mb-4">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Customize your expense tracker experience</p>
        </div>
        <Button 
          onClick={handleSave}
          className="mt-4 lg:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Save size={20} className="mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <SettingCard
          title="Appearance"
          description="Customize the look and feel of your application"
          icon={settings.darkMode ? Moon : Sun}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode" className="text-slate-700">Dark Mode</Label>
              <Switch
                id="darkMode"
                checked={settings.darkMode}
                onCheckedChange={(value) => handleSettingChange('darkMode', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Language</Label>
                <p className="text-sm text-slate-500">Choose your preferred language</p>
              </div>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SettingCard>

        {/* Notifications */}
        <SettingCard
          title="Notifications"
          description="Manage how and when you receive notifications"
          icon={Bell}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-slate-700">Push Notifications</Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(value) => handleSettingChange('notifications', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailAlerts" className="text-slate-700">Email Alerts</Label>
              <Switch
                id="emailAlerts"
                checked={settings.emailAlerts}
                onCheckedChange={(value) => handleSettingChange('emailAlerts', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="budgetWarnings" className="text-slate-700">Budget Warnings</Label>
              <Switch
                id="budgetWarnings"
                checked={settings.budgetWarnings}
                onCheckedChange={(value) => handleSettingChange('budgetWarnings', value)}
              />
            </div>
          </div>
        </SettingCard>

        {/* Currency & Localization */}
        <SettingCard
          title="Currency & Localization"
          description="Set your preferred currency and regional settings"
          icon={DollarSign}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-slate-700">Currency</Label>
                <p className="text-sm text-slate-500">Choose your default currency</p>
              </div>
              <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SettingCard>

        {/* Privacy & Security */}
        <SettingCard
          title="Privacy & Security"
          description="Control your data privacy and security preferences"
          icon={Shield}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoBackup" className="text-slate-700">Auto Backup</Label>
              <Switch
                id="autoBackup"
                checked={settings.autoBackup}
                onCheckedChange={(value) => handleSettingChange('autoBackup', value)}
              />
            </div>
            <div className="pt-4 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline"
                  onClick={handleExportData}
                  className="justify-start hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  Export Data
                </Button>
                <Button 
                  variant="outline"
                  className="justify-start hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Application Info */}
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-0 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Globe size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Application Information</h3>
              <p className="text-sm text-slate-600 mt-1">Version 1.0.0 • Last updated January 2025</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;