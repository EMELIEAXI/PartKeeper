import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import NavMenu from './components/NavMenu';
import Sidebar from './components/Sidebar';
import { useAuth } from './context/AuthContext';
import { useState } from 'react';
import PartsPage from './pages/PartsPage';
import HistoryPage from './pages/HistoryPage';
import MyAccount from './pages/MyAccount';
import AdminPage from './pages/AdminPage';
import AdminRoute from './routes/AdminRoute';
import ProductDetails from './components/parts-components/ProductDetails';
import AdminLayout from './components/admin-components/AdminLayout';
import AdminCreateUser from './components/admin-components/AdminCreateUser';
import AdminHandleUser from './components/admin-components/AdminHandleUser';
import mockUsers from './mock/users';
import AdminCreateProduct from './components/admin-components/AdminCreateProduct';
import AdminHandleProduct from './components/admin-components/AdminHandleProduct';

 function App() {
  const { isAuthenticated } = useAuth();
  const [ sidebarOpen, setSidebarOpen ] = useState(false);

  return (
    <>
    {isAuthenticated && <NavMenu onOpenSidebar={() => setSidebarOpen(true)} />}
    <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/parts" 
        element={
          <ProtectedRoute>
            <PartsPage />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/parts/:id" 
        element={
          <ProtectedRoute>
            <ProductDetails/>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/history" 
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/admin" 
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        {/* Adminsidor */}
        <Route index element={<AdminPage />} />

        <Route path="create-user" element={<AdminCreateUser />} />

        <Route path="handle-user" element={<AdminHandleUser users={mockUsers}/>} />

        <Route path="create-product" element={<AdminCreateProduct />} />

        <Route path="handle-product" element={<AdminHandleProduct />} />
        
      </Route>

      <Route 
        path="/notfound" 
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/my-account" 
        element={
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<LoginPage />} />
    </Routes>
    </>
  );
}

export default App
