import { useState, useEffect } from "react";
import { COUNTRY_TO_LOCALE } from "@/scripts/locator.script";
export function useLocationBasedLocale(fallbackLocale: string = "en") {
	const [detectedLocale, setDetectedLocale] = useState<string>(fallbackLocale);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function detectLocale() {
			try {
				// Method 1: Try IP-based geolocation (free service)
				const response = await fetch("https://ipapi.co/json/");
				const data = await response.json();

				if (data.country_code) {
					const locale =
						COUNTRY_TO_LOCALE[data.country_code] || fallbackLocale;
					setDetectedLocale(locale);
					setIsLoading(false);
					return;
				}
			} catch (error) {
				console.log("IP-based detection failed:", error);
			}

			try {
				// Method 2: Browser geolocation (requires user permission)
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						async (position) => {
							try {
								// Use reverse geocoding to get country
								const { latitude, longitude } = position.coords;
								const geoResponse = await fetch(
									`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
								);
								const geoData = await geoResponse.json();

								if (geoData.countryCode) {
									const locale =
										COUNTRY_TO_LOCALE[geoData.countryCode] ||
										fallbackLocale;
									setDetectedLocale(locale);
								}
							} catch (error) {
								console.log("Reverse geocoding failed:", error);
								setDetectedLocale(fallbackLocale);
							}
							setIsLoading(false);
						},
						(error) => {
							console.log("Geolocation failed:", error);
							setDetectedLocale(fallbackLocale);
							setIsLoading(false);
						}
					);
				} else {
					setDetectedLocale(fallbackLocale);
					setIsLoading(false);
				}
			} catch (error) {
				console.log("Geolocation detection failed:", error);
				setDetectedLocale(fallbackLocale);
				setIsLoading(false);
			}
		}

		// Check if we have a saved preference first
		const savedLocale = localStorage.getItem("preferred-locale");
		if (savedLocale) {
			setDetectedLocale(savedLocale);
			setIsLoading(false);
			return;
		}

		// Check browser language as secondary fallback
		const browserLocale = navigator.language.split("-")[0];
		const supportedLocales = ["en", "es", "fr", "de"];

		if (supportedLocales.includes(browserLocale)) {
			setDetectedLocale(browserLocale);
			setIsLoading(false);
			return;
		}

		// Fall back to location detection
		detectLocale();
	}, [fallbackLocale]);

	return { detectedLocale, isLoading };
}
