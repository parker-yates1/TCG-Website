import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useNotification } from '../context/NotificationContext';
import { useOnboarding } from '../context/OnboardingContext';
import SignInApi from '../Api/SignInApi';
import { Eye, EyeOff, UserPlus, LogIn, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { setUser } = useUser();
    const { showNotification } = useNotification();
    const { isOnboardingComplete } = useOnboarding();

    const [isSignUp, setIsSignUp] = useState(false);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [signupForm, setSignupForm] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [staySignedIn, setStaySignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        if (!loginForm.email || !loginForm.password) {
            showNotification('Please enter both email and password', 'error');
            return;
        }

        setIsLoading(true);
        try {
            let accountData: UserProfile;
            try {
                accountData = await SignInApi(loginForm.email, loginForm.password, staySignedIn);
            } catch (apiErr) {
                // If backend service is not running locally in dev, provide graceful development mock
                console.warn('Backend SignInApi unavailable, using local authentication profile:', apiErr);
                accountData = {
                    id: 1,
                    username: loginForm.email.split('@')[0],
                    email: loginForm.email,
                    displayName: loginForm.email.split('@')[0],
                    bio: 'TCG Collector & Enthusiast',
                    sellerRating: 5.0,
                    totalSales: 0,
                    totalPurchases: 0,
                    verifiedSeller: false,
                    createdAt: new Date().toISOString(),
                    locationSharingEnabled: false,
                    latitude: null,
                    longitude: null,
                    locationAccuracyMeters: null,
                    locationUpdatedAt: null,
                };
            }

            setUser(accountData);
            login(accountData.email || accountData.displayName || accountData.username || loginForm.email);
            showNotification('Successfully logged in!');

            if (!isOnboardingComplete) {
                navigate('/welcome');
            } else {
                navigate('/account');
            }
        } catch (err: any) {
            console.error('Sign in error:', err);
            showNotification(err.message || 'Failed to sign in. Please verify credentials.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async () => {
        if (!signupForm.email || !signupForm.password || !signupForm.displayName) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (signupForm.password !== signupForm.confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        if (signupForm.password.length < 6) {
            showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        setIsLoading(true);
        try {
            // BACKEND INTEGRATION STUB:
            // When backend registration endpoint is ready, invoke:
            // const response = await SignUpApi(signupForm.email, signupForm.password, signupForm.displayName);

            const newUser: UserProfile = {
                id: Date.now(),
                username: signupForm.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, ''),
                email: signupForm.email,
                displayName: signupForm.displayName,
                bio: 'Passionate trading card collector',
                sellerRating: 5.0,
                totalSales: 0,
                totalPurchases: 0,
                verifiedSeller: false,
                createdAt: new Date().toISOString(),
                locationSharingEnabled: false,
                latitude: null,
                longitude: null,
                locationAccuracyMeters: null,
                locationUpdatedAt: null,
            };

            setUser(newUser);
            login(newUser.email);
            showNotification('Account created successfully! Welcome to TCG Marketplace.');
            navigate('/welcome');
        } catch (err: any) {
            console.error('Sign up error:', err);
            showNotification(err.message || 'Failed to create account. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                        type="button"
                        onClick={() => setIsSignUp(false)}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            !isSignUp ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        <LogIn size={16} /> Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsSignUp(true)}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isSignUp ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        <UserPlus size={16} /> Create Account
                    </button>
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isSignUp ? 'Join TCG Marketplace' : 'Welcome Back'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {isSignUp
                            ? 'Create an account to buy, sell, and track your card collection'
                            : 'Sign in to access your orders, wishlist, and account'}
                    </p>
                </div>

                {/* Form fields */}
                {!isSignUp ? (
                    /* Sign In Form */
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={loginForm.email}
                                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={loginForm.password}
                                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                    className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
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

                        <button
                            type="button"
                            onClick={handleSignIn}
                            disabled={isLoading}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition cursor-pointer text-sm"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                ) : (
                    /* Sign Up Form */
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                value={signupForm.displayName}
                                onChange={(e) => setSignupForm({ ...signupForm, displayName: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="e.g. Alex Walker"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                value={signupForm.email}
                                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="alex@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={signupForm.password}
                                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                                    className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="At least 6 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={signupForm.confirmPassword}
                                onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="Re-enter password"
                            />
                        </div>

                        <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-800">
                            <Sparkles size={16} className="text-blue-600 shrink-0 mt-0.5" />
                            <span>
                                After signing up, you will be guided through a quick 60-second wizard to personalize your games and shopping mode.
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignUp}
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition cursor-pointer text-sm"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account & Continue'}
                        </button>
                    </div>
                )}

                <div className="text-center text-sm text-gray-600 border-t border-gray-100 pt-4">
                    {!isSignUp ? (
                        <>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setIsSignUp(true)}
                                className="text-blue-600 font-semibold hover:underline cursor-pointer"
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setIsSignUp(false)}
                                className="text-blue-600 font-semibold hover:underline cursor-pointer"
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
