import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserPreferences, ShoppingMode } from '../types';
import { useUser } from './UserContext';

interface OnboardingContextType {
    preferences: UserPreferences;
    isOnboardingComplete: boolean;
    setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
    savePreferences: (newPrefs: Partial<UserPreferences>) => Promise<void>;
    skipOnboarding: () => void;
    resetOnboarding: () => void;
}

const DEFAULT_PREFERENCES: UserPreferences = {
    interestedGames: [],
    shoppingMode: null,
    emailNewsletter: true,
    onboardingCompleted: false,
    zipCode: '',
    useBrowserLocation: false,
    latitude: null,
    longitude: null,
    locationCityState: '',
};

const STORAGE_KEY = 'tcg_user_preferences';
const ONBOARDING_FLAG_KEY = 'tcg_onboarding_completed';

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, setUser } = useUser();

    const [preferences, setPreferences] = useState<UserPreferences>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load preferences from localStorage', e);
        }
        return DEFAULT_PREFERENCES;
    });

    const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(() => {
        return localStorage.getItem(ONBOARDING_FLAG_KEY) === 'true' || preferences.onboardingCompleted;
    });

    // Keep state in sync if user changes or has backend preferences
    useEffect(() => {
        if (user?.preferences) {
            setPreferences(user.preferences);
            if (user.preferences.onboardingCompleted) {
                setIsOnboardingComplete(true);
                localStorage.setItem(ONBOARDING_FLAG_KEY, 'true');
            }
        }
    }, [user]);

    const savePreferences = async (newPrefs: Partial<UserPreferences>) => {
        const updated: UserPreferences = {
            ...preferences,
            ...newPrefs,
            onboardingCompleted: true,
        };

        setPreferences(updated);
        setIsOnboardingComplete(true);

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            localStorage.setItem(ONBOARDING_FLAG_KEY, 'true');
        } catch (e) {
            console.error('Failed to save preferences to localStorage', e);
        }

        // Sync with UserContext if logged in
        if (user) {
            setUser({
                ...user,
                latitude: newPrefs.latitude !== undefined ? newPrefs.latitude : user.latitude,
                longitude: newPrefs.longitude !== undefined ? newPrefs.longitude : user.longitude,
                locationSharingEnabled: newPrefs.useBrowserLocation !== undefined ? newPrefs.useBrowserLocation : user.locationSharingEnabled,
                preferences: updated,
            });
        }

        // BACKEND INTEGRATION STUB:
        // When backend endpoint is ready, invoke:
        // await fetch(`/api/users/${user?.id}/preferences`, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        //     body: JSON.stringify(updated),
        // });
    };

    const skipOnboarding = () => {
        setIsOnboardingComplete(true);
        localStorage.setItem(ONBOARDING_FLAG_KEY, 'true');
        setPreferences((prev) => ({
            ...prev,
            onboardingCompleted: true,
        }));
    };

    const resetOnboarding = () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(ONBOARDING_FLAG_KEY);
        setPreferences(DEFAULT_PREFERENCES);
        setIsOnboardingComplete(false);
    };

    return (
        <OnboardingContext.Provider
            value={{
                preferences,
                isOnboardingComplete,
                setPreferences,
                savePreferences,
                skipOnboarding,
                resetOnboarding,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
};
