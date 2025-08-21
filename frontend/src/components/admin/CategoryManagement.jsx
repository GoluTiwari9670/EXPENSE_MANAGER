import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Target,
  TrendingUp,
  Search,
  Palette
} from 'lucide-react';
import { mockCategories, mockCategoryExpenses } from '../../mock';
import { useToast } from '../../hooks/use-toast';

const CategoryManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    budget: '',
    color: '#FF6B6B'
  });

  const filteredCategories = mockCategoryExpenses.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = () => {
    if (!newCategory.name || !newCategory.budget) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Category created",
      description: `${newCategory.name} has been successfully created.`
    });
    
    setIsCreating(false);
    setNewCategory({ name: '', budget: '', color: '#FF6B6B' });
  };

  const handleEditCategory = (categoryId) => {
    toast({
      title: "Feature coming soon",
      description: "Category editing will be available soon."
    });
  };

  const handleDeleteCategory = (categoryId) => {
    toast({
      title: "Category deleted",
      description: "The category has been successfully deleted."
    });
  };

  const CategoryCard = ({ category }) => {
    const spentAmount = category.spent || 0;
    const budgetAmount = category.budget || 0;
    const percentage = budgetAmount > 0 ? (spentAmount / budgetAmount * 100) : 0;
    const isOverBudget = percentage > 100;

    return (
      <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm group">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: category.color }}
              >
                <span className="text-lg font-bold">
                  {category.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{category.name}</h3>
                <p className="text-sm text-slate-600">Budget: ${budgetAmount}</p>
              </div>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleEditCategory(category.id)}
                className="h-8 w-8 hover:bg-blue-100 hover:text-blue-600"
              >
                <Edit size={14} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleDeleteCategory(category.id)}
                className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Usage</span>
              <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-slate-900'}`}>
                ${spentAmount.toFixed(2)} / ${budgetAmount}
              </span>
            </div>
            
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(percentage, 100)}%`,
                  backgroundColor: isOverBudget ? '#EF4444' : category.color
                }}
              />
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className={isOverBudget ? 'text-red-600' : 'text-slate-600'}>
                {percentage.toFixed(0)}% used
              </span>
              {isOverBudget && (
                <span className="text-red-600 font-medium">Over budget!</span>
              )}
            </div>
          </div>

          {/* Additional Stats */}
          <div className="pt-3 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-slate-600">Remaining</p>
                <p className={`font-semibold text-sm ${
                  budgetAmount - spentAmount < 0 ? 'text-red-600' : 'text-emerald-600'
                }`}>
                  ${Math.max(0, budgetAmount - spentAmount).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-600">Transactions</p>
                <p className="font-semibold text-sm text-slate-900">
                  {mockCategoryExpenses.find(c => c.id === category.id)?.transactionCount || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', 
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Category Management</h1>
          <p className="text-slate-600 mt-1">Manage expense categories and budgets</p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="mt-4 lg:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus size={20} className="mr-2" />
          Add Category
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Target size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Categories</p>
              <p className="text-2xl font-bold text-slate-900">{mockCategories.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Budget</p>
              <p className="text-2xl font-bold text-slate-900">
                ${mockCategoryExpenses.reduce((sum, cat) => sum + cat.budget, 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Target size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Over Budget</p>
              <p className="text-2xl font-bold text-slate-900">
                {mockCategoryExpenses.filter(cat => {
                  const percentage = cat.budget > 0 ? (cat.spent / cat.budget * 100) : 0;
                  return percentage > 100;
                }).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-md border-0">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </Card>

      {/* Create Category Form */}
      {isCreating && (
        <Card className="p-6 shadow-md border-0 bg-white/80 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Create New Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                placeholder="e.g., Food & Dining"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="categoryBudget">Monthly Budget</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-semibold">$</span>
                <Input
                  id="categoryBudget"
                  type="number"
                  placeholder="0.00"
                  value={newCategory.budget}
                  onChange={(e) => setNewCategory({...newCategory, budget: e.target.value})}
                  className="pl-8 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label>Category Color</Label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewCategory({...newCategory, color})}
                    className={`w-8 h-8 rounded-lg transition-transform hover:scale-110 ${
                      newCategory.color === color ? 'ring-2 ring-slate-400 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <Button 
              onClick={handleCreateCategory}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            >
              Create Category
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsCreating(false)}
              className="hover:bg-slate-50"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && !isCreating && (
        <Card className="p-12 text-center shadow-md border-0 bg-white/80 backdrop-blur-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target size={24} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No categories found</h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your search or create a new category.
          </p>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
          >
            <Plus size={16} className="mr-2" />
            Create First Category
          </Button>
        </Card>
      )}
    </div>
  );
};

export default CategoryManagement;