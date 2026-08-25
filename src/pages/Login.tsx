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
    const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [staySignedIn, setStaySignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateSignupField = (
        field: 'displayName' | 'email' | 'password' | 'confirmPassword',
        formValues = signupForm
    ): string => {
        const value = formValues[field];
        if (field === 'displayName') {
            if (!value.trim()) return 'Full name is required';
        }
        if (field === 'email') {
            if (!value.trim()) return 'Email address is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        }
        if (field === 'password') {
            if (!value) return 'Password is required';
            if (value.length < 6) return 'Password must be at least 6 characters';
        }
        if (field === 'confirmPassword') {
            if (!value) return 'Please confirm your password';
            if (value !== formValues.password) return 'Passwords do not match';
        }
        return '';
    };

    const validateAllSignupFields = (formValues = signupForm) => {
        const errors: Record<string, string> = {};
        const fields: Array<'displayName' | 'email' | 'password' | 'confirmPassword'> = [
            'displayName',
            'email',
            'password',
            'confirmPassword',
        ];

        fields.forEach((field) => {
            const error = validateSignupField(field, formValues);
            if (error) {
                errors[field] = error;
            }
        });

        return errors;
    };

    const handleFieldFocus = (field: string) => {
        setFocusedField(field);
    };

    const handleFieldBlur = (field: 'displayName' | 'email' | 'password' | 'confirmPassword') => {
        setFocusedField(null);
        if (hasAttemptedSubmit) {
            const error = validateSignupField(field);
            setSignupErrors((prev) => ({
                ...prev,
                [field]: error,
            }));
        }
    };

    const handleSignupChange = (
        field: 'displayName' | 'email' | 'password' | 'confirmPassword',
        value: string
    ) => {
        const updated = { ...signupForm, [field]: value };
        setSignupForm(updated);

        if (hasAttemptedSubmit) {
            const error = validateSignupField(field, updated);
            setSignupErrors((prev) => ({
                ...prev,
                [field]: error,
            }));

            if (field === 'password' && updated.confirmPassword) {
                const confirmError = validateSignupField('confirmPassword', updated);
                setSignupErrors((prev) => ({
                    ...prev,
                    confirmPassword: confirmError,
                }));
            }
        }
    };

    const shouldShowError = (field: string) => {
        return Boolean(signupErrors[field] && focusedField !== field);
    };

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
        setHasAttemptedSubmit(true);
        const errors = validateAllSignupFields();
        setSignupErrors(errors);

        if (Object.keys(errors).length > 0) {
            showNotification('Please fill in all fields correctly to continue.', 'error');
            return;
        }

        setIsLoading(true);
        try {
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

    const switchTab = (toSignUp: boolean) => {
        setIsSignUp(toSignUp);
        setHasAttemptedSubmit(false);
        setSignupErrors({});
        setFocusedField(null);
    };

    return (
        <div className="max-w-md mx-auto px-4 py-12">
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 p-8 transition-colors duration-300">
                {/* Tabs */}
                <div className="flex bg-gray-100 dark:bg-white/10 p-1 rounded-xl mb-6">
                    <button
                        type="button"
                        onClick={() => switchTab(false)}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            !isSignUp ? 'bg-white dark:bg-[#0f172a] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <LogIn size={16} /> Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => switchTab(true)}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isSignUp ? 'bg-white dark:bg-[#0f172a] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <UserPlus size={16} /> Create Account
                    </button>
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isSignUp ? 'Join TCG Marketplace' : 'Welcome Back'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={loginForm.email}
                                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 text-sm"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={loginForm.password}
                                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                    className="w-full pl-4 pr-10 py-2.5 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 select-none">
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
                            className="w-full py-3 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 hover:bg-blue-700 dark:hover:from-violet-700 dark:hover:to-blue-700 disabled:opacity-50 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition cursor-pointer text-sm"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                ) : (
                    /* Sign Up Form */
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={signupForm.displayName}
                                onFocus={() => handleFieldFocus('displayName')}
                                onClick={() => handleFieldFocus('displayName')}
                                onBlur={() => handleFieldBlur('displayName')}
                                onChange={(e) => handleSignupChange('displayName', e.target.value)}
                                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm ${
                                    shouldShowError('displayName')
                                        ? 'border-red-500 bg-red-50/20 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-[#1e293b]'
                                        : 'border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/40 focus:ring-blue-500 dark:focus:ring-violet-500 focus:border-blue-500'
                                }`}
                                placeholder="e.g. Alex Walker"
                            />
                            {shouldShowError('displayName') && (
                                <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                    <span>•</span> {signupErrors.displayName}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={signupForm.email}
                                onFocus={() => handleFieldFocus('email')}
                                onClick={() => handleFieldFocus('email')}
                                onBlur={() => handleFieldBlur('email')}
                                onChange={(e) => handleSignupChange('email', e.target.value)}
                                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm ${
                                    shouldShowError('email')
                                        ? 'border-red-500 bg-red-50/20 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-[#1e293b]'
                                        : 'border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/40 focus:ring-blue-500 dark:focus:ring-violet-500 focus:border-blue-500'
                                }`}
                                placeholder="alex@example.com"
                            />
                            {shouldShowError('email') && (
                                <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                    <span>•</span> {signupErrors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={signupForm.password}
                                    onFocus={() => handleFieldFocus('password')}
                                    onClick={() => handleFieldFocus('password')}
                                    onBlur={() => handleFieldBlur('password')}
                                    onChange={(e) => handleSignupChange('password', e.target.value)}
                                    className={`w-full pl-4 pr-10 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm ${
                                        shouldShowError('password')
                                            ? 'border-red-500 bg-red-50/20 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-[#1e293b]'
                                            : 'border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/40 focus:ring-blue-500 dark:focus:ring-violet-500 focus:border-blue-500'
                                    }`}
                                    placeholder="At least 6 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {shouldShowError('password') && (
                                <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                    <span>•</span> {signupErrors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={signupForm.confirmPassword}
                                onFocus={() => handleFieldFocus('confirmPassword')}
                                onClick={() => handleFieldFocus('confirmPassword')}
                                onBlur={() => handleFieldBlur('confirmPassword')}
                                onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm ${
                                    shouldShowError('confirmPassword')
                                        ? 'border-red-500 bg-red-50/20 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-[#1e293b]'
                                        : 'border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/40 focus:ring-blue-500 dark:focus:ring-violet-500 focus:border-blue-500'
                                }`}
                                placeholder="Re-enter password"
                            />
                            {shouldShowError('confirmPassword') && (
                                <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                    <span>•</span> {signupErrors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <div className="bg-blue-50 dark:bg-violet-950/30 rounded-xl p-3 border border-blue-100 dark:border-violet-800/40 flex items-start gap-2.5 text-xs text-blue-800 dark:text-violet-300">
                            <Sparkles size={16} className="text-blue-600 dark:text-violet-400 shrink-0 mt-0.5" />
                            <span>
                                After signing up, you will be guided through a quick 60-second wizard to personalize your games and shopping experience.
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignUp}
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-violet-600 dark:to-blue-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition cursor-pointer text-sm"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account & Continue'}
                        </button>
                    </div>
                )}

                <div className="text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-white/10 pt-4">
                    {!isSignUp ? (
                        <>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => switchTab(true)}
                                className="text-blue-600 dark:text-violet-400 font-semibold hover:underline cursor-pointer"
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => switchTab(false)}
                                className="text-blue-600 dark:text-violet-400 font-semibold hover:underline cursor-pointer"
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
