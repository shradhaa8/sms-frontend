import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error before new request

        try {
            const response = await axios.post("https://sms-backend-theta.vercel.app/api/auth/login", { email, password });

            if (response?.data?.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);

                if (response.data.user?.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/student-dashboard');
                }
            }
        } catch (error) {
            setError(error.response?.data?.error || "Server Error");
        }
    };

    return (
        <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-cyan-500 from-50% to-gray-100 to-50% space-y-6'>
            <h2 className='font-sevillana text-3xl text-white'>Student Management System</h2>
            <div className='border shadow p-6 w-80 bg-white'>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                {error && <p className='text-red-500'>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-gray-700'>Email</label>
                        <input 
                            type="email" 
                            className='w-full px-3 py-2 border' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block text-gray-700'>Password</label>
                        <input 
                            type="password" 
                            className='w-full px-3 py-2 border' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder='Enter your password'
                        />
                    </div>
                    <div className='mb-4 flex items-center justify-between'>
                        <label className='inline-flex items-center'>
                            <input type='checkbox' className='form-checkbox' />
                            <span className='ml-2 text-gray-700'>Remember me</span>
                        </label>
                        <a href='#' className='text-cyan-500'>Forgot password?</a>
                    </div>
                    <div className='mb-4'>
                        <button type='submit' className='w-full bg-cyan-500 text-white py-2'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
