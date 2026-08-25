import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useNotification } from '../context/NotificationContext';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const [checkoutStep, setCheckoutStep] = useState(1);
    const { cart, shippingInfo, setShippingInfo, clearCart } = useShop();
    const { showNotification } = useNotification();

    const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const estimatedTax = totalCartPrice * 0.08;
    const shippingCost = totalCartPrice > 100 ? 0 : 5.99;
    const totalWithTaxShipping = totalCartPrice + estimatedTax + shippingCost;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">Checkout</h2>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 mb-6 transition-colors duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${checkoutStep >= 1 ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300'}`}>
                                1
                            </div>
                            <h3 className="text-xl font-bold dark:text-white">Shipping Information</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={shippingInfo.name}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                                    className="w-full px-4 py-2 border dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 dark:bg-white/5 dark:text-white dark:placeholder-white/40"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                                <input
                                    type="text"
                                    value={shippingInfo.address}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                    className="w-full px-4 py-2 border dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 dark:bg-white/5 dark:text-white dark:placeholder-white/40"
                                    placeholder="123 Main St"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                                <input
                                    type="text"
                                    value={shippingInfo.city}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                    className="w-full px-4 py-2 border dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 dark:bg-white/5 dark:text-white dark:placeholder-white/40"
                                    placeholder="New York"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
                                <input
                                    type="text"
                                    value={shippingInfo.state}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                                    className="w-full px-4 py-2 border dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 dark:bg-white/5 dark:text-white dark:placeholder-white/40"
                                    placeholder="NY"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ZIP Code</label>
                                <input
                                    type="text"
                                    value={shippingInfo.zip}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                                    className="w-full px-4 py-2 border dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 dark:bg-white/5 dark:text-white dark:placeholder-white/40"
                                    placeholder="10001"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
                                <select
                                    value={shippingInfo.country}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                                    className="w-full px-4 py-2 border dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 dark:bg-[#1e293b] dark:text-white"
                                >
                                    <option value="US" className="dark:bg-[#1e293b] dark:text-white">United States</option>
                                    <option value="CA" className="dark:bg-[#1e293b] dark:text-white">Canada</option>
                                    <option value="UK" className="dark:bg-[#1e293b] dark:text-white">United Kingdom</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 transition-colors duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${checkoutStep >= 2 ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300'}`}>
                                2
                            </div>
                            <h3 className="text-xl font-bold dark:text-white">Payment</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 dark:bg-white/5 dark:text-white dark:placeholder-white/40"
                                    placeholder="1234 5678 9012 3456"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 dark:bg-white/5 dark:text-white dark:placeholder-white/40"
                                        placeholder="MM/YY"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 dark:bg-white/5 dark:text-white dark:placeholder-white/40"
                                        placeholder="123"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 sticky top-24 transition-colors duration-300">
                        <h3 className="font-bold text-xl mb-4 dark:text-white">Order Summary</h3>

                        <div className="space-y-3 mb-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">{item.name} x{item.quantity}</span>
                                    <span className="font-medium dark:text-white">${(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}

                            <div className="border-t dark:border-white/10 pt-3 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                    <span className="font-medium dark:text-white">${totalCartPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                    <span className="font-medium dark:text-white">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                                    <span className="font-medium dark:text-white">${estimatedTax.toFixed(2)}</span>
                                </div>
                                <div className="border-t dark:border-white/10 pt-3 flex justify-between text-lg font-bold">
                                    <span className="dark:text-white">Total</span>
                                    <span className="text-blue-600 dark:text-violet-400">${totalWithTaxShipping.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                showNotification('Order placed successfully! 🎉');
                                clearCart();
                                setTimeout(() => navigate('/account'), 1500);
                            }}
                            className="w-full py-3 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:from-violet-700 dark:hover:to-blue-700 transition"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
