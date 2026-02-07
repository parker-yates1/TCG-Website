import React, { useRef, useEffect } from 'react';

interface MassEntryInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    // Map of line index to error message
    lineErrors: Record<number, string>;
    placeholder?: string;
    className?: string;
}

const MassEntryInput: React.FC<MassEntryInputProps> = ({
    value,
    onChange,
    lineErrors,
    placeholder,
    className = ''
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    // Sync scroll
    const handleScroll = () => {
        if (textareaRef.current && backdropRef.current) {
            backdropRef.current.scrollTop = textareaRef.current.scrollTop;
            backdropRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };

    // Shared styles to ensure perfect alignment
    // Force overflow-y: scroll to ensure scrollbar width is always accounted for in text wrapping.
    const sharedStyles = "font-mono text-sm leading-relaxed px-4 py-3 w-full border overflow-y-scroll";

    // Split value into lines for the backdrop
    // We append a space to empty lines so they render with height
    const lines = value.split('\n');

    return (
        <div className={`relative group ${className}`}>
            {/* Backdrop for highlights */}
            <div
                ref={backdropRef}
                className={`absolute inset-0 whitespace-pre-wrap break-words rounded-lg bg-white pointer-events-none border-transparent ${sharedStyles}`}
                aria-hidden="true"
                style={{
                    // Text color transparent so we don't see double text
                    color: 'transparent',
                    // We allow the scrollbar to exist so layout matches, but it's behind the textarea
                    borderColor: 'transparent' // Let textarea handle the visible border
                }}
            >
                {lines.map((line, i) => {
                    const hasError = !!lineErrors[i];
                    return (
                        <div
                            key={i}
                            className={`relative w-full ${hasError ? 'bg-red-100/70' : ''}`}
                        >
                            {/* Render text to ensure height matching. 
                                Use non-breaking space for empty lines to maintain line height. 
                            */}
                            {line || '\u00A0'}

                            {/* Optional: Error Marker/Tooltip */}
                            {hasError && (
                                <span className="absolute right-0 top-0 bottom-0 flex items-center pr-2">
                                    {/* Could add an icon here, but might overlap text. 
                                         Just background is safer for now. 
                                     */}
                                </span>
                            )}
                        </div>
                    );
                })}

                {/* 
                   Extra padding at bottom to match textarea behavior if needed. 
                   Textarea usually has some scroll buffer.
                */}
                <div className="h-8"></div>
            </div>

            {/* Actual Input */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                onScroll={handleScroll}
                placeholder={placeholder}
                rows={15}
                className={`relative z-10 bg-transparent text-gray-900 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg border border-gray-300 outline-none whitespace-pre-wrap break-words ${sharedStyles}`}
                spellCheck={false}
            />
        </div>
    );
};

export default MassEntryInput;
