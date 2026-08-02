import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useNotification } from '../context/NotificationContext';
import SignInApi from '../Api/SignInApi';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { setUser } = useUser();
    const { showNotification } = useNotification();
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [staySignedIn, setStaySignedIn] = useState(false);

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
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center pt-1">
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none">
                            <input
                                type="checkbox"
                                checked={staySignedIn}
                                onChange={(e) => setStaySignedIn(e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                            />
                            <span>Stay signed in</span>
                        </label>
                    </div>
                </div>

                <button
                    onClick={async () => {
                        if (loginForm.email && loginForm.password) {
                            try {
                                const accountData = await SignInApi(loginForm.email, loginForm.password, staySignedIn);
                                console.log('Successfully signed in. Account data:', accountData);
                                setUser(accountData);
                                login(accountData.email || accountData.displayName || accountData.username || loginForm.email);
                                showNotification('Successfully logged in!');
                                navigate('/account');
                            } catch (err: any) {
                                console.error('Sign in error:', err);
                                showNotification(err.message || 'Failed to sign in. Please verify credentials.', 'error');
                            }
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
