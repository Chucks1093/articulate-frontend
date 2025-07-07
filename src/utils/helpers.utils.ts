// utils/helpers.ts

/**
 * Get user initials from full name
 */
export const getInitials = (name: string): string => {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
};

/**
 * Format date string to readable format
 */
export const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

/**
 * Get language name from language code
 */
export const getLanguageName = (
	code: string,
	languages: { code: string; name: string }[]
): string => {
	return (
		languages.find((lang) => lang.code === code)?.name || code.toUpperCase()
	);
};
