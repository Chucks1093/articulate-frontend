import showToast from "@/utils/toast.utils";

export const COUNTRY_TO_LOCALE: Record<string, string> = {
	US: "en",
	GB: "en",
	CA: "en",
	AU: "en",
	ES: "es",
	MX: "es",
	AR: "es",
	CO: "es",
	FR: "fr",
	BE: "fr",
	CH: "fr",
	DE: "de",
	AT: "de",
	// Add more mappings as needed
};

export async function getLocaleFromIP(): Promise<string> {
	try {
		const response = await fetch("https://ipapi.co/json/");
		const data = await response.json();
		return COUNTRY_TO_LOCALE[data.country_code] || "en";
	} catch {
		showToast.error("Erro getting lang");
		return "en";
	}
}
