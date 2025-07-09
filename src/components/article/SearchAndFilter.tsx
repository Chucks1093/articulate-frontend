// components/SearchAndFilter.tsx
import React, { useState } from "react";
import { Search, Globe, ChevronDown, Check } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import lingoSupportedLanguages from "@/utils/languages.util";

interface SearchAndFilterProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	selectedLanguage: string;
	onLanguageChange: (value: string) => void;
	resultsCount?: number;
	totalCount?: number;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
	searchTerm,
	onSearchChange,
	selectedLanguage,
	onLanguageChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const clearSearch = () => {
		onSearchChange("");
	};

	const getSelectedLanguageDisplay = () => {
		if (selectedLanguage === "all") {
			return {
				icon: <Globe className='w-5 h-5 sm:w-6 sm:h-6 text-gray-700' />,
				name: "All Languages",
			};
		}
		const lang = lingoSupportedLanguages.find(
			(l) => l.code === selectedLanguage
		);
		return {
			icon: (
				<div className='w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex items-center justify-center'>
					<img
						src={`/icons/flags/${lang?.code || selectedLanguage}.svg`}
						alt=''
						className='w-10 h-10 sm:w-12 sm:h-12 object-cover'
					/>
				</div>
			),
			name: lang?.name || selectedLanguage.toUpperCase(),
		};
	};

	const handleLanguageSelect = (languageCode: string) => {
		onLanguageChange(languageCode);
		setIsOpen(false);
	};

	return (
		<div className='max-w-7xl mb-6 sm:mb-8 flex flex-col sm:flex-row sm:h-16 items-stretch sm:items-center gap-3 sm:gap-4 justify-between'>
			{/* Search Input */}
			<div className='relative border-2 border-black bg-white flex items-center py-2 rounded-md h-12 sm:h-full flex-1'>
				<div className='absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2'>
					<Search
						className='text-zinc-800'
						size={18}
					/>
				</div>
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder='Search articles...'
					className='flex-1 pl-10 sm:pl-12 pr-4 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-grotesk'
				/>
				{searchTerm && (
					<button
						onClick={clearSearch}
						className='mr-2 sm:mr-4 px-2 sm:px-4 h-8 sm:h-10 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs sm:text-sm font-medium transition-colors font-grotesk'>
						Clear
					</button>
				)}
			</div>

			{/* Language Filter */}
			<Popover
				open={isOpen}
				onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={isOpen}
						className='border-2 border-black bg-white h-12 sm:h-full rounded-md flex items-center gap-2 sm:gap-3 hover:bg-gray-50 transition-colors px-3 sm:px-4 justify-between'>
						<div className='flex items-center gap-2 sm:gap-3'>
							{getSelectedLanguageDisplay().icon}
							<span className='text-xs sm:text-sm font-medium text-zinc-800 font-grotesk truncate'>
								{getSelectedLanguageDisplay().name}
							</span>
						</div>
						<ChevronDown
							size={16}
							className={cn(
								"text-gray-500 transition-transform flex-shrink-0",
								isOpen && "rotate-180"
							)}
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-[16rem] sm:w-[20rem] p-0 border-2 border-black'
					align='end'>
					<Command className='bg-white'>
						<CommandInput
							placeholder='Search languages...'
							className='h-12 font-grotesk text-black'
						/>
						<CommandList>
							<CommandEmpty className='py-6 text-center text-sm text-gray-500 font-grotesk'>
								No languages found
							</CommandEmpty>
							<CommandGroup>
								{/* All Languages Option */}
								<CommandItem
									value='all-languages'
									onSelect={() => handleLanguageSelect("all")}
									className='flex items-center gap-3 py-3 cursor-pointer font-grotesk data-[selected=true]:bg-gray-200'>
									<Globe className='block w-10 sm:w-12 text-gray-800 rounded-full' />
									<span className='font-medium text-sm sm:text-md text-zinc-800'>
										All Languages
									</span>
									<Check
										className={cn(
											"ml-auto h-4 w-4 text-gray-800",
											selectedLanguage === "all"
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>

								{/* Language Options */}
								{lingoSupportedLanguages.map((language) => (
									<CommandItem
										key={language.code}
										value={`${language.name} ${language.code}`}
										onSelect={() =>
											handleLanguageSelect(language.code)
										}
										className='flex items-center gap-3 py-3 cursor-pointer font-grotesk data-[selected=true]:bg-gray-200'>
										<div className='w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex items-center justify-center'>
											<img
												src={`/icons/flags/${language.code}.svg`}
												alt=''
												className='w-10 h-10 sm:w-12 sm:h-12 object-cover'
											/>
										</div>
										<span className='font-medium text-sm text-zinc-800'>
											{language.name}
										</span>
										<Check
											className={cn(
												"ml-auto h-4 w-4 text-gray-800",
												selectedLanguage === language.code
													? "opacity-100"
													: "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default SearchAndFilter;
