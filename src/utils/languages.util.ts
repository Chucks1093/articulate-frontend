// Official Lingo.dev supported languages (verified from CLI output)
// Generated from: npx lingo.dev@latest show locale targets
const lingoSupportedLanguages = [
	// Major languages (basic codes)
	{ code: "en", name: "English", flag: "gb" },
	{ code: "es", name: "Spanish", flag: "es" },
	{ code: "fr", name: "French", flag: "fr" },
	{ code: "de", name: "German", flag: "de" },
	{ code: "it", name: "Italian", flag: "it" },
	{ code: "pt", name: "Portuguese", flag: "pt" },
	{ code: "ru", name: "Russian", flag: "ru" },
	{ code: "zh", name: "Chinese", flag: "cn" },
	{ code: "ja", name: "Japanese", flag: "jp" },
	{ code: "ko", name: "Korean", flag: "kr" },
	{ code: "ar", name: "Arabic", flag: "sa" },
	{ code: "hi", name: "Hindi", flag: "in" },
	{ code: "nl", name: "Dutch", flag: "nl" },
	{ code: "pl", name: "Polish", flag: "pl" },
	{ code: "tr", name: "Turkish", flag: "tr" },
	{ code: "sv", name: "Swedish", flag: "se" },
	{ code: "da", name: "Danish", flag: "dk" },
	{ code: "no", name: "Norwegian", flag: "no" },
	{ code: "fi", name: "Finnish", flag: "fi" },
	{ code: "cs", name: "Czech", flag: "cz" },
	{ code: "hu", name: "Hungarian", flag: "hu" },
	{ code: "bg", name: "Bulgarian", flag: "bg" },
	{ code: "ro", name: "Romanian", flag: "ro" },
	{ code: "sk", name: "Slovak", flag: "sk" },
	{ code: "hr", name: "Croatian", flag: "hr" },
	{ code: "sr", name: "Serbian", flag: "rs" },
	{ code: "sl", name: "Slovenian", flag: "si" },
	{ code: "et", name: "Estonian", flag: "ee" },
	{ code: "lv", name: "Latvian", flag: "lv" },
	{ code: "lt", name: "Lithuanian", flag: "lt" },
	{ code: "el", name: "Greek", flag: "gr" },
	{ code: "he", name: "Hebrew", flag: "il" },
	{ code: "uk", name: "Ukrainian", flag: "ua" },
	{ code: "be", name: "Belarusian", flag: "by" },
	{ code: "vi", name: "Vietnamese", flag: "vn" },
	{ code: "th", name: "Thai", flag: "th" },
	{ code: "id", name: "Indonesian", flag: "id" },
	{ code: "ms", name: "Malay", flag: "my" },
	{ code: "fil", name: "Filipino", flag: "ph" },
	{ code: "tl", name: "Tagalog", flag: "ph" },
	{ code: "bn", name: "Bengali", flag: "bd" },
	{ code: "ur", name: "Urdu", flag: "pk" },
	{ code: "ta", name: "Tamil", flag: "in" },
	{ code: "te", name: "Telugu", flag: "in" },
	{ code: "pa", name: "Punjabi", flag: "in" },
	{ code: "fa", name: "Persian", flag: "ir" },
	{ code: "sw", name: "Swahili", flag: "ke" },
	{ code: "af", name: "Afrikaans", flag: "za" },
	{ code: "sq", name: "Albanian", flag: "al" },
	{ code: "az", name: "Azerbaijani", flag: "az" },
	{ code: "eu", name: "Basque", flag: "es" },
	{ code: "ca", name: "Catalan", flag: "es" },
	{ code: "cy", name: "Welsh", flag: "gb" },
	{ code: "ga", name: "Irish", flag: "ie" },
	{ code: "gl", name: "Galician", flag: "es" },
	{ code: "is", name: "Icelandic", flag: "is" },
	{ code: "ka", name: "Georgian", flag: "ge" },
	{ code: "kk", name: "Kazakh", flag: "kz" },
	{ code: "km", name: "Khmer", flag: "kh" },
	{ code: "mt", name: "Maltese", flag: "mt" },
	{ code: "rw", name: "Kinyarwanda", flag: "rw" },
	{ code: "so", name: "Somali", flag: "so" },
	{ code: "ti", name: "Tigrinya", flag: "et" },
	{ code: "uz", name: "Uzbek", flag: "uz" },
	{ code: "zgh", name: "Tamazight", flag: "ma" },

	// Regional variants - English
	{ code: "en-US", name: "English (US)", flag: "us" },
	{ code: "en-AU", name: "English (Australia)", flag: "au" },
	{ code: "en-CA", name: "English (Canada)", flag: "ca" },
	{ code: "en-SG", name: "English (Singapore)", flag: "sg" },

	// Regional variants - Spanish
	{ code: "es-419", name: "Spanish (Latin America)", flag: "mx" },
	{ code: "es-MX", name: "Spanish (Mexico)", flag: "mx" },
	{ code: "es-AR", name: "Spanish (Argentina)", flag: "ar" },

	// Regional variants - French
	{ code: "fr-CA", name: "French (Canada)", flag: "ca" },
	{ code: "fr-BE", name: "French (Belgium)", flag: "be" },

	// Regional variants - German
	{ code: "de-AT", name: "German (Austria)", flag: "at" },
	{ code: "de-CH", name: "German (Switzerland)", flag: "ch" },

	// Regional variants - Portuguese
	{ code: "pt-BR", name: "Portuguese (Brazil)", flag: "br" },

	// Regional variants - Italian
	{ code: "it-CH", name: "Italian (Switzerland)", flag: "ch" },

	// Regional variants - Chinese
	{ code: "zh-TW", name: "Chinese (Traditional)", flag: "tw" },
	{ code: "zh-HK", name: "Chinese (Hong Kong)", flag: "hk" },
	{ code: "zh-SG", name: "Chinese (Singapore)", flag: "sg" },

	// Regional variants - Arabic
	{ code: "ar-EG", name: "Arabic (Egypt)", flag: "eg" },
	{ code: "ar-SA", name: "Arabic (Saudi Arabia)", flag: "sa" },
	{ code: "ar-AE", name: "Arabic (UAE)", flag: "ae" },
	{ code: "ar-MA", name: "Arabic (Morocco)", flag: "ma" },

	// Regional variants - Other major languages
	{ code: "ru-RU", name: "Russian (Russia)", flag: "ru" },
	{ code: "ru-BY", name: "Russian (Belarus)", flag: "by" },
	{ code: "bn-BD", name: "Bengali (Bangladesh)", flag: "bd" },
	{ code: "bn-IN", name: "Bengali (India)", flag: "in" },
	{ code: "ur-PK", name: "Urdu (Pakistan)", flag: "pk" },
	{ code: "ta-IN", name: "Tamil (India)", flag: "in" },
	{ code: "ta-SG", name: "Tamil (Singapore)", flag: "sg" },
	{ code: "te-IN", name: "Telugu (India)", flag: "in" },
	{ code: "pa-IN", name: "Punjabi (India)", flag: "in" },
	{ code: "pa-PK", name: "Punjabi (Pakistan)", flag: "pk" },

	// Regional variants - European languages
	{ code: "nl-NL", name: "Dutch (Netherlands)", flag: "nl" },
	{ code: "nl-BE", name: "Dutch (Belgium)", flag: "be" },
	{ code: "sv-SE", name: "Swedish (Sweden)", flag: "se" },
	{ code: "da-DK", name: "Danish (Denmark)", flag: "dk" },
	{ code: "no-NO", name: "Norwegian (Norway)", flag: "no" },
	{ code: "nb-NO", name: "Norwegian Bokmål", flag: "no" },
	{ code: "nn-NO", name: "Norwegian Nynorsk", flag: "no" },
	{ code: "fi-FI", name: "Finnish (Finland)", flag: "fi" },
	{ code: "pl-PL", name: "Polish (Poland)", flag: "pl" },

	// Regional variants - African languages
	{ code: "sw-TZ", name: "Swahili (Tanzania)", flag: "tz" },
	{ code: "sw-KE", name: "Swahili (Kenya)", flag: "ke" },
	{ code: "sw-UG", name: "Swahili (Uganda)", flag: "ug" },
	{ code: "sw-CD", name: "Swahili (DR Congo)", flag: "cd" },
	{ code: "sw-RW", name: "Swahili (Rwanda)", flag: "rw" },
	{ code: "af-ZA", name: "Afrikaans (South Africa)", flag: "za" },
	{ code: "so-SO", name: "Somali (Somalia)", flag: "so" },
	{ code: "ti-ET", name: "Tigrinya (Ethiopia)", flag: "et" },
	{ code: "rw-RW", name: "Kinyarwanda (Rwanda)", flag: "rw" },

	// Regional variants - Middle Eastern
	{ code: "he-IL", name: "Hebrew (Israel)", flag: "il" },
	{ code: "fa-IR", name: "Persian (Iran)", flag: "ir" },
	{ code: "az-AZ", name: "Azerbaijani (Azerbaijan)", flag: "az" },
	{ code: "ka-GE", name: "Georgian (Georgia)", flag: "ge" },
	{ code: "kk-KZ", name: "Kazakh (Kazakhstan)", flag: "kz" },
	{ code: "uz-Latn", name: "Uzbek (Latin)", flag: "uz" },

	// Script variants - Serbian
	{ code: "sr-Latn-RS", name: "Serbian (Latin, Serbia)", flag: "rs" },
	{ code: "sr-Cyrl-RS", name: "Serbian (Cyrillic, Serbia)", flag: "rs" },

	// Regional variants - Chinese (detailed)
	{ code: "zh-Hant-HK", name: "Chinese (Traditional, Hong Kong)", flag: "hk" },
	{ code: "zh-Hant-TW", name: "Chinese (Traditional, Taiwan)", flag: "tw" },
	{ code: "zh-Hans-CN", name: "Chinese (Simplified, China)", flag: "cn" },
	{ code: "zh-Hans-SG", name: "Chinese (Simplified, Singapore)", flag: "sg" },
];

export default lingoSupportedLanguages;
