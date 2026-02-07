export interface ParsedCard {
    qty: number;
    name: string;
    set?: string;
    condition: string;
    isValid: boolean;
    isEmpty?: boolean;
    originalLine: string;
}

export const useCardListParser = () => {
    const parseLine = (line: string): ParsedCard => {
        const trimmed = line.trim();
        if (!trimmed) {
            return { qty: 0, name: '', condition: '', isValid: false, isEmpty: true, originalLine: line };
        }

        // Regex to match: [Qty] [Name...Set...] [Condition]
        // Condition matches NM, LP, MP, HP, DMG (case insensitive)
        const conditionRegex = /\s(NM|LP|MP|HP|DMG)$/i;
        const conditionMatch = trimmed.match(conditionRegex);

        if (!conditionMatch) {
            return { qty: 0, name: trimmed, condition: '', isValid: false, originalLine: line };
        }

        const condition = conditionMatch[1].toUpperCase();
        const withoutCondition = trimmed.substring(0, conditionMatch.index).trim();

        // Parse Quantity from start
        const qtyMatch = withoutCondition.match(/^(\d+)\s/);
        let qty = 1;
        let nameAndSet = withoutCondition;

        if (qtyMatch) {
            qty = parseInt(qtyMatch[1], 10);
            nameAndSet = withoutCondition.substring(qtyMatch[0].length).trim();
        }

        // Attempt to extract Set from the end of nameAndSet
        // Heuristic: The last word is the set code/name?
        // This is ambiguous for sets like "Commander 2019".
        // For now, we will split by the last space to get a "Set" candidate, 
        // but this is a naive implementation as requested by the open-ended task.
        const lastSpaceIndex = nameAndSet.lastIndexOf(' ');
        let name = nameAndSet;
        let set = '';

        if (lastSpaceIndex !== -1) {
            set = nameAndSet.substring(lastSpaceIndex + 1);
            name = nameAndSet.substring(0, lastSpaceIndex);
        } else {
            // No space found, so either just name or just set?
            // assume it's just name if no set is clearly present? 
            // Or maybe the whole thing is name?
            // If the user follows [Name] [Set], there should be a space.
        }

        return {
            qty,
            name,
            set,
            condition,
            isValid: true,
            originalLine: line
        };
    };

    const parseList = (text: string): ParsedCard[] => {
        const parsedCards = text.split('\n')
            .map(parseLine);
        return parsedCards;
    };

    return { parseList };
};
