import React, { useState } from 'react';
import {
    Package,
    Heart,
    MapPin,
    CreditCard,
    Sliders,
    Save,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useShop } from '../context/ShopContext';
import { useNotification } from '../context/NotificationContext';
import { useOnboarding } from '../context/OnboardingContext';
import GameSelector from '../components/preferences/GameSelector';
import ShoppingModeSelector from '../components/preferences/ShoppingModeSelector';
import LocationSelector from '../components/preferences/LocationSelector';
import EmailPreferenceToggle from '../components/preferences/EmailPreferenceToggle';
import { ShoppingMode } from '../types';

const Account: React.FC = () => {
    const navigate = useNavigate();
    const { userEmail, logout } = useAuth();
    const { user, clearUser } = useUser();
    const { wishlist } = useShop();
    const { showNotification } = useNotification();
    const { preferences, savePreferences } = useOnboarding();

    const [isEditingPreferences, setIsEditingPreferences] = useState(false);
    const [selectedGames, setSelectedGames] = useState<string[]>(
        preferences.interestedGames || []
    );
    const [shoppingMode, setShoppingMode] = useState<ShoppingMode | null>(
        preferences.shoppingMode || 'mix'
    );
    const [zipCode, setZipCode] = useState<string>(preferences.zipCode || '');
    const [useBrowserLocation, setUseBrowserLocation] = useState<boolean>(
        preferences.useBrowserLocation || false
    );
    const [latitude, setLatitude] = useState<number | null>(preferences.latitude ?? null);
    const [longitude, setLongitude] = useState<number | null>(preferences.longitude ?? null);
    const [locationCityState, setLocationCityState] = useState<string>(
        preferences.locationCityState || ''
    );
    const [emailNewsletter, setEmailNewsletter] = useState<boolean>(
        preferences.emailNewsletter ?? true
    );
    const [isSaving, setIsSaving] = useState(false);

    const displayName = user?.displayName || user?.username || 'Collector';
    const email = user?.email || userEmail || 'collector@tcgmarketplace.com';
    const initials = displayName.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() || 'U';

    const handleSavePreferences = async () => {
        setIsSaving(true);
        try {
            await savePreferences({
                interestedGames: selectedGames,
                shoppingMode,
                zipCode,
                useBrowserLocation,
                latitude,
                longitude,
                locationCityState,
                emailNewsletter,
            });
            showNotification('Preferences successfully updated!');
            setIsEditingPreferences(false);
        } catch (e) {
            console.error('Failed to save preferences', e);
            showNotification('Preferences saved locally.', 'info');
            setIsEditingPreferences(false);
        } finally {
            setIsSaving(false);
        }
    };

    const handleLocationChange = (data: {
        zipCode: string;
        useBrowserLocation: boolean;
        latitude?: number | null;
        longitude?: number | null;
        locationCityState?: string;
    }) => {
        setZipCode(data.zipCode);
        setUseBrowserLocation(data.useBrowserLocation);
        setLatitude(data.latitude ?? null);
        setLongitude(data.longitude ?? null);
        setLocationCityState(data.locationCityState || '');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            {/* Profile Header */}
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md border border-gray-100 dark:border-white/10 p-6 md:p-8 transition-colors duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-violet-600 dark:to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold shadow-md">
                            {initials}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{displayName}</h2>
                                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 dark:bg-violet-900/40 text-blue-800 dark:text-violet-300">
                                    Member
                                </span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{email}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Preferred shopping:{' '}
                                <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize">
                                    {preferences.shoppingMode ? preferences.shoppingMode.replace('_', ' ') : 'Not set'}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                clearUser();
                                logout();
                                showNotification('Logged out successfully', 'info');
                                navigate('/');
                            }}
                            className="px-4 py-2 border border-red-300 dark:border-red-800/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 font-semibold rounded-xl text-sm transition cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Preferences Management Section */}
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md border border-gray-100 dark:border-white/10 p-6 md:p-8 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-violet-900/30 text-blue-700 dark:text-violet-400 flex items-center justify-center">
                            <Sliders size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Marketplace & Game Preferences</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Customize which games appear in your feeds, local pickup area, and how shopping results are prioritized.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            if (isEditingPreferences) {
                                setSelectedGames(preferences.interestedGames || []);
                                setShoppingMode(preferences.shoppingMode || 'mix');
                                setZipCode(preferences.zipCode || '');
                                setUseBrowserLocation(preferences.useBrowserLocation || false);
                                setLatitude(preferences.latitude ?? null);
                                setLongitude(preferences.longitude ?? null);
                                setLocationCityState(preferences.locationCityState || '');
                                setEmailNewsletter(preferences.emailNewsletter ?? true);
                            }
                            setIsEditingPreferences(!isEditingPreferences);
                        }}
                        className="px-4 py-2 text-sm font-semibold rounded-xl border border-gray-300 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 transition cursor-pointer"
                    >
                        {isEditingPreferences ? 'Cancel' : 'Edit Preferences'}
                    </button>
                </div>

                {!isEditingPreferences ? (
                    /* Read-Only Summary */
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                Interested Games ({preferences.interestedGames?.length || 0})
                            </h4>
                            {preferences.interestedGames && preferences.interestedGames.length > 0 ? (
                                <div className="flex flex-wrap gap-1.5">
                                    {preferences.interestedGames.map((game) => (
                                        <span
                                            key={game}
                                            className="px-2.5 py-1 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-lg text-xs font-medium text-gray-800 dark:text-gray-200"
                                        >
                                            {game}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">No specific games selected (showing all)</p>
                            )}
                        </div>

                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                Shopping Preference
                            </h4>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                {preferences.shoppingMode
                                    ? preferences.shoppingMode.replace('_', ' ')
                                    : 'Mix of local & online (Default)'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Prioritizes inventory according to your local and online balance.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                                <MapPin size={13} className="text-blue-600 dark:text-violet-400" /> Location / Area
                            </h4>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {preferences.useBrowserLocation && preferences.latitude !== null
                                    ? (preferences.locationCityState || `GPS (Lat: ${preferences.latitude?.toFixed(2)})`)
                                    : preferences.zipCode
                                    ? `ZIP Code: ${preferences.zipCode}`
                                    : 'Not specified'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Used for store pickup and distance calculations.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                Email Notifications
                            </h4>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`w-2.5 h-2.5 rounded-full ${
                                        preferences.emailNewsletter ? 'bg-green-500' : 'bg-gray-400'
                                    }`}
                                />
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {preferences.emailNewsletter ? 'Subscribed to Alerts' : 'Unsubscribed'}
                                </p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Deals, tournament alerts, and weekly price updates.
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Edit Mode */
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Favorite Trading Card Games</h4>
                            <GameSelector
                                selectedGames={selectedGames}
                                onChange={setSelectedGames}
                                compact={true}
                            />
                        </div>

                        <div>
                            <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Shopping Priority</h4>
                            <ShoppingModeSelector
                                selectedMode={shoppingMode}
                                onChange={setShoppingMode}
                                compact={true}
                            />
                        </div>

                        <div>
                            <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Location & Local Pickup Area</h4>
                            <LocationSelector
                                zipCode={zipCode}
                                useBrowserLocation={useBrowserLocation}
                                latitude={latitude}
                                longitude={longitude}
                                locationCityState={locationCityState}
                                shoppingMode={shoppingMode}
                                onChange={handleLocationChange}
                                compact={true}
                            />
                        </div>

                        <div>
                            <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Email & Communication</h4>
                            <EmailPreferenceToggle
                                enabled={emailNewsletter}
                                onChange={setEmailNewsletter}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
                            <button
                                type="button"
                                onClick={() => setIsEditingPreferences(false)}
                                className="px-5 py-2.5 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 font-medium text-sm transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSavePreferences}
                                disabled={isSaving}
                                className="px-6 py-2.5 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition flex items-center gap-2 cursor-pointer text-sm"
                            >
                                <Save size={16} /> {isSaving ? 'Saving...' : 'Save Preferences'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Actions Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md border border-gray-100 dark:border-white/10 p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-violet-900/30 text-blue-600 dark:text-violet-400 flex items-center justify-center">
                            <Package className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Orders & Purchases</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Track current shipments and order history</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => showNotification('Orders feature coming soon!', 'info')}
                        className="px-4 py-2 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
                    >
                        View Orders
                    </button>
                </div>

                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md border border-gray-100 dark:border-white/10 p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
                            <Heart className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Wishlist & Saved Cards</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{wishlist.length} items saved</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate('/wishlist')}
                        className="px-4 py-2 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
                    >
                        View Wishlist
                    </button>
                </div>

                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md border border-gray-100 dark:border-white/10 p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-emerald-950/40 text-green-600 dark:text-emerald-400 flex items-center justify-center">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Shipping Addresses</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Manage delivery locations and primary address</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => showNotification('Address manager coming soon!', 'info')}
                        className="px-4 py-2 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
                    >
                        Manage Addresses
                    </button>
                </div>

                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md border border-gray-100 dark:border-white/10 p-6 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment Methods</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Manage saved payment cards and billing</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => showNotification('Payment settings coming soon!', 'info')}
                        className="px-4 py-2 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
                    >
                        Manage Cards
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;
