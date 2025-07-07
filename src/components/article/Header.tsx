// components/Header.tsx
import React from "react";
import { Home, BookOpen, Settings, ChevronDown, LogOut } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/types/article.types";
import { getInitials } from "@/utils/helpers.utils";

interface HeaderProps {
	profile: UserProfile;
	onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ profile, onLogout }) => {
	return (
		<header className='bg-white border-b border-gray-200 sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Left Section - Logo and Navigation */}
					<div className='flex items-center gap-8'>
						<div className='flex items-center gap-3'>
							<div className='p-2 bg-blue-600 rounded-lg'>
								<img
									src='/icons/logo.svg'
									alt='Articulate Logo'
									className='h-6 w-6'
								/>
							</div>
							<span className='text-xl font-bold text-gray-900'>
								Articulate
							</span>
						</div>

						{/* Navigation Links */}
						<nav className='hidden md:flex items-center gap-6'>
							<a
								href='/'
								className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors'>
								<Home className='w-4 h-4' />
								<span className='text-sm font-medium'>Home</span>
							</a>
							<a
								href='/articles'
								className='flex items-center gap-2 text-blue-600 font-medium'>
								<BookOpen className='w-4 h-4' />
								<span className='text-sm'>Articles</span>
							</a>
							<a
								href='/settings'
								className='flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors'>
								<Settings className='w-4 h-4' />
								<span className='text-sm font-medium'>Settings</span>
							</a>
						</nav>
					</div>

					{/* Right Section - User Dropdown */}
					<div className='flex items-center ml-4'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='ghost'
									className='flex items-center gap-2 px-2 sm:px-3 py-2 h-auto bg-white border border-gray-200 rounded-full hover:border-gray-300 transition-all duration-200'>
									<Avatar className='w-8 h-8'>
										<AvatarImage
											src={profile.avatar}
											alt={profile.username}
										/>
										<AvatarFallback className='bg-blue-500 text-white text-sm'>
											{getInitials(profile.username)}
										</AvatarFallback>
									</Avatar>
									<span className='text-sm font-medium text-gray-700 hidden sm:block'>
										{profile.username.split(" ")[0]}
									</span>
									<ChevronDown className='w-4 h-4 text-gray-500 hidden sm:block' />
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent
								align='end'
								className='w-64 bg-white/95 backdrop-blur-md shadow-xl ring-1 ring-black/5 border-0 rounded-xl p-2'>
								{/* User Info Section with Centered Avatar */}
								<div className='flex flex-col items-center py-4 px-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mb-2'>
									<Avatar className='w-16 h-16 mb-3 ring-2 ring-white shadow-md'>
										<AvatarImage
											src={profile.avatar}
											alt={profile.username}
										/>
										<AvatarFallback className='bg-blue-500 text-white text-lg font-semibold'>
											{getInitials(profile.username)}
										</AvatarFallback>
									</Avatar>
									<div className='text-center'>
										<p className='text-sm font-semibold text-gray-900 mb-1'>
											{profile.username}
										</p>
										<p className='text-xs text-gray-600'>
											{profile.email}
										</p>
									</div>
								</div>

								<DropdownMenuSeparator className='my-2' />

								<DropdownMenuItem
									className='cursor-pointer flex items-center px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 rounded-lg transition-colors'
									onClick={onLogout}>
									<LogOut className='mr-3 h-4 w-4' />
									<span>Sign Out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
