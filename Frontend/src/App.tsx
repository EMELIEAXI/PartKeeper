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
        path="/history" 
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />

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
