import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import NavMenu from './components/NavMenu';
import { useAuth } from './context/AuthContext';

 function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
    {isAuthenticated && <NavMenu />}

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
        path="/notfound" 
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<LoginPage />} />
    </Routes>
    </>
  );
}

export default App
