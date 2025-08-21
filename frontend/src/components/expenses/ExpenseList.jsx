import React, { useState, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Filter, 
  Calendar,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { mockExpenses, mockCategories } from '../../mock';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/use-toast';

const ExpenseList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = mockExpenses.filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || expense.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortBy === 'amount') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleDelete = (expenseId) => {
    // Mock delete
    toast({
      title: "Expense deleted",
      description: "The expense has been successfully deleted."
    });
  };

  const getCategoryColor = (categoryId) => {
    return mockCategories.find(cat => cat.id === categoryId)?.color || '#666666';
  };

  const totalAmount = filteredAndSortedExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Expense List</h1>
          <p className="text-slate-600 mt-1">Manage and track your expenses</p>
        </div>
        <Button 
          className="mt-4 lg:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => navigate('/add-expense')}
        >
          <Plus size={20} className="mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-md border-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          
          <Select onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {mockCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-slate-500" />
            <span className="text-sm text-slate-600">
              {filteredAndSortedExpenses.length} expenses • ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      {/* Expense List */}
      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
        {/* Table Header */}
        <div className="p-4 border-b border-slate-200">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-slate-600">
            <div className="col-span-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSort('description')}
                className="h-8 px-2 hover:bg-slate-100"
              >
                Description <ArrowUpDown size={14} className="ml-1" />
              </Button>
            </div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSort('amount')}
                className="h-8 px-2 hover:bg-slate-100"
              >
                Amount <ArrowUpDown size={14} className="ml-1" />
              </Button>
            </div>
            <div className="col-span-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSort('date')}
                className="h-8 px-2 hover:bg-slate-100"
              >
                Date <ArrowUpDown size={14} className="ml-1" />
              </Button>
            </div>
            <div className="col-span-2">Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-200">
          {filteredAndSortedExpenses.map((expense) => (
            <div 
              key={expense.id} 
              className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => navigate(`/expenses/${expense.id}`)}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">
                  <div>
                    <p className="font-medium text-slate-900">{expense.description}</p>
                    {expense.notes && (
                      <p className="text-sm text-slate-500 mt-1">{expense.notes}</p>
                    )}
                  </div>
                </div>
                
                <div className="col-span-2">
                  <Badge 
                    variant="secondary" 
                    className="text-white border-0"
                    style={{ backgroundColor: getCategoryColor(expense.categoryId) }}
                  >
                    {expense.category}
                  </Badge>
                </div>
                
                <div className="col-span-2">
                  <span className="font-semibold text-slate-900">
                    ${expense.amount.toFixed(2)}
                  </span>
                </div>
                
                <div className="col-span-2">
                  <div className="flex items-center space-x-1 text-slate-600">
                    <Calendar size={14} />
                    <span className="text-sm">
                      {new Date(expense.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-emerald-100 hover:text-emerald-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/expenses/${expense.id}`);
                      }}
                    >
                      <Eye size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-100 hover:text-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Edit functionality
                      }}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(expense.id);
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedExpenses.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No expenses found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search or filter criteria, or add a new expense.
            </p>
            <Button 
              onClick={() => navigate('/add-expense')}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            >
              <Plus size={16} className="mr-2" />
              Add First Expense
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ExpenseList;