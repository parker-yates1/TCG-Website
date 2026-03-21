// ============================================================
// SingleCardApi.ts — Card Search API Adapter
//
// This is the ONLY file that talks to Scryfall.
// To swap in a custom backend, update the functions below
// to call your own endpoints. The hook and UI components
// depend only on the exported types and function signatures,
// so nothing else needs to change.
// ============================================================

import axios from 'axios';

/** A normalised card result that the rest of the app works with.
 *  Keep this interface stable even when swapping the data source. */
export interface CardSearchResult {
    id: string;
    name: string;
    setName: string;
    imageUrl: string | null;
    priceUsd: string | null;
    priceUsdFoil: string | null;
}

// ------ Scryfall-specific helpers (internal to this file) ------

interface ScryfallCard {
    id: string;
    name: string;
    set_name: string;
    image_uris?: { small: string; normal: string };
    card_faces?: Array<{ image_uris?: { small: string; normal: string } }>;
    prices: { usd: string | null; usd_foil: string | null };
}

function toCardSearchResult(card: ScryfallCard): CardSearchResult {
    // Double-faced cards store images on each face, not the root object
    const imageUrl =
        card.image_uris?.small ??
        card.card_faces?.[0]?.image_uris?.small ??
        null;

    return {
        id: card.id,
        name: card.name,
        setName: card.set_name,
        imageUrl,
        priceUsd: card.prices.usd,
        priceUsdFoil: card.prices.usd_foil,
    };
}

// ------ Public API (swap these out when you move to a custom backend) ------

/**
 * Search for cards by name. Returns up to 8 results.
 * Currently powered by Scryfall's fuzzy name search.
 *
 * @param query - Partial or full card name typed by the user
 * @returns Array of normalised CardSearchResult objects
 */
export async function searchCards(query: string): Promise<CardSearchResult[]> {
    if (!query.trim()) return [];

    try {
        const { data } = await axios.get('https://api.scryfall.com/cards/search', {
            params: { q: query, order: 'name', unique: 'cards' },
        });
        return (data.data as ScryfallCard[]).slice(0, 8).map(toCardSearchResult);
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
            // Scryfall returns 404 when no cards match — treat as empty
            return [];
        }
        throw err;
    }
}