import React from 'react';
import { Package, Heart, MapPin, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useNotification } from '../context/NotificationContext';

const Account: React.FC = () => {
    const navigate = useNavigate();
    const { userEmail, logout } = useAuth();
    const { wishlist } = useShop();
    const { showNotification } = useNotification();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            JD
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">John Doe</h2>
                            <p className="text-gray-600">{userEmail || 'john.doe@example.com'}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            showNotification('Logged out successfully', 'info');
                            navigate('/');
                        }}
                        className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Package className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-bold">Orders</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Track and manage your orders</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        View Orders
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-6 h-6 text-red-600" />
                        <h3 className="text-xl font-bold">Wishlist</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{wishlist.length} items saved</p>
                    <button
                        onClick={() => navigate('/wishlist')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        View Wishlist
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-green-600" />
                        <h3 className="text-xl font-bold">Addresses</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Manage shipping addresses</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Manage Addresses
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <CreditCard className="w-6 h-6 text-purple-600" />
                        <h3 className="text-xl font-bold">Payment Methods</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Manage payment options</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Manage Cards
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;
