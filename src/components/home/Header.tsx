import { authService } from "@/services/auth.service";
import { LayoutPanelTop, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfileStore } from "@/hooks/useProfileStore";

function Header() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { setProfile } = useProfileStore();

	useEffect(() => {
		const checkIsAuthenticated = async () => {
			setIsLoading(true);
			try {
				const profile = await authService.getCurrentUser();
				if (profile) {
					setIsAuthenticated(profile.authenticated);
					setProfile(profile);
				}
			} catch (error) {
				console.error("Authentication check failed:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkIsAuthenticated();
	}, []);

	return (
		<header className='absolute flex items-center justify-between w-[90%] mx-auto max-w-5xl top-[2vh] md:top-[3vh] left-1/2 -translate-x-1/2 md:px-4   z-20 bg-zinc-800  rounded-[3rem]  shadow-apple-xl py-3 px-3'>
			<Link
				to='/'
				className='flex items-center gap-2 relative'>
				<div className='p-2 bg-app-primary  rounded-full'>
					<img
						src='/icons/logo.svg'
						alt='Articulate Logo'
						className='h-[.9rem] md:h-[1.4rem]  '
					/>
				</div>

				<p className='text-app-primary font-grotesk font-medium  text-xl md:text-3xl'>
					Articulate
				</p>
			</Link>
			<div className='md:flex items-center justify-center gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-md text-gray-300 hidden'>
				<Link
					to='/pricing'
					className=''>
					Pricing
				</Link>

				<a href='https://x.com'>Twitter</a>
				<a href=''>Email</a>
			</div>
			<div>
				{isLoading ? (
					<Skeleton className='h-10 w-[120px] md:w-[140px]  bg-gray-300/20 rounded-3xl' />
				) : isAuthenticated ? (
					<Link
						to='/articles'
						className='bg-zinc-100 text-zinc-700 font-marlin rounded-3xl px-3 py-2 md:px-5 md:py-2 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base font-medium transition-all hover:shadow-xl'>
						<LayoutPanelTop className='w-5' />
						<span className='inline'>Articles</span>
					</Link>
				) : (
					<Link
						to='/auth'
						className='bg-zinc-100 text-zinc-700 font-marlin rounded-3xl px-3 py-2 md:px-6 md:py-2 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base font-medium transition-all hover:shadow-xl'>
						<span className='inline'>Sign In</span>
						<LogOut className='w-5' />
					</Link>
				)}
			</div>
		</header>
	);
}

export default Header;
