import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Tag, 
  FileText,
  Edit,
  Trash2
} from 'lucide-react';
import { mockExpenses, mockCategories } from '../../mock';
import { useToast } from '../../hooks/use-toast';

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const expense = mockExpenses.find(exp => exp.id === id);
  const category = mockCategories.find(cat => cat.id === expense?.categoryId);

  if (!expense) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8 text-center shadow-md border-0 bg-white/80 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Expense Not Found</h2>
          <p className="text-slate-600 mb-6">The expense you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate('/expenses')}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Expenses
          </Button>
        </Card>
      </div>
    );
  }

  const handleDelete = () => {
    toast({
      title: "Expense deleted",
      description: "The expense has been successfully deleted."
    });
    navigate('/expenses');
  };

  const DetailItem = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${color || 'from-slate-400 to-slate-500'}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <p className="text-lg font-semibold text-slate-900 mt-1">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate('/expenses')}
          className="hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">Expense Details</h1>
          <p className="text-slate-600">View and manage expense information</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            size="icon"
            className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
          >
            <Edit size={20} />
          </Button>
          <Button 
            variant="outline"
            size="icon"
            onClick={handleDelete}
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        {/* Expense Title */}
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{expense.description}</h2>
          <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            ${expense.amount.toFixed(2)}
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-4">
          <DetailItem
            icon={Tag}
            label="Category"
            value={
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="secondary" 
                  className="text-white border-0"
                  style={{ backgroundColor: category?.color }}
                >
                  {expense.category}
                </Badge>
                <span className="text-sm text-slate-600">
                  Budget: ${category?.budget || 0}
                </span>
              </div>
            }
            color="from-purple-500 to-purple-600"
          />

          <DetailItem
            icon={Calendar}
            label="Date"
            value={new Date(expense.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            color="from-blue-500 to-blue-600"
          />

          <DetailItem
            icon={DollarSign}
            label="Amount"
            value={`$${expense.amount.toFixed(2)}`}
            color="from-emerald-500 to-emerald-600"
          />

          {expense.notes && (
            <DetailItem
              icon={FileText}
              label="Notes"
              value={expense.notes}
              color="from-orange-500 to-orange-600"
            />
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Additional Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Created:</span>
              <span className="ml-2 font-medium text-slate-900">
                {new Date(expense.date).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-slate-600">ID:</span>
              <span className="ml-2 font-mono text-slate-900">{expense.id}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-8 pt-6 border-t border-slate-200">
          <Button 
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Edit size={20} className="mr-2" />
            Edit Expense
          </Button>
          <Button 
            variant="outline"
            onClick={handleDelete}
            className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-colors"
          >
            <Trash2 size={20} className="mr-2" />
            Delete Expense
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ExpenseDetail;