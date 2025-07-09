import { useProfileStore } from "@/hooks/useProfileStore";
import Header from "./Header";
import { Outlet, useLoaderData, useLocation } from "react-router";
import { useEffect } from "react";
import Footer from "./Footer";

function ArticleOverviewLayout() {
	const loaderData = useLoaderData();
	const { profile, setProfile } = useProfileStore();
	const location = useLocation();

	// Determine the title based on the current route
	const getHeaderTitle = () => {
		if (location.pathname === "/articles") {
			return "Translated Articles";
		}
		if (location.pathname.startsWith("/articles/")) {
			return "Article Preview";
		}
		return "Articulate";
	};

	useEffect(() => {
		if (loaderData.user) {
			setProfile(loaderData.user);
		}
	}, [loaderData.user, setProfile]);

	return (
		profile && (
			<>
				<Header
					title={getHeaderTitle()}
					className='max-w-5xl'
				/>
				<Outlet />
				<Footer />
			</>
		)
	);
}

export default ArticleOverviewLayout;
