import React from 'react';
import { Mail, BellRing, ShieldCheck } from 'lucide-react';

interface EmailPreferenceToggleProps {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}

const EmailPreferenceToggle: React.FC<EmailPreferenceToggleProps> = ({ enabled, onChange }) => {
    return (
        <div className="space-y-4">
            <div
                onClick={() => onChange(!enabled)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    enabled
                        ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
            >
                <div className="flex items-start gap-4">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            enabled ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 text-base">TCG Digest & Price Alerts</h4>
                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                                Recommended
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            Receive email notifications for price drops on your wishlist, local tournament announcements, and weekly marketplace deals.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                                <BellRing size={14} className="text-blue-600" /> Curated weekly digests
                            </span>
                            <span className="flex items-center gap-1">
                                <ShieldCheck size={14} className="text-green-600" /> No spam, unsubscribe anytime
                            </span>
                        </div>
                    </div>
                </div>

                {/* Toggle switch */}
                <div className="pt-1">
                    <button
                        type="button"
                        role="switch"
                        aria-checked={enabled}
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange(!enabled);
                        }}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            enabled ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                    >
                        <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                enabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailPreferenceToggle;
