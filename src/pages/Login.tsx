import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showNotification } = useNotification();
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });

    return (
        <div className="max-w-md mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button
                    onClick={() => {
                        if (loginForm.email && loginForm.password) {
                            login(loginForm.email);
                            showNotification('Successfully logged in!');
                            navigate('/account');
                        } else {
                            showNotification('Please fill in all fields', 'error');
                        }
                    }}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition mb-4"
                >
                    Sign In
                </button>

                <div className="text-center text-sm text-gray-600">
                    Don't have an account? <button className="text-blue-600 hover:underline">Sign up</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
