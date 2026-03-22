// ============================================================
// SingleCardApi.ts — Card Search API Adapter
//
// This is the ONLY file that talks to the local Docker backend.
// To swap in a different backend, update the functions below.
// The hook and UI components depend only on the exported types
// and function signatures, so nothing else needs to change.
// ============================================================

import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/magic/mtgStore';

// ------ Types that mirror the Docker API response ------

export interface StoreInfo {
    storeId: string;
    storeName: string;
    distanceKm: number | null;
    price: number | null;
    quantity: number | null;
    condition: string | null;
    foil: boolean | null;
    storeLocation: {
        latitude: number;
        longitude: number;
        city: string;
        state: string;
        country: string;
    };
}

interface LocalCardResponse {
    id: string;
    name: string;
    rarity: string;
    setName: string;
    imageUri: string;
    stores: StoreInfo[];
}

// ------ Normalised type the rest of the app works with ------

/** A normalised card result that the rest of the app works with.
 *  Keep this interface stable even when swapping the data source. */
export interface CardSearchResult {
    id: string;
    name: string;
    rarity: string;
    setName: string;
    imageUrl: string | null;
    priceUsd: string | null;
    priceUsdFoil: string | null;
    stores: StoreInfo[];
}

function toCardSearchResult(card: LocalCardResponse): CardSearchResult {
    // Pull the cheapest non-foil and foil prices from available stores
    const nonFoilStore = card.stores.find(s => s.price !== null && !s.foil);
    const foilStore = card.stores.find(s => s.price !== null && s.foil);

    return {
        id: card.id,
        name: card.name,
        rarity: card.rarity,
        setName: card.setName,
        imageUrl: card.imageUri ?? null,
        priceUsd: nonFoilStore?.price?.toFixed(2) ?? null,
        priceUsdFoil: foilStore?.price?.toFixed(2) ?? null,
        stores: card.stores,
    };
}

// ------ Public API ------

/**
 * Search for a card by name.
 * Returns an array (the local backend returns a single card object,
 * which we wrap in an array for a consistent interface).
 *
 * @param query - Partial or full card name typed by the user
 * @returns Array of normalised CardSearchResult objects
 */
export async function searchCards(query: string): Promise<CardSearchResult[]> {
    if (!query.trim()) return [];

    try {
        const { data } = await axios.get<LocalCardResponse>(
            `${BASE_URL}/cards/${encodeURIComponent(query.trim())}`
        );
        return [toCardSearchResult(data)];
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
            // Backend returns 404 when no card matches — treat as empty
            return [];
        }
        throw err;
    }
}