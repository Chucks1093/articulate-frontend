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
		element: (
			<AutumnProvider backendUrl={env.API_BASE_URL}>
				<Pricing />
			</AutumnProvider>
		),
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

	// {
	// 	path: "/articles/:docId",
	// 	element: <ArticlePreview />,
	// 	loader: getArticleDetails,
	// },

	{
		path: "/auth/callback",
		element: <AuthCallback />,
	},
]);

export default function App() {
	return (
		<>
			<Toaster />
			<RouterProvider router={router} />
		</>
	);
}
