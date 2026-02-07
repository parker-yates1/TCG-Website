import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Card, CartItem, ShippingInfo } from '../types';
import { useNotification } from './NotificationContext';
import { sampleCards } from '../data/mockData';

interface ShopContextType {
    cart: CartItem[];
    wishlist: Card[];
    shippingInfo: ShippingInfo;
    setShippingInfo: (info: ShippingInfo) => void;
    addToCart: (card: Card) => void;
    removeFromCart: (cardId: number | string) => void;
    clearCart: () => void;
    updateQuantity: (cardId: number | string, newQuantity: number) => void;
    toggleWishlist: (card: Card) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Card[]>([]);
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        name: '', address: '', city: '', state: '', zip: '', country: 'US'
    });
    const { showNotification } = useNotification();


    const addToCart = (card: Card) => {
        const existing = cart.find(item => item.id === card.id);
        if (existing) {
            if (existing.quantity < card.stock) {
                setCart(cart.map(item =>
                    item.id === card.id ? { ...item, quantity: item.quantity + 1 } : item
                ));
                showNotification(`Added another ${card.name} to cart`);
            } else {
                showNotification('Maximum stock reached', 'error');
            }
        } else {
            setCart([...cart, { ...card, quantity: 1 }]);
            showNotification(`${card.name} added to cart`);
        }
    };

    const removeFromCart = (cardId: number | string) => {
        setCart(cart.filter(item => item.id !== cardId));
        showNotification('Item removed from cart', 'info');
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateQuantity = (cardId: number | string, newQuantity: number) => {
        const card = sampleCards.find(c => c.id === cardId);
        if (!card) return;

        if (newQuantity > card.stock) {
            showNotification('Maximum stock reached', 'error');
            return;
        }
        if (newQuantity < 1) {
            removeFromCart(cardId);
            return;
        }
        setCart(cart.map(item =>
            item.id === cardId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const toggleWishlist = (card: Card) => {
        if (wishlist.find(item => item.id === card.id)) {
            setWishlist(wishlist.filter(item => item.id !== card.id));
            showNotification(`${card.name} removed from wishlist`, 'info');
        } else {
            setWishlist([...wishlist, card]);
            showNotification(`${card.name} added to wishlist`);
        }
    };

    return (
        <ShopContext.Provider value={{ cart, wishlist, shippingInfo, setShippingInfo, addToCart, removeFromCart, clearCart, updateQuantity, toggleWishlist }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
};
