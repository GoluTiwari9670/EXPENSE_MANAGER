// Mock data for expense tracker
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    totalExpenses: 2450.75,
    monthlyBudget: 3000,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    role: 'user',
    totalExpenses: 1890.20,
    monthlyBudget: 2500,
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    totalExpenses: 0,
    monthlyBudget: 0,
    createdAt: '2024-01-01'
  }
];

export const mockCategories = [
  { id: '1', name: 'Food & Dining', icon: 'utensils', color: '#FF6B6B', budget: 800 },
  { id: '2', name: 'Transportation', icon: 'car', color: '#4ECDC4', budget: 400 },
  { id: '3', name: 'Shopping', icon: 'shopping-bag', color: '#45B7D1', budget: 300 },
  { id: '4', name: 'Entertainment', icon: 'film', color: '#96CEB4', budget: 200 },
  { id: '5', name: 'Bills & Utilities', icon: 'zap', color: '#FECA57', budget: 600 },
  { id: '6', name: 'Healthcare', icon: 'heart', color: '#FF9FF3', budget: 200 },
  { id: '7', name: 'Education', icon: 'book', color: '#54A0FF', budget: 150 },
  { id: '8', name: 'Travel', icon: 'map-pin', color: '#5F27CD', budget: 250 }
];

export const mockExpenses = [
  {
    id: '1',
    userId: '1',
    amount: 45.50,
    categoryId: '1',
    category: 'Food & Dining',
    description: 'Lunch at Italian restaurant',
    date: '2025-01-20',
    notes: 'Business lunch with client'
  },
  {
    id: '2',
    userId: '1',
    amount: 120.00,
    categoryId: '2',
    category: 'Transportation',
    description: 'Monthly metro pass',
    date: '2025-01-19',
    notes: 'Renewed for February'
  },
  {
    id: '3',
    userId: '1',
    amount: 85.25,
    categoryId: '3',
    category: 'Shopping',
    description: 'Groceries at supermarket',
    date: '2025-01-18',
    notes: 'Weekly grocery shopping'
  },
  {
    id: '4',
    userId: '2',
    amount: 25.00,
    categoryId: '4',
    category: 'Entertainment',
    description: 'Movie tickets',
    date: '2025-01-17',
    notes: 'Weekend movie with friends'
  },
  {
    id: '5',
    userId: '1',
    amount: 180.75,
    categoryId: '5',
    category: 'Bills & Utilities',
    description: 'Electricity bill',
    date: '2025-01-16',
    notes: 'January electricity usage'
  }
];

export const mockStats = {
  totalUsers: 2,
  totalExpenses: 3456.50,
  averageMonthlyExpense: 1728.25,
  topCategory: 'Food & Dining',
  monthlyGrowth: 12.5
};

// Current logged in user (mock)
export const mockCurrentUser = mockUsers[0]; // John Doe as default user

// Admin user for admin panel
export const mockAdminUser = mockUsers[2];

export const mockMonthlyData = [
  { month: 'Jan', amount: 2450 },
  { month: 'Feb', amount: 2180 },
  { month: 'Mar', amount: 2650 },
  { month: 'Apr', amount: 2320 },
  { month: 'May', amount: 2890 },
  { month: 'Jun', amount: 2156 }
];

export const mockCategoryExpenses = mockCategories.map(cat => ({
  ...cat,
  spent: mockExpenses
    .filter(exp => exp.categoryId === cat.id)
    .reduce((sum, exp) => sum + exp.amount, 0)
}));