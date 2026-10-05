import React, { useState } from 'react';
import { MapPin, Navigation, CheckCircle2, AlertCircle, Loader2, Sparkles, Building2 } from 'lucide-react';
import { ShoppingMode } from '../../types';

interface LocationSelectorProps {
    zipCode: string;
    useBrowserLocation: boolean;
    latitude?: number | null;
    longitude?: number | null;
    locationCityState?: string;
    shoppingMode?: ShoppingMode | null;
    onChange: (locationData: {
        zipCode: string;
        useBrowserLocation: boolean;
        latitude?: number | null;
        longitude?: number | null;
        locationCityState?: string;
    }) => void;
    compact?: boolean;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
    zipCode,
    useBrowserLocation,
    latitude,
    longitude,
    locationCityState,
    shoppingMode = 'mix',
    onChange,
    compact = false,
}) => {
    const [isDetecting, setIsDetecting] = useState(false);
    const [detectError, setDetectError] = useState<string | null>(null);
    const [localZip, setLocalZip] = useState(zipCode || '');

    const isOnlineExclusive = shoppingMode === 'online_only';

    const handleDetectLocation = () => {
        if (!navigator.geolocation) {
            setDetectError('Geolocation is not supported by your browser.');
            return;
        }

        setIsDetecting(true);
        setDetectError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                let cityState = '';
                try {
                    // Reverse geocoding via public OpenStreetMap API
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
                    );
                    if (res.ok) {
                        const data = await res.json();
                        const address = data.address || {};
                        const city = address.city || address.town || address.village || address.county || '';
                        const state = address.state || '';
                        const postcode = address.postcode || '';

                        if (city && state) {
                            cityState = `${city}, ${state}`;
                        } else if (city) {
                            cityState = city;
                        }

                        if (postcode && !localZip) {
                            setLocalZip(postcode);
                        }
                    }
                } catch {
                    // Non-blocking fallback if reverse geocoding fails
                    cityState = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
                }

                onChange({
                    zipCode: localZip || (cityState ? '' : zipCode),
                    useBrowserLocation: true,
                    latitude: lat,
                    longitude: lon,
                    locationCityState: cityState || `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`,
                });

                setIsDetecting(false);
            },
            (error) => {
                setIsDetecting(false);
                if (error.code === error.PERMISSION_DENIED) {
                    setDetectError('Location access was denied. You can enter your ZIP code below.');
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    setDetectError('Location information is unavailable. Please enter your ZIP code.');
                } else {
                    setDetectError('Could not detect location. Please enter your ZIP code instead.');
                }
            },
            { timeout: 10000, enableHighAccuracy: false }
        );
    };

    const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const cleaned = raw.replace(/\D/g, '').slice(0, 5);
        setLocalZip(cleaned);

        onChange({
            zipCode: cleaned,
            useBrowserLocation: false, // switched to manual ZIP
            latitude: null,
            longitude: null,
            locationCityState: cleaned ? `ZIP ${cleaned}` : '',
        });
    };

    const handleClearLocation = () => {
        setLocalZip('');
        setDetectError(null);
        onChange({
            zipCode: '',
            useBrowserLocation: false,
            latitude: null,
            longitude: null,
            locationCityState: '',
        });
    };

    return (
        <div className="space-y-4">
            {/* Header banner explaining local relevance */}
            {isOnlineExclusive ? (
                <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-white/5 border border-blue-100 dark:border-white/10 text-xs text-blue-800 dark:text-gray-300 flex items-start gap-2.5">
                    <Building2 size={16} className="text-blue-600 dark:text-violet-400 shrink-0 mt-0.5" />
                    <div>
                        <span className="font-semibold">Online Exclusive Shopping Selected:</span> Local distance filtering is optional since you prefer nationwide delivery. You can still set your ZIP code if you wish to see nearby tournament events.
                    </div>
                </div>
            ) : (
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-violet-950/20 dark:to-blue-950/20 border border-blue-100 dark:border-white/10 text-xs text-blue-900 dark:text-violet-200 flex items-start gap-2.5">
                    <Sparkles size={16} className="text-blue-600 dark:text-violet-400 shrink-0 mt-0.5" />
                    <div>
                        <span className="font-semibold">Local Store & Inventory Search:</span> Because you chose local or mixed shopping, providing your area allows us to prioritize local game store pickups and calculate accurate driving distances.
                    </div>
                </div>
            )}

            <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {/* Option 1: Browser GPS / Geolocation */}
                <div
                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        useBrowserLocation && latitude !== null
                            ? 'border-blue-600 dark:border-violet-500 bg-blue-50/70 dark:bg-violet-950/30 ring-1 ring-blue-600 dark:ring-violet-500 shadow-sm'
                            : 'border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f172a] hover:border-blue-300 dark:hover:border-white/30'
                    }`}
                >
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    useBrowserLocation && latitude !== null
                                        ? 'bg-blue-600 dark:bg-violet-600 text-white'
                                        : 'bg-blue-100 dark:bg-white/10 text-blue-600 dark:text-violet-400'
                                }`}
                            >
                                <Navigation className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-violet-900/40 text-blue-800 dark:text-violet-300">
                                Automatic
                            </span>
                        </div>

                        <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                            Use Current Browser Location
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                            Automatically detect your precise location for the most accurate local game store inventory and distance calculation.
                        </p>

                        {/* Status feedback */}
                        {useBrowserLocation && latitude !== null && (
                            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 mb-3 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 truncate">
                                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                                    <span className="truncate">
                                        {locationCityState || `Lat: ${latitude?.toFixed(2)}, Lon: ${longitude?.toFixed(2)}`}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleClearLocation}
                                    className="text-[11px] text-red-600 dark:text-red-400 hover:underline shrink-0 cursor-pointer"
                                >
                                    Clear
                                </button>
                            </div>
                        )}

                        {detectError && (
                            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 mb-3 flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
                                <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                                <span>{detectError}</span>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleDetectLocation}
                        disabled={isDetecting}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                            useBrowserLocation && latitude !== null
                                ? 'bg-white dark:bg-white/10 text-blue-700 dark:text-violet-300 border border-blue-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-white/20'
                                : 'bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 hover:bg-blue-700 text-white shadow-sm'
                        }`}
                    >
                        {isDetecting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" /> Detecting Location...
                            </>
                        ) : useBrowserLocation && latitude !== null ? (
                            <>
                                <Navigation size={16} /> Re-detect Location
                            </>
                        ) : (
                            <>
                                <Navigation size={16} /> Detect My Location
                            </>
                        )}
                    </button>
                </div>

                {/* Option 2: Manual ZIP Code */}
                <div
                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        !useBrowserLocation && localZip.length >= 5
                            ? 'border-blue-600 dark:border-violet-500 bg-blue-50/70 dark:bg-violet-950/30 ring-1 ring-blue-600 dark:ring-violet-500 shadow-sm'
                            : 'border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f172a] hover:border-blue-300 dark:hover:border-white/30'
                    }`}
                >
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    !useBrowserLocation && localZip.length >= 5
                                        ? 'bg-blue-600 dark:bg-violet-600 text-white'
                                        : 'bg-purple-100 dark:bg-white/10 text-purple-600 dark:text-violet-400'
                                }`}
                            >
                                <MapPin className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300">
                                Manual Entry
                            </span>
                        </div>

                        <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                            Enter Postal / ZIP Code
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                            Prefer privacy or shopping for another region? Enter your 5-digit US ZIP code manually.
                        </p>

                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                                5-Digit ZIP Code
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                                    <MapPin size={16} />
                                </div>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={localZip}
                                    onChange={handleZipChange}
                                    placeholder="e.g. 98101, 90210"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 text-sm font-mono tracking-wider font-semibold"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                            {localZip.length === 5 ? (
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                    <CheckCircle2 size={13} /> Valid 5-digit ZIP
                                </span>
                            ) : localZip.length > 0 ? (
                                `${5 - localZip.length} more digits needed`
                            ) : (
                                'Type 5 digits to set'
                            )}
                        </span>
                        {localZip && (
                            <button
                                type="button"
                                onClick={handleClearLocation}
                                className="text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                            >
                                Clear ZIP
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationSelector;
