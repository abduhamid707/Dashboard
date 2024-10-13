import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './Auth/Login';
import './App.css';
import { useSelector } from 'react-redux';
import Store from './pages/Store/Store';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = useSelector((state) => state.auth.token); // Redux'dan token ma'lumotini olish
  // Sidebarni ochish/yopish funksiyasi 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      {/* Sidebar faqat login bo'lganda ko'rinadi */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isSidebarOpen ? '' : 'collapsed'}`}>
        {
            <button onClick={toggleSidebar} className="toggle-btn">
              {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>
        }
        <div className="content_wrapper">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                // <PrivateRoute>
                  <Dashboard />
              }
            />
            <Route
              path="/stores"
              element={
                <PrivateRoute>
                  <Store />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            {/* Agar foydalanuvchi bosh sahifaga o'tsa va token bo'lmasa, login sahifasiga yo'naltirish */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
