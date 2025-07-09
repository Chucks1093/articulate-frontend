import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import lingoCompiler from "lingo.dev/compiler";
import path from "path";

const viteConfig = {
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
};

export default defineConfig(({ command, mode }) => {
	// Only use lingo compiler in production builds
	const isProduction = command === "build" || mode === "production";

	if (isProduction) {
		console.log("🌍 Lingo compiler enabled for production build");
		return lingoCompiler.vite({
			sourceRoot: "src",
			sourceLocale: "en",
			targetLocales: ["en", "es", "fr", "de"],
			models: {
				"*:*": "groq:mistral-saba-24b",
			},
		})(viteConfig);
	}

	console.log("🚀 Development mode - Lingo compiler disabled");
	return viteConfig;
});
