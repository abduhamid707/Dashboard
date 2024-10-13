import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Redux'dan ma'lumot olish uchun
import './style.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const role = useSelector((state) => state.auth.role); // Redux'dan role ma'lumotini olish

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>Hi {role.toString()}</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/stores" className={({ isActive }) => (isActive ? 'active' : '')}>
              Store
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
