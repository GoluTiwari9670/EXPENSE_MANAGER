import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useToast } from '../../hooks/use-toast';
import { mockCategories } from '../../mock';
import { CalendarIcon, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AddExpense = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    amount: '',
    categoryId: '',
    description: '',
    date: new Date(),
    notes: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.categoryId || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newExpense = {
        id: Date.now().toString(),
        userId: '1',
        amount: parseFloat(formData.amount),
        categoryId: formData.categoryId,
        category: mockCategories.find(cat => cat.id === formData.categoryId)?.name || '',
        description: formData.description,
        date: format(formData.date, 'yyyy-MM-dd'),
        notes: formData.notes
      };

      // In real app, this would be sent to backend
      console.log('New expense created:', newExpense);
      
      toast({
        title: "Success!",
        description: "Expense added successfully",
      });
      
      setIsLoading(false);
      navigate('/expenses');
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate('/')}
          className="hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add New Expense</h1>
          <p className="text-slate-600">Track your spending with detailed information</p>
        </div>
      </div>

      <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-slate-700 font-medium">
              Amount <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-semibold">$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="pl-8 h-12 text-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-700 font-medium">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={(value) => handleInputChange('categoryId', value)} required>
              <SelectTrigger className="h-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 transition-colors">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
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
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700 font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <Input
              id="description"
              placeholder="e.g., Lunch at restaurant"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="h-12 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium">
              Date <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-normal border-slate-300 hover:border-emerald-500 transition-colors"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => handleInputChange('date', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-700 font-medium">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="min-h-[100px] border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding Expense...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save size={20} />
                  <span>Add Expense</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddExpense;