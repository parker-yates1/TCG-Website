import React from 'react';
import MassEntrySubmitButton from '../components/MassEntrySubmitButton';
import MassEntryInput from '../components/MassEntryInput';

const MassEntry: React.FC = () => {
    const [entryText, setEntryText] = React.useState('');
    const [lineErrors, setLineErrors] = React.useState<Record<number, string>>({});

    const handleProcess = async (cards: any[]) => {
        // cards is ParsedCard[]
        console.log('Processed cards:', cards);

        const newErrors: Record<number, string> = {};

        // 1. Identify format errors from parser
        cards.forEach((c, i) => {
            if (!c.isValid && !c.isEmpty) {
                newErrors[i] = "Invalid format";
            }
        });

        // 2. Mock API Check (Placeholder for user implementation)
        // Simulate async operation
        // setTimeout(() => { ... }, 500);

        // Example: Mark lines with specific keywords as 'API Error' for testing
        // cards.forEach((c, i) => { 
        //    if (c.name.includes('error')) newErrors[i] = "Unrecognized Card"; 
        // });

        setLineErrors(newErrors);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        const newSelectionStart = e.target.selectionStart;

        // Smart clear: Remove error for the line being edited
        const textBeforeCursor = newValue.substring(0, newSelectionStart);
        const currentLineIndex = textBeforeCursor.split('\n').length - 1;

        if (lineErrors[currentLineIndex]) {
            setLineErrors(prev => {
                const next = { ...prev };
                delete next[currentLineIndex];
                return next;
            });
        }

        // Optional: If line count drastically changes (paste), might consider clearing all?
        // For now, we only clear the active line to preserve other states as requested.

        setEntryText(newValue);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-2">Mass Entry</h2>
            <p className="text-gray-600 mb-8">Paste your card list below to quickly add multiple items.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <label htmlFor="mass-entry-input" className="block text-sm font-medium text-gray-700 mb-2">
                            Input Card List
                        </label>

                        <MassEntryInput
                            value={entryText}
                            onChange={handleChange}
                            lineErrors={lineErrors}
                            placeholder={"1 Black Lotus Alpha NM\n4 Lightning Bolt M10 LP\n1 Sol Ring Commander 2019 MP"}
                        />

                        <div className="mt-4 flex justify-end">
                            <MassEntrySubmitButton
                                entryText={entryText}
                                onProcess={handleProcess}
                            />
                        </div>
                    </div>
                </div>

                {/* Instructions Section */}
                <div className="lg:col-span-1">
                    <div className="bg-blue-50 rounded-lg border border-blue-100 p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                            <span>ℹ️</span> Formatting Guide
                        </h3>
                        <div className="space-y-4 text-sm text-blue-800">
                            <p>
                                Please ensure each line follows this specific format:
                            </p>
                            <div className="bg-white/50 p-3 rounded font-mono text-xs border border-blue-100">
                                [Quantity] [Card Name] [Set] [Condition]
                            </div>

                            <div>
                                <h4 className="font-semibold mb-1">Example:</h4>
                                <ul className="list-disc list-inside space-y-1 font-mono text-xs opacity-90">
                                    <li>4 Birds of Paradise M12 NM</li>
                                    <li>1 Sol Ring C19 LP</li>
                                    <li>2 Giant Growth LEA MP</li>
                                </ul>
                            </div>

                            <div className="border-t border-blue-200 pt-4 mt-4">
                                <h4 className="font-semibold mb-2">Supported Conditions:</h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <span className="font-medium">NM</span> - Near Mint
                                    <span className="font-medium">LP</span> - Lightly Played
                                    <span className="font-medium">MP</span> - Moderately Played
                                    <span className="font-medium">HP</span> - Heavily Played
                                    <span className="font-medium">DMG</span> - Damaged
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MassEntry;
