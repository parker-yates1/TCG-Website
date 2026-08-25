import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import { useNotification } from '../context/NotificationContext';
import { useUser } from '../context/UserContext';
import GameSelector from '../components/preferences/GameSelector';
import ShoppingModeSelector from '../components/preferences/ShoppingModeSelector';
import EmailPreferenceToggle from '../components/preferences/EmailPreferenceToggle';
import { ShoppingMode } from '../types';
import {
    Sparkles,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
} from 'lucide-react';

const Welcome: React.FC = () => {
    const navigate = useNavigate();
    const { preferences, savePreferences, skipOnboarding } = useOnboarding();
    const { showNotification } = useNotification();
    const { user } = useUser();

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [selectedGames, setSelectedGames] = useState<string[]>(
        preferences.interestedGames.length > 0
            ? preferences.interestedGames
            : ['Magic: The Gathering', 'Pokémon']
    );
    const [shoppingMode, setShoppingMode] = useState<ShoppingMode | null>(
        preferences.shoppingMode || 'mix'
    );
    const [emailNewsletter, setEmailNewsletter] = useState<boolean>(
        preferences.emailNewsletter ?? true
    );
    const [isSaving, setIsSaving] = useState(false);

    const totalSteps = 4;
    const displayName = user?.displayName || user?.username || 'Collector';

    const handleSkip = () => {
        skipOnboarding();
        showNotification('You can customize your preferences anytime from your Account page.', 'info');
        navigate('/');
    };

    const handleFinish = async () => {
        setIsSaving(true);
        try {
            await savePreferences({
                interestedGames: selectedGames,
                shoppingMode,
                emailNewsletter,
            });
            showNotification('Preferences saved! Welcome to TCG Marketplace.');
            navigate('/');
        } catch (e) {
            console.error('Error saving onboarding preferences', e);
            showNotification('Preferences updated locally.', 'info');
            navigate('/');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50/50 via-gray-50 to-white dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0a0f1e] flex flex-col justify-between py-8 px-4 transition-colors duration-300">
            <div className="max-w-3xl mx-auto w-full">
                {/* Top Nav / Progress */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-violet-400">
                            Setup & Personalization
                        </span>
                        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                            Step {currentStep} of {totalSteps}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={handleSkip}
                        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                        Skip for now <ArrowRight size={14} />
                    </button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mb-8">
                    <div
                        className="bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 h-full transition-all duration-300 ease-out"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>

                {/* Step Container Card */}
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-6 md:p-10 transition-all duration-300">
                    {/* Step 1: Introduction */}
                    {currentStep === 1 && (
                        <div className="space-y-6 text-center py-4">
                            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-violet-600 dark:to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20 dark:shadow-violet-500/20">
                                <Sparkles size={32} />
                            </div>

                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                                    Welcome, {displayName}! 👋
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-base">
                                    Let's configure your marketplace preferences so you can find the exact cards, local game store events, and best deals you care about.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4 pt-4 text-left">
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-violet-900/40 text-blue-700 dark:text-violet-300 flex items-center justify-center font-bold text-sm mb-3">
                                        1
                                    </div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Targeted Games</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Filter cards and sets to your favorite TCGs.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-violet-900/40 text-blue-700 dark:text-violet-300 flex items-center justify-center font-bold text-sm mb-3">
                                        2
                                    </div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Shopping Strategy</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Prioritize local shops, lowest prices, or online.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-violet-900/40 text-blue-700 dark:text-violet-300 flex items-center justify-center font-bold text-sm mb-3">
                                        3
                                    </div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Deal Alerts</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Get notified about price drops and tournaments.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(2)}
                                    className="px-8 py-3.5 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                                >
                                    Get Started <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Game Selection */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    Which games are you interested in?
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    We'll customize your search results, navigation bar, and event recommendations.
                                </p>
                            </div>

                            <GameSelector
                                selectedGames={selectedGames}
                                onChange={setSelectedGames}
                            />

                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(1)}
                                    className="px-5 py-2.5 border border-gray-300 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition flex items-center gap-1.5 cursor-pointer text-sm"
                                >
                                    <ArrowLeft size={16} /> Back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(3)}
                                    className="px-6 py-2.5 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer text-sm"
                                >
                                    Continue <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Shopping Mode */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    How do you prefer to shop?
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Choose how you'd like the marketplace to prioritize pricing and fulfillment.
                                </p>
                            </div>

                            <ShoppingModeSelector
                                selectedMode={shoppingMode}
                                onChange={setShoppingMode}
                            />

                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(2)}
                                    className="px-5 py-2.5 border border-gray-300 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition flex items-center gap-1.5 cursor-pointer text-sm"
                                >
                                    <ArrowLeft size={16} /> Back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(4)}
                                    disabled={!shoppingMode}
                                    className="px-6 py-2.5 bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer text-sm"
                                >
                                    Continue <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Contact / Finish */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    Stay connected & final summary
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Almost done! Review your selections and configure email alerts.
                                </p>
                            </div>

                            <EmailPreferenceToggle
                                enabled={emailNewsletter}
                                onChange={setEmailNewsletter}
                            />

                            {/* Summary Card */}
                            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-200/80 dark:border-white/10 space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Your Profile Configuration Summary
                                </h4>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm border-b border-gray-200 dark:border-white/10 pb-2">
                                    <span className="text-gray-500 dark:text-gray-400">Games ({selectedGames.length}):</span>
                                    <span className="font-semibold text-gray-900 dark:text-white text-right truncate max-w-xs">
                                        {selectedGames.length === 0
                                            ? 'None selected (all games shown)'
                                            : selectedGames.join(', ')}
                                    </span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm border-b border-gray-200 dark:border-white/10 pb-2">
                                    <span className="text-gray-500 dark:text-gray-400">Shopping Preference:</span>
                                    <span className="font-semibold text-gray-900 dark:text-white capitalize">
                                        {shoppingMode ? shoppingMode.replace('_', ' ') : 'Not selected'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Email Notifications:</span>
                                    <span className={`font-semibold ${emailNewsletter ? 'text-green-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {emailNewsletter ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(3)}
                                    className="px-5 py-2.5 border border-gray-300 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition flex items-center gap-1.5 cursor-pointer text-sm"
                                >
                                    <ArrowLeft size={16} /> Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleFinish}
                                    disabled={isSaving}
                                    className="px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-violet-600 dark:to-blue-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                                >
                                    {isSaving ? (
                                        'Saving...'
                                    ) : (
                                        <>
                                            <CheckCircle2 size={18} /> Complete Setup & Start Browsing
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
