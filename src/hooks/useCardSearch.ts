import { useState, useEffect, useRef, useCallback } from 'react';
import { searchCards, CardSearchResult } from '../Api/SingleCardApi';

interface UseCardSearchReturn {
    query: string;
    results: CardSearchResult[];
    isLoading: boolean;
    isOpen: boolean;
    error: string | null;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFocus: () => void;
    handleClose: () => void;
}

const DEBOUNCE_MS = 300;

export function useCardSearch(): UseCardSearchReturn {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CardSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Debounced search — fires 500ms after the user stops typing
    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (!query.trim()) {
            setResults([]);
            setIsLoading(false);
            setError(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        debounceTimer.current = setTimeout(async () => {
            try {
                const data = await searchCards(query);
                setResults(data);
            } catch {
                setError('Something went wrong. Please try again.');
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, DEBOUNCE_MS);

        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [query]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setIsOpen(true);
    }, []);

    const handleFocus = useCallback(() => {
        if (query.trim()) setIsOpen(true);
        else setIsOpen(true); // open overlay even when empty (blank slate)
    }, [query]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setQuery('');
        setResults([]);
        setError(null);
    }, []);

    return {
        query,
        results,
        isLoading,
        isOpen,
        error,
        handleInputChange,
        handleFocus,
        handleClose,
    };
}
