// components/SearchAndFilter.tsx
import React, { useState } from "react";
import { Search, Globe, ChevronDown } from "lucide-react";
import { Language } from "@/types/article.types";

interface SearchAndFilterProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	selectedLanguage: string;
	onLanguageChange: (value: string) => void;
	languages: Language[];
	resultsCount?: number;
	totalCount?: number;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
	searchTerm,
	onSearchChange,
	selectedLanguage,
	onLanguageChange,
	languages,
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const clearSearch = () => {
		onSearchChange("");
	};

	const getSelectedLanguageDisplay = () => {
		if (selectedLanguage === "all") {
			return {
				icon: <Globe className='w-6 h-6 text-gray-700' />,
				name: "All Languages",
			};
		}
		const lang = languages.find((l) => l.code === selectedLanguage);
		return {
			icon: (
				<img
					src={`/icons/flags/${selectedLanguage}.svg`}
					alt=''
					className='w-6 h-6'
				/>
			),
			name: lang?.name || selectedLanguage.toUpperCase(),
		};
	};

	return (
		<div className=' max-w-7xl mb-8 flex h-16  items-center gap-4 justify-between'>
			{/* Search Input */}
			<div className='relative m border-2 border-black bg-white flex items-center  py-2 rounded-md h-full  flex-1'>
				<div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
					<Search
						className='text-zinc-800'
						size={20}
					/>
				</div>
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder='Search articles, authors, or languages...'
					className='flex-1 pl-12 pr-4 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm'
				/>
				{searchTerm && (
					<button
						onClick={clearSearch}
						className='mr-4 px-4 h-10 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium transition-colors'>
						Clear
					</button>
				)}
			</div>

			{/* Language Filter */}
			<div className='relative w-fit h-full  '>
				<button
					type='button'
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					className='border-2 border-black bg-white h-full   rounded-md flex items-center gap-3 hover:bg-gray-50 transition-colors px-4 min-w-[12rem]'>
					{getSelectedLanguageDisplay().icon}
					<span className='text-sm font-medium text-zinc-800'>
						{getSelectedLanguageDisplay().name}
					</span>
					<ChevronDown
						size={16}
						className={`text-gray-500 transition-transform ml-auto ${
							isDropdownOpen ? "rotate-180" : ""
						}`}
					/>
				</button>

				{/* Dropdown Menu */}
				{isDropdownOpen && (
					<>
						<div
							className='fixed inset-0 z-0'
							onClick={() => setIsDropdownOpen(false)}
						/>
						<div className='absolute top-full left-0 mt-1 bg-white border-2 border-black rounded-md shadow-lg z-10 max-h-48 overflow-y-auto min-w-[200px]'>
							<button
								type='button'
								onClick={() => {
									onLanguageChange("all");
									setIsDropdownOpen(false);
								}}
								className='w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3 text-sm border-b border-gray-100'>
								<Globe className='w-6 h-6 text-gray-800' />
								<span className='font-medium text-zinc-800'>
									All Languages
								</span>
							</button>
							{languages.map((language) => (
								<button
									key={language.code}
									type='button'
									onClick={() => {
										onLanguageChange(language.code);
										setIsDropdownOpen(false);
									}}
									className='w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3 text-sm border-b border-gray-100 last:border-b-0'>
									<img
										src={`/icons/flags/${language.code}.svg`}
										className='w-6 h-6'
										alt=''
									/>
									<span className='font-medium text-zinc-800'>
										{language.name}
									</span>
								</button>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default SearchAndFilter;
