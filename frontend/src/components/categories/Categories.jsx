import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Target,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { mockCategories, mockCategoryExpenses } from '../../mock';
import { useToast } from '../../hooks/use-toast';

const Categories = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleAddCategory = () => {
    toast({
      title: "Feature coming soon",
      description: "Category creation will be available soon."
    });
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
    const isNearLimit = percentage > 80;

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
                <span className="text-sm font-bold">
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

          {/* Spending Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Spent</span>
              <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-slate-900'}`}>
                ${spentAmount.toFixed(2)} / ${budgetAmount}
              </span>
            </div>
            <Progress 
              value={Math.min(percentage, 100)} 
              className="h-2"
              style={{
                backgroundColor: '#e2e8f0'
              }}
            />
            <div className="flex justify-between items-center">
              <Badge 
                variant={isOverBudget ? 'destructive' : isNearLimit ? 'secondary' : 'outline'}
                className="text-xs"
              >
                {percentage.toFixed(0)}%
              </Badge>
              {isOverBudget && (
                <div className="flex items-center space-x-1 text-red-600">
                  <AlertTriangle size={12} />
                  <span className="text-xs">Over budget</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="pt-2 border-t border-slate-100">
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
                <p className="text-xs text-slate-600">Avg/Month</p>
                <p className="font-semibold text-sm text-slate-900">
                  ${(spentAmount / 1).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const totalBudget = mockCategoryExpenses.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = mockCategoryExpenses.reduce((sum, cat) => sum + (cat.spent || 0), 0);
  const overBudgetCategories = mockCategoryExpenses.filter(cat => {
    const percentage = cat.budget > 0 ? (cat.spent / cat.budget * 100) : 0;
    return percentage > 100;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-600 mt-1">Manage your expense categories and budgets</p>
        </div>
        <Button 
          onClick={handleAddCategory}
          className="mt-4 lg:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus size={20} className="mr-2" />
          Add Category
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Target size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Budget</p>
              <p className="text-2xl font-bold text-slate-900">${totalBudget}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Spent</p>
              <p className="text-2xl font-bold text-slate-900">${totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <AlertTriangle size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Over Budget</p>
              <p className="text-2xl font-bold text-slate-900">{overBudgetCategories.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockCategoryExpenses.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Empty State */}
      {mockCategoryExpenses.length === 0 && (
        <Card className="p-12 text-center shadow-md border-0 bg-white/80 backdrop-blur-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target size={24} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No categories yet</h3>
          <p className="text-slate-600 mb-4">
            Create your first category to start organizing your expenses.
          </p>
          <Button 
            onClick={handleAddCategory}
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

export default Categories;