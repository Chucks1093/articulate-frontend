import { authService } from "@/services/auth.service";
import { LogOut, ChevronDown, Crown, Twitter, MailIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useProfileStore } from "@/hooks/useProfileStore";
import { cn } from "@/lib/utils";

type HeaderProps = {
	className?: string;
	children?: ReactNode;
};

function Header(props: HeaderProps) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { profile, setProfile, clearProfile } = useProfileStore();
	const [userPlan, setUserPlan] = useState<"free" | "pro" | "enterprise">(
		"enterprise"
	);

	useEffect(() => {
		const checkIsAuthenticated = async () => {
			setIsLoading(true);
			try {
				const userProfile = await authService.getCurrentUser();
				if (userProfile) {
					setIsAuthenticated(userProfile.authenticated);
					setProfile(userProfile);
					setUserPlan("pro");
				}
			} catch (error) {
				console.error("Authentication check failed:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkIsAuthenticated();
	}, [setProfile]);

	const getInitials = (name?: string) => {
		if (!name) return "U";
		return name
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const handleLogout = async () => {
		try {
			await authService.signOut();
			setIsAuthenticated(false);
			clearProfile();
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const AuthButton = () => {
		return (
			profile && (
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
											userPlan === "pro" || userPlan === "enterprise"
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
							<span className='font-grotesk'>Follow us on Twitter</span>
						</DropdownMenuItem>

						<DropdownMenuItem
							className='cursor-pointer flex items-center px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 focus:bg-zinc-700 rounded-lg transition-colors'
							asChild>
							<Link to='/articles'>
								<MailIcon className='mr-3 h-4 w-4' />
								<span className='font-grotesk'>Email Us</span>
							</Link>
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
			)
		);
	};

	return (
		<header
			className={cn(
				"absolute flex items-center justify-between w-[95%] sm:w-[90%] mx-auto max-w-6xl top-[2vh] md:top-[3vh] left-1/2 -translate-x-1/2 px-3 sm:px-4 md:px-3 z-20 bg-zinc-800 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] shadow-apple-xl py-2.5 sm:py-3",
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
			</Link>

			{/* Desktop Navigation */}
			<div className='hidden md:flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-app-primary font-montserrat font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl'>
				Translated Articles
			</div>

			{/* Desktop Auth Button */}
			<div className='hidden md:block'>
				<AuthButton />
			</div>
		</header>
	);
}

export default Header;
