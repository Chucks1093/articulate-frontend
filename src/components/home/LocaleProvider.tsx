import React, { ReactNode } from "react";
import { LingoProviderWrapper, loadDictionary } from "lingo.dev/react/client";
import { useLocationBasedLocale } from "@/hooks/useLocationBasedLocale";

interface LocaleProviderProps {
	children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
	const { isLoading } = useLocationBasedLocale("en");

	// Show loading state while detecting location
	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-zinc-900'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-app-primary'></div>
			</div>
		);
	}

	return (
		<LingoProviderWrapper loadDictionary={(locale) => loadDictionary(locale)}>
			{children}
		</LingoProviderWrapper>
	);
}
