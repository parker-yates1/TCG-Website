import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useShop();

    const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const estimatedTax = totalCartPrice * 0.08;
    const shippingCost = totalCartPrice > 100 ? 0 : 5.99;
    const totalWithTaxShipping = totalCartPrice + estimatedTax + shippingCost;

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold mb-8 dark:text-white">Shopping Cart</h2>
                <div className="text-center py-20">
                    <ShoppingCart className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Start adding some cards to your collection!</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Browse Cards
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">Shopping Cart</h2>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 flex gap-6 transition-colors duration-300">
                            <div className="rounded-lg w-24 h-24 overflow-hidden flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1 dark:text-white">{item.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.game}</p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-purple-100 dark:bg-violet-900/40 text-purple-800 dark:text-violet-300 px-2 py-1 rounded">
                                        {item.rarity}
                                    </span>
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                                        {item.condition}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border dark:border-white/10 rounded-lg">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-white/5 dark:text-white"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 border-x dark:border-white/10 dark:text-white">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-white/5 dark:text-white"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600 dark:text-violet-400">
                                    ${(item.price * item.quantity).toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    ${item.price.toLocaleString()} each
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="bg-white dark:bg-[#1e293b] dark:border dark:border-white/10 rounded-lg shadow-md p-6 sticky top-24 transition-colors duration-300">
                        <h3 className="font-bold text-xl mb-4 dark:text-white">Order Summary</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="font-medium dark:text-white">${totalCartPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                <span className="font-medium dark:text-white">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Estimated Tax</span>
                                <span className="font-medium dark:text-white">${estimatedTax.toFixed(2)}</span>
                            </div>
                            {shippingCost > 0 && (
                                <div className="text-sm text-blue-600 dark:text-violet-400 bg-blue-50 dark:bg-violet-900/20 p-2 rounded">
                                    Add ${(100 - totalCartPrice).toFixed(2)} more for free shipping!
                                </div>
                            )}
                            <div className="border-t dark:border-white/10 pt-3 flex justify-between text-lg font-bold">
                                <span className="dark:text-white">Total</span>
                                <span className="text-blue-600 dark:text-violet-400">${totalWithTaxShipping.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full py-3 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition mb-3"
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full py-3 border-2 border-gray-300 dark:border-white/20 dark:text-white rounded-lg font-medium hover:border-blue-500 dark:hover:border-violet-500 hover:text-blue-500 dark:hover:text-violet-400 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
