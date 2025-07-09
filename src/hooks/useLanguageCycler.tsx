import { useState, useEffect } from "react";
import lingoSupportedLanguages from "@/utils/languages.util";

interface Language {
	code: string;
	name: string;
	flag: string;
}

interface UseLanguageCyclerReturn {
	currentLanguage: Language;
	currentLanguageIndex: number;
	setCurrentLanguageIndex: (index: number) => void;
}

/**
 * Custom hook for cycling through languages at a specified interval
 * @param languages - Array of language objects to cycle through
 * @param intervalMs - Interval in milliseconds between language changes (default: 400ms)
 * @returns Object containing current language, index, and setter function
 */
export function useLanguageCycler(
	languages = lingoSupportedLanguages,
	intervalMs: number = 2000
): UseLanguageCyclerReturn {
	const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

	// Cycle through languages at specified interval
	useEffect(() => {
		if (languages.length === 0) return;

		const interval = setInterval(() => {
			setCurrentLanguageIndex(
				(prevIndex) => (prevIndex + 1) % languages.length
			);
		}, intervalMs);

		return () => clearInterval(interval);
	}, [languages.length, intervalMs]);

	const currentLanguage = languages[currentLanguageIndex] || languages[0];

	return {
		currentLanguage,
		currentLanguageIndex,
		setCurrentLanguageIndex,
	};
}
