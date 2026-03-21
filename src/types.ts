export interface Card {
    id: number | string;
    name: string;
    image: string;
    rarity: string;
    condition: string;
    game: string;
    rating: number | string;
    seller: string;
    price: number;
    stock: number;
}

export interface Filters {
    game: string[];
    rarity: string[];
    condition: string[];
    priceRange: string[];
    minPrice?: string;
    maxPrice?: string;
    printing: string[];
}

export interface NotificationItem {
    type: 'success' | 'error' | 'info';
    message: string;
}

export interface CartItem extends Card {
    quantity: number;
}

export interface LoginForm {
    email: string;
    password: string;
}

export interface ShippingInfo {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface StoreEvent {
    id: string;
    title: string;
    storeName: string;
    storeAddress: string;
    date: string;
    time: string;
    game: string;
    format: string;
    entryFee?: string;
    prizeSupport?: string;
    description?: string;
    imageUrl?: string;
    storeLogoUrl?: string;
}





