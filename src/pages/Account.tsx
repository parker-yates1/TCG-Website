import React from 'react';
import { Package, Heart, MapPin, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useShop } from '../context/ShopContext';
import { useNotification } from '../context/NotificationContext';

const Account: React.FC = () => {
    const navigate = useNavigate();
    const { userEmail, logout } = useAuth();
    const { user, clearUser } = useUser();
    const { wishlist } = useShop();
    const { showNotification } = useNotification();

    const displayName = user?.displayName || user?.username || 'John Doe';
    const email = user?.email || userEmail || 'john.doe@example.com';
    const initials = displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-8 mb-6 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-violet-600 dark:to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {initials}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold dark:text-white">{displayName}</h2>
                            <p className="text-gray-600 dark:text-gray-400">{email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            clearUser();
                            logout();
                            showNotification('Logged out successfully', 'info');
                            navigate('/');
                        }}
                        className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <Package className="w-6 h-6 text-blue-600 dark:text-violet-400" />
                        <h3 className="text-xl font-bold dark:text-white">Orders</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Track and manage your orders</p>
                    <button className="px-4 py-2 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        View Orders
                    </button>
                </div>

                <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-6 h-6 text-red-600" />
                        <h3 className="text-xl font-bold dark:text-white">Wishlist</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{wishlist.length} items saved</p>
                    <button
                        onClick={() => navigate('/wishlist')}
                        className="px-4 py-2 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        View Wishlist
                    </button>
                </div>

                <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-green-600" />
                        <h3 className="text-xl font-bold dark:text-white">Addresses</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Manage shipping addresses</p>
                    <button className="px-4 py-2 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Manage Addresses
                    </button>
                </div>

                <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <CreditCard className="w-6 h-6 text-purple-600 dark:text-violet-400" />
                        <h3 className="text-xl font-bold dark:text-white">Payment Methods</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Manage payment options</p>
                    <button className="px-4 py-2 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Manage Cards
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;
