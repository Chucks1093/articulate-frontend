import { createBrowserRouter, RouterProvider } from "react-router";
import "@/styles/app.css";
import Home from "@/components/home/Home";
import AuthDialog from "./pages/AuthDialog";
import AuthCallback from "./pages/AuthCallback";
import { Toaster } from "react-hot-toast";
import TranslatedArticles from "./pages/TranslatedArticles";
import ArticlePreview from "./pages/ArticlePreview";
import Pricing from "./pages/Pricing";
import { AutumnProvider } from "autumn-js/react";
import { getArticleDetails } from "./scripts/article.loader";
import { env } from "./utils/env.utils";
import { requireAuth } from "./scripts/auth.loader";
import ArticleOverviewLayout from "./components/article/ArticleOverviewLayout";
import { LingoProviderWrapper, loadDictionary } from "lingo.dev/react/client";
import { authService } from "./services/auth.service";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				path: "/auth",
				element: <AuthDialog />,
			},
		],
	},
	{
		path: "/pricing",
		element: <Pricing />,
	},

	{
		path: "/articles",
		loader: requireAuth,
		element: <ArticleOverviewLayout />,
		children: [
			{
				index: true,
				element: <TranslatedArticles />,
			},
			{
				path: "/articles/:docId",
				loader: getArticleDetails,
				element: <ArticlePreview />,
			},
		],
	},

	{
		path: "/auth/callback",
		element: <AuthCallback />,
	},
]);

export default function App() {
	const getToken = async () => {
		const session = await authService.getSession();
		return session?.access_token;
	};

	return (
		<LingoProviderWrapper
			loadDictionary={(locale) => loadDictionary(locale)}
		>
			<Toaster />
			<AutumnProvider
				backendUrl={env.API_BASE_URL}
				getBearerToken={getToken}
			>
				<RouterProvider router={router} />
			</AutumnProvider>
		</LingoProviderWrapper>
	);
}
