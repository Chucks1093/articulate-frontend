import { authService } from "@/services/auth.service";
import { LayoutPanelTop, LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useProfileStore } from "@/hooks/useProfileStore";

function Header() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

	const NavigationLinks = ({ mobile = false, onLinkClick = () => {} }) => (
		<nav
			className={`flex gap-6 text-gray-300 ${mobile ? "flex-col" : "items-center"}`}>
			<Link
				to='/pricing'
				className='hover:text-white transition-colors duration-200 py-2'
				onClick={onLinkClick}>
				Pricing
			</Link>
			<a
				href='https://x.com'
				className='hover:text-white transition-colors duration-200 py-2'
				target='_blank'
				rel='noopener noreferrer'
				onClick={onLinkClick}>
				Twitter
			</a>
			<a
				href='mailto:contact@example.com'
				className='hover:text-white transition-colors duration-200 py-2'
				onClick={onLinkClick}>
				Email
			</a>
		</nav>
	);

	const AuthButton = ({ mobile = false, onLinkClick = () => {} }) => {
		if (isLoading) {
			return (
				<Skeleton
					className={`bg-gray-300/20 rounded-3xl ${
						mobile ? "h-12 w-full" : "h-9 lg:h-10 w-[120px] lg:w-[140px]"
					}`}
				/>
			);
		}

		if (isAuthenticated) {
			return (
				<Button
					asChild
					className={`bg-zinc-100 text-zinc-700 font-marlin rounded-3xl shadow-lg font-medium transition-all hover:shadow-xl hover:bg-white ${
						mobile
							? "w-full h-12"
							: "px-4 lg:px-5 py-2 lg:py-2.5 text-sm lg:text-base"
					}`}>
					<Link
						to='/articles'
						onClick={onLinkClick}>
						<LayoutPanelTop
							className={mobile ? "w-5 mr-2" : "w-7 mr-1"}
						/>
						Articles
					</Link>
				</Button>
			);
		}

		return (
			<Button
				asChild
				className={`bg-zinc-100 text-zinc-700 font-marlin rounded-3xl shadow-lg font-medium transition-all hover:shadow-xl hover:bg-white ${
					mobile
						? "w-full h-12"
						: "px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base"
				}`}>
				<Link
					to='/auth'
					onClick={onLinkClick}>
					Sign In
					<LogOut className={mobile ? "w-5 ml-2" : "w-4 lg:w-5 ml-2"} />
				</Link>
			</Button>
		);
	};

	return (
		<header className='absolute flex items-center justify-between w-[95%] sm:w-[90%] mx-auto max-w-5xl top-[2vh] md:top-[4vh] left-1/2 -translate-x-1/2 px-3 sm:px-4 md:px-3 z-20 bg-zinc-800 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] shadow-apple-xl py-2.5 sm:py-3'>
			{/* Logo */}
			<Link
				to='/'
				className='flex items-center gap-2 sm:gap-3 relative z-30'>
				<div className='p-1.5 sm:p-2 bg-app-primary rounded-full'>
					<img
						src='/icons/logo.svg'
						alt='Articulate Logo'
						className='h-3 sm:h-4 md:h-5 lg:h-6'
					/>
				</div>
				<p className='text-app-primary font-grotesk font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl'>
					Articulate
				</p>
			</Link>

			{/* Desktop Navigation */}
			<div className='hidden md:flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm lg:text-base'>
				<NavigationLinks />
			</div>

			{/* Desktop Auth Button */}
			<div className='hidden md:block'>
				<AuthButton />
			</div>

			{/* Mobile Menu */}
			<Sheet
				open={mobileMenuOpen}
				onOpenChange={setMobileMenuOpen}>
				<SheetTrigger asChild>
					<Button
						variant='ghost'
						size='icon'
						className='md:hidden text-gray-300 hover:text-white hover:bg-zinc-700'
						aria-label='Toggle mobile menu'>
						<Menu className='w-5 h-5' />
					</Button>
				</SheetTrigger>
				<SheetContent
					side='top'
					className='bg-zinc-800 border-zinc-700 rounded-b-2xl'>
					<div className='flex flex-col gap-6 pt-6'>
						<NavigationLinks
							mobile
							onLinkClick={() => setMobileMenuOpen(false)}
						/>
						<div className='pt-4 border-t border-zinc-700'>
							<AuthButton
								mobile
								onLinkClick={() => setMobileMenuOpen(false)}
							/>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</header>
	);
}

export default Header;
