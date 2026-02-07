import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { searchQuery, setSearchQuery } = useProduct();
    const { cart, wishlist } = useShop();
    const { isLoggedIn } = useAuth();
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <header className="sticky top-0 z-50 shadow-sm flex flex-col">
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-8">
                            <h1
                                className="text-2xl font-bold cursor-pointer hover:text-blue-300 transition"
                                onClick={() => navigate('/')}
                            >
                                TCG Marketplace
                            </h1>
                            <div className="flex-1 max-w-2xl relative hidden md:block">
                                <input
                                    type="text"
                                    placeholder="Search cards..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-4 pr-10 py-2 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            <button
                                onClick={() => navigate(isLoggedIn ? '/account' : '/login')}
                                className="flex items-center gap-1 text-sm font-medium hover:text-blue-300 transition"
                            >
                                <User className="w-5 h-5" />
                                <span className="hidden sm:inline">Sign In</span>
                            </button>

                            <button
                                onClick={() => navigate('/wishlist')}
                                className="relative p-2 hover:bg-white/10 rounded-lg transition"
                            >
                                <Heart className="w-6 h-6" fill={wishlist.length > 0 ? 'currentColor' : 'none'} />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => navigate('/cart')}
                                className="relative p-2 hover:bg-white/10 rounded-lg transition"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Navigation */}
            <div className="bg-black text-white py-2 hidden md:block">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex gap-6 text-sm font-bold">
                        <Link to="/" className="hover:text-gray-300">Magic: The Gathering</Link>
                        <Link to="/" className="hover:text-gray-300">Yu-Gi-Oh!</Link>
                        <Link to="/" className="hover:text-gray-300">Pokémon</Link>
                        <Link to="/" className="hover:text-gray-300">Disney Lorcana</Link>
                        <Link to="/" className="hover:text-gray-300">One Piece</Link>
                        <Link to="/" className="hover:text-gray-300">Digimon</Link>
                        <Link to="/" className="hover:text-gray-300">Star Wars: Unlimited</Link>
                        <Link to="/" className="hover:text-gray-300">Flesh and Blood</Link>
                        <Link to="/stores" className="hover:text-gray-300 ml-auto font-normal">Local Stores</Link>
                        <Link to="/sell" className="hover:text-gray-300 font-normal">Sell</Link>
                        <Link to="/mass-entry" className="hover:text-gray-300 font-normal">Mass Entry</Link>
                    </nav>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="bg-gray-900 text-white p-4 md:hidden">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search cards..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <nav className="flex flex-col gap-3">
                        <Link to="/" onClick={() => setShowMobileMenu(false)} className="py-2 border-b border-gray-800">Browse</Link>
                        <Link to="/stores" onClick={() => setShowMobileMenu(false)} className="py-2 border-b border-gray-800">Local Stores</Link>
                        <Link to="/sell" onClick={() => setShowMobileMenu(false)} className="py-2 border-b border-gray-800">Sell</Link>
                        <Link to="/mass-entry" onClick={() => setShowMobileMenu(false)} className="py-2 border-b border-gray-800">Mass Entry</Link>
                        <Link to="/about" onClick={() => setShowMobileMenu(false)} className="py-2">About</Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
