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
		element: <TranslatedArticles />,
	},

	{
		path: "/articles/:docId",
		element: <ArticlePreview />,
		loader: getArticleDetails,
	},

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
