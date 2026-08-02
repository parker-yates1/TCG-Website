import React from 'react';
import { useCardListParser, ParsedCard } from '../hooks/useCardListParser';
import { useNotification } from '../context/NotificationContext';

interface MassEntrySubmitButtonProps {
    entryText: string;
    onProcess?: (cards: ParsedCard[]) => void;
}

const MassEntrySubmitButton: React.FC<MassEntrySubmitButtonProps> = ({ entryText, onProcess }) => {
    const { parseList } = useCardListParser();
    const { showNotification } = useNotification();

    const handleClick = () => {
        if (!entryText.trim()) return;

        const results = parseList(entryText);
        const validCount = results.filter(c => c.isValid).length;

        console.log('Parsed items:', results);

        if (validCount === 0 && results.length > 0) {
            showNotification('No valid lines found. Please check the format.', 'error');
        } else {
            showNotification(`Processed ${validCount} cards. Check console for details.`);
            if (onProcess) {
                onProcess(results);
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={!entryText.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer"
        >
            Process List
        </button>
    );
};

export default MassEntrySubmitButton;
