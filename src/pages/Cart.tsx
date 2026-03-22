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
                <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
                <div className="text-center py-20">
                    <ShoppingCart className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-6">Start adding some cards to your collection!</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Browse Cards
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex gap-6">
                            <div className="rounded-lg w-24 h-24 overflow-hidden flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.game}</p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                        {item.rarity}
                                    </span>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {item.condition}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border rounded-lg">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 border-x">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100"
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
                                <div className="text-2xl font-bold text-blue-600">
                                    ${(item.price * item.quantity).toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-600">
                                    ${item.price.toLocaleString()} each
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                        <h3 className="font-bold text-xl mb-4">Order Summary</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">${totalCartPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Estimated Tax</span>
                                <span className="font-medium">${estimatedTax.toFixed(2)}</span>
                            </div>
                            {shippingCost > 0 && (
                                <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                                    Add ${(100 - totalCartPrice).toFixed(2)} more for free shipping!
                                </div>
                            )}
                            <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-blue-600">${totalWithTaxShipping.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition mb-3"
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full py-3 border-2 border-gray-300 rounded-lg font-medium hover:border-blue-500 hover:text-blue-500 transition"
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
