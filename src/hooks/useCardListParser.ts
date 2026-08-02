export interface ParsedCard {
    qty: number;
    name: string;
    set?: string;
    condition?: string;
    isValid: boolean;
    isEmpty?: boolean;
    originalLine: string;
}

export const useCardListParser = () => {
    const parseLine = (line: string): ParsedCard => {
        const trimmed = line.trim();
        if (!trimmed) {
            return {
                qty: 0,
                name: '',
                isValid: false,
                isEmpty: true,
                originalLine: line
            };
        }

        let remaining = trimmed;

        // 1. Extract Quantity from the beginning of the line
        // Matches a starting number, optionally followed by 'x' or 'X', followed by one or more spaces
        let qty = 1;
        const qtyRegex = /^(\d+)(?:\s*[xX])?\s+/;
        const qtyMatch = remaining.match(qtyRegex);
        if (qtyMatch) {
            qty = parseInt(qtyMatch[1], 10);
            remaining = remaining.substring(qtyMatch[0].length).trim();
        }

        // 2. Extract Condition from the end of the line (e.g. NM, LP, MP, HP, DMG)
        // Must be preceded by space, and at the very end
        let condition: string | undefined = undefined;
        const conditionRegex = /\s+(NM|LP|MP|HP|DMG)$/i;
        const conditionMatch = remaining.match(conditionRegex);
        if (conditionMatch) {
            condition = conditionMatch[1].toUpperCase();
            remaining = remaining.substring(0, conditionMatch.index).trim();
        }

        // 3. Extract Set from the end of the remaining string
        let set: string | undefined = undefined;

        // Check for enclosed set code first (e.g. [M12], (LEA), {C19})
        const enclosedSetRegex = /\s+[\(\[\{]([a-zA-Z0-9\s\-]+)[\)\]\}]$/;
        const enclosedSetMatch = remaining.match(enclosedSetRegex);

        if (enclosedSetMatch) {
            set = enclosedSetMatch[1].trim();
            remaining = remaining.substring(0, enclosedSetMatch.index).trim();
        } else {
            // Not enclosed, look for a set code heuristic at the end of remaining
            const words = remaining.split(/\s+/);
            if (words.length > 1) {
                const lastWord = words[words.length - 1];

                // Heuristic: Set codes are alphanumeric and either:
                // - Contain both letters and digits (e.g., M12, C19)
                // - OR are 3-4 uppercase characters/digits (e.g., LEA, FEM, WAR, 10E)
                const hasLettersAndDigits = /[a-zA-Z]/.test(lastWord) && /\d/.test(lastWord);
                const isAllCapsSetCode = /^[A-Z0-9]{3,4}$/.test(lastWord);

                if (hasLettersAndDigits || isAllCapsSetCode) {
                    set = lastWord;
                    remaining = words.slice(0, words.length - 1).join(' ').trim();
                }
            }
        }

        // 4. Card Name is the remainder of the line
        const name = remaining;

        // Validation & Edge Case Handling:
        // - Name must not be empty.
        // - Name must not consist only of digits (which would mean a quantity was entered without a name).
        // - Name must not be just a condition code (which would mean a condition was entered without a name).
        const isConditionCode = /^(NM|LP|MP|HP|DMG)$/i.test(name);
        const isOnlyDigits = /^\d+$/.test(name);
        const isValid = name.length > 0 && !isConditionCode && !isOnlyDigits;

        return {
            qty,
            name,
            set,
            condition,
            isValid,
            originalLine: line
        };
    };

    const parseList = (text: string): ParsedCard[] => {
        const parsedCards = text.split('\n').map(parseLine);
        return parsedCards;
    };

    return { parseList };
};
