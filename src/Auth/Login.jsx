import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api/axios';
import { setCredentials } from '../store/authSlice';
import './style.scss'; // CSS faylni import qilamiz

const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('login', {
                phone,
                password,
            });

            // Backend-dan kelgan ma'lumotlar
            const { token, role, adminType, data } = res.data;

            // Redux orqali ma'lumotlarni saqlash
            dispatch(setCredentials({
                token,
                role,
                adminType,
                userName: data.name,
                userId: data._id,
                phone: data.phone,
            }));

            // Dashboardga yo'naltirish
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid phone or password');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
