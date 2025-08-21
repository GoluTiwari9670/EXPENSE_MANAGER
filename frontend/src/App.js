import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import AddExpense from './components/expenses/AddExpense';
import ExpenseList from './components/expenses/ExpenseList';
import ExpenseDetail from './components/expenses/ExpenseDetail';
import Categories from './components/categories/Categories';
import Profile from './components/profile/Profile';
import Settings from './components/settings/Settings';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import ExpenseReports from './components/admin/ExpenseReports';
import CategoryManagement from './components/admin/CategoryManagement';
import AdminSettings from './components/admin/AdminSettings';

import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-expense" element={<AddExpense />} />
            <Route path="expenses" element={<ExpenseList />} />
            <Route path="expenses/:id" element={<ExpenseDetail />} />
            <Route path="categories" element={<Categories />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<Layout isAdmin={true} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="reports" element={<ExpenseReports />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;