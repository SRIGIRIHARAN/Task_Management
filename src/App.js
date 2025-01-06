import './App.css';
import './assests/styles/Common.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Navbar from './components/layout/Navbar/Navbar';

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <div className={`routes-div ${location.pathname === "/login" ? "routes-div-login" : ""}`}>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
