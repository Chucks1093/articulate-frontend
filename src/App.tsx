import { createBrowserRouter, RouterProvider } from "react-router";
import "@/styles/app.css";
import Home from "./pages/Home";
import AuthDialog from "./pages/AuthDialog";
import AuthCallback from "./pages/AuthCallback";
import { Toaster } from "react-hot-toast";

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
