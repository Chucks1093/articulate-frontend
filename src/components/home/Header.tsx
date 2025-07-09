import { authService } from "@/services/auth.service";
import {
	LayoutPanelTop,
	LogOut,
	Menu,
	ChevronDown,
	Crown,
	Twitter,
	Mail as MailIcon,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfileStore } from "@/hooks/useProfileStore";
import { cn } from "@/lib/utils";

type HeaderProps = {
	className?: string;
	children?: ReactNode;
};

function Header(props: HeaderProps) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { profile, clearProfile, setProfile } = useProfileStore();
	const navigate = useNavigate();
	const [userPlan, setUserPlan] = useState<"free" | "enterprise" | "pro">(
		"free"
	);

	useEffect(() => {
		const checkIsAuthenticated = async () => {
			setIsLoading(true);
			try {
				const userProfile = await authService.getCurrentUser();
				if (userProfile) {
					setIsAuthenticated(userProfile.authenticated);
					setProfile(userProfile);
					setUserPlan("enterprise");
				}
			} catch (error) {
				console.error("Authentication check failed:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkIsAuthenticated();
	}, [setProfile]);

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.substring(0, 2);
	};

	const handleLogout = async () => {
		try {
			await authService.signOut();
			setIsAuthenticated(false);
			clearProfile();
			navigate("/");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

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

		if (isAuthenticated && profile) {
			// Desktop dropdown
			if (!mobile) {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								className='relative flex items-center gap-2 bg-zinc-700 border border-zinc-600 rounded-full hover:bg-zinc-600 transition-all duration-200 p-1'>
								<div className='relative'>
									<Avatar className='w-9 h-9'>
										<AvatarImage
											src={profile.avatar}
											alt={profile.username}
										/>
										<AvatarFallback className='bg-app-primary text-white text-sm font-grotesk font-semibold'>
											{getInitials(profile.username)}
										</AvatarFallback>
									</Avatar>
									{/* Plan badge overlay */}
									{userPlan &&
										(userPlan === "pro" ||
											userPlan === "enterprise") && (
											<div className='absolute -top-3 -right-3 w-5 h-5 bg-app-primary rounded-full flex items-center justify-center border-2 border-zinc-800 p-3'>
												<Crown className='w-full h-full text-zinc-800' />
											</div>
										)}
									{userPlan === "free" && (
										<div className='absolute -top-1 -right-1 w-5 h-5 bg-zinc-600 rounded-full flex items-center justify-center border-2 border-zinc-800'>
											<span className='text-xs text-white font-bold'>
												F
											</span>
										</div>
									)}
								</div>
								<ChevronDown className='w-4 h-4 text-zinc-400' />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent
							align='end'
							className='w-72 bg-zinc-800 backdrop-blur-md shadow-xl border border-zinc-700 rounded-xl p-3'>
							{/* User Info Section */}
							<div className='flex flex-col items-center py-4 px-2 bg-zinc-700/50 rounded-lg mb-3'>
								<Avatar className='w-16 h-16 mb-3 ring-2 ring-app-primary shadow-lg'>
									<AvatarImage
										src={profile.avatar}
										alt={profile.username}
									/>
									<AvatarFallback className='bg-app-primary text-white text-lg font-semibold font-grotesk'>
										{getInitials(profile.username)}
									</AvatarFallback>
								</Avatar>
								<div className='text-center'>
									<p className='text-sm font-semibold text-white mb-1 font-grotesk'>
										{profile.username}
									</p>
									<p className='text-xs text-zinc-400 font-grotesk'>
										{profile.email}
									</p>
									{userPlan && (
										<Badge
											className={`mt-2 ${
												userPlan === "pro" ||
												userPlan === "enterprise"
													? "bg-app-primary text-zinc-800"
													: "bg-zinc-600 text-zinc-300"
											}`}>
											{userPlan === "pro" && (
												<Crown className='w-3 h-3 mr-1' />
											)}
											{userPlan.charAt(0).toUpperCase() +
												userPlan.slice(1)}{" "}
											Plan
										</Badge>
									)}
								</div>
							</div>

							<DropdownMenuItem
								className='cursor-pointer flex items-center px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 focus:bg-zinc-700 rounded-lg transition-colors'
								onClick={() => {
									window.open("https://x.com", "_blank");
								}}>
								<Twitter className='mr-3 h-4 w-4' />
								<span className='font-grotesk'>
									Follow us on Twitter
								</span>
							</DropdownMenuItem>

							<DropdownMenuItem
								className='cursor-pointer flex items-center px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 focus:bg-zinc-700 rounded-lg transition-colors'
								asChild>
								<Link to='/articles'>
									<LayoutPanelTop className='mr-3 h-4 w-4' />
									<span className='font-grotesk'>View Articles</span>
								</Link>
							</DropdownMenuItem>

							<DropdownMenuItem
								className='cursor-pointer flex items-center px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 focus:bg-zinc-700 rounded-lg transition-colors'
								onClick={() => {
									window.open("mailto:contact@example.com", "_blank");
								}}>
								<MailIcon className='mr-3 h-4 w-4' />
								<span className='font-grotesk'>Email Us</span>
							</DropdownMenuItem>

							<DropdownMenuSeparator className='my-2 bg-zinc-700' />

							<DropdownMenuItem
								className='cursor-pointer flex items-center px-3 py-2.5 text-sm text-red-400 hover:bg-red-900/20 focus:bg-red-900/20 rounded-lg transition-colors'
								onClick={handleLogout}>
								<LogOut className='mr-3 h-4 w-4' />
								<span className='font-grotesk'>Sign Out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			}

			// Mobile - return empty div since we handle mobile differently
			return <div />;
		}

		// Not authenticated
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

	const MobileUserProfile = () => {
		if (!profile) return null;

		return (
			<div className='flex flex-col items-center py-4 px-2 bg-zinc-700/50 rounded-lg mb-6'>
				<div className='relative mb-3'>
					<Avatar className='w-16 h-16 ring-2 ring-app-primary shadow-lg'>
						<AvatarImage
							src={profile.avatar}
							alt={profile.username}
						/>
						<AvatarFallback className='bg-app-primary text-white text-lg font-semibold font-grotesk'>
							{getInitials(profile.username)}
						</AvatarFallback>
					</Avatar>
					{/* Plan badge overlay */}
					{userPlan &&
						(userPlan === "pro" || userPlan === "enterprise") && (
							<div className='absolute -top-3 -right-3 w-6 h-6 bg-app-primary rounded-full flex items-center justify-center border-2 border-zinc-800'>
								<Crown className='w-4 h-4 text-zinc-800' />
							</div>
						)}
					{userPlan === "free" && (
						<div className='absolute -top-1 -right-1 w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center border-2 border-zinc-800'>
							<span className='text-xs text-white font-bold'>F</span>
						</div>
					)}
				</div>
				<div className='text-center'>
					<p className='text-sm font-semibold text-white mb-1 font-grotesk'>
						{profile.username}
					</p>
					<p className='text-xs text-zinc-400 font-grotesk'>
						{profile.email}
					</p>
					{userPlan && (
						<Badge
							className={`mt-2 ${
								userPlan === "pro" || userPlan === "enterprise"
									? "bg-app-primary text-zinc-800"
									: "bg-zinc-600 text-zinc-300"
							}`}>
							{userPlan === "pro" && <Crown className='w-3 h-3 mr-1' />}
							{userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan
						</Badge>
					)}
				</div>
			</div>
		);
	};

	return (
		<header
			className={cn(
				"absolute flex items-center justify-between w-[95%] sm:w-[90%] mx-auto max-w-4xl top-[2vh] md:top-[4vh] left-1/2 -translate-x-1/2 px-3 sm:px-4 md:px-3 z-20 bg-zinc-800 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] shadow-apple-xl py-2.5 sm:py-3",
				props.className
			)}>
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
					<button
						className='md:hidden text-gray-300 hover:text-white hover:bg-zinc-700 p-2 rounded-lg transition-colors'
						aria-label='Toggle mobile menu'>
						<Menu className='w-6 h-6' />
					</button>
				</SheetTrigger>
				<SheetContent
					side='top'
					className='bg-zinc-800 border-zinc-700 rounded-b-2xl'>
					<div className='flex flex-col gap-6 pt-6'>
						{/* Show user profile if authenticated */}
						{isAuthenticated && profile && <MobileUserProfile />}

						{/* Navigation Links */}
						<NavigationLinks
							mobile
							onLinkClick={() => setMobileMenuOpen(false)}
						/>

						{/* Mobile Actions */}
						<div className='pt-4 border-t border-zinc-700 flex flex-col gap-3'>
							{isAuthenticated && profile ? (
								<>
									<Button
										asChild
										className='w-full h-12 bg-zinc-100 text-zinc-700 font-marlin rounded-3xl shadow-lg font-medium transition-all hover:shadow-xl hover:bg-white'>
										<Link
											to='/articles'
											onClick={() => setMobileMenuOpen(false)}>
											<LayoutPanelTop className='w-5 mr-2' />
											View Articles
										</Link>
									</Button>
									<Button
										onClick={() => {
											handleLogout();
											setMobileMenuOpen(false);
										}}
										className='w-full h-12 bg-red-600 text-white font-marlin rounded-3xl shadow-lg font-medium transition-all hover:shadow-xl hover:bg-red-700'>
										<LogOut className='w-5 mr-2' />
										Sign Out
									</Button>
								</>
							) : (
								<AuthButton
									mobile
									onLinkClick={() => setMobileMenuOpen(false)}
								/>
							)}
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</header>
	);
}

export default Header;
