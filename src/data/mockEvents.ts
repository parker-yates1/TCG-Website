import { StoreEvent } from '../types';

// Helper to get dates relative to today for dynamic mock data
const today = new Date();
const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
};

export const mockEvents: StoreEvent[] = [
    {
        id: '1',
        title: 'Friday Night Magic - Draft',
        storeName: 'Dragon\'s Den Games',
        storeAddress: '123 Main St, Anytown',
        date: addDays(today, 0), // Today
        time: '6:30 PM',
        game: 'Magic: The Gathering',
        format: 'Draft',
        entryFee: '$15',
        prizeSupport: 'Pack per win',
        description: 'Join us for our weekly Draft! We are drafting the latest core set. All skill levels welcome.',
        imageUrl: 'https://images.unsplash.com/photo-1611002341271-e0c6df67dae0?auto=format&fit=crop&q=80&w=400',
        storeLogoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Dragon'
    },
    {
        id: '2',
        title: 'Pokémon League Challenge',
        storeName: 'Cardboard Keep',
        storeAddress: '456 Oak Rd, Somewhere',
        date: addDays(today, 2),
        time: '1:00 PM',
        game: 'Pokémon',
        format: 'Standard',
        entryFee: '$10',
        prizeSupport: 'Store Credit + Promos',
        description: 'Monthly League Challenge. Earn Championship Points and exclusive promo cards!',
        imageUrl: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&q=80&w=400',
        storeLogoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Keep'
    },
    {
        id: '3',
        title: 'Yu-Gi-Oh! Local Tournament',
        storeName: 'The Mystic Shoppe',
        storeAddress: '789 Pine Ave, Nowhere',
        date: addDays(today, 2),
        time: '4:00 PM',
        game: 'Yu-Gi-Oh!',
        format: 'Advanced',
        entryFee: '$5',
        prizeSupport: 'OTS Packs',
        description: 'Weekly locals. Every participant receives at least one OTS pack.',
        storeLogoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Mystic'
    },
    {
        id: '4',
        title: 'Commander Night',
        storeName: 'Dragon\'s Den Games',
        storeAddress: '123 Main St, Anytown',
        date: addDays(today, 4),
        time: '6:00 PM',
        game: 'Magic: The Gathering',
        format: 'Commander',
        entryFee: 'Free',
        prizeSupport: 'Random Promo Giveaways',
        description: 'Casual Commander open play. Find a pod, play some games, and make friends!',
        imageUrl: 'https://images.unsplash.com/photo-1593814681464-eef5af2b0628?auto=format&fit=crop&q=80&w=400',
        storeLogoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Dragon'
    },
    {
        id: '5',
        title: 'One Piece Case Tournament',
        storeName: 'Cardboard Keep',
        storeAddress: '456 Oak Rd, Somewhere',
        date: addDays(today, 7),
        time: '11:00 AM',
        game: 'One Piece',
        format: 'Standard',
        entryFee: '$30',
        prizeSupport: 'A whole booster case split among Top 8',
        description: 'Massive prize pool for this weekend. Pre-registration recommended as seats are limited to 64 players.',
        storeLogoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Keep'
    },
    {
        id: '6',
        title: 'Lorcana Learn to Play',
        storeName: 'The Mystic Shoppe',
        storeAddress: '789 Pine Ave, Nowhere',
        date: addDays(today, 10),
        time: '2:00 PM',
        game: 'Disney Lorcana',
        format: 'Casual / Beginner',
        entryFee: 'Free',
        description: 'Never played Lorcana? Come learn with our staff! Starter decks will be available for purchase, or borrow one of ours for the event.',
        storeLogoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Mystic'
    }
];
