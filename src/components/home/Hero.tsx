import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link, ArrowRight, ChevronDown, Search } from "lucide-react";
import languages from "@/utils/languages.util";
import { articleService } from "@/services/article.service";
import { useProfileStore } from "@/hooks/useProfileStore";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner"; // Adjust path as needed
import FeatureItem from "../common/FeatureItem";
import lingoSupportedLanguages from "@/utils/languages.util";
import showToast from "@/utils/toast.utils";
export function URLTransformForm() {
	const [url, setUrl] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [dropdownPosition, setDropdownPosition] = useState({
		top: 0,
		right: 0,
	});
	const buttonRef = useRef<HTMLButtonElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);
	const { profile } = useProfileStore();
	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (!url.trim() || isLoading) return;

		setIsLoading(true);
		console.log("Submitted URL:", url);
		console.log("Target Language:", selectedLanguage);

		try {
			if (!profile) return;

			await articleService.translateArticle({
				url,
				language: selectedLanguage.code,
				userId: profile?.id,
			});

			// Navigate to articles page on success
			navigate("/articles");
		} catch (error) {
			console.log(error);
			showToast.error("Translation Process Failed");
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && canSubmit && !isLoading) {
			handleSubmit();
		}
	};

	const isValidUrl = (string: string) => {
		try {
			new URL(string);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const canSubmit = url.trim() && isValidUrl(url);

	// Filter languages based on search term
	const filteredLanguages = languages.filter((language) =>
		language.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Calculate dropdown position when opening
	const handleDropdownToggle = () => {
		if (!isDropdownOpen && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setDropdownPosition({
				top: rect.bottom + window.scrollY + 4,
				right: window.innerWidth - rect.right,
			});
		}
		setIsDropdownOpen(!isDropdownOpen);

		// Clear search when closing dropdown
		if (isDropdownOpen) {
			setSearchTerm("");
		}
	};

	// Focus search input when dropdown opens
	useEffect(() => {
		if (isDropdownOpen && searchRef.current) {
			setTimeout(() => {
				searchRef.current?.focus();
			}, 100);
		}
	}, [isDropdownOpen]);

	// Update position on scroll/resize
	useEffect(() => {
		const updatePosition = () => {
			if (isDropdownOpen && buttonRef.current) {
				const rect = buttonRef.current.getBoundingClientRect();
				setDropdownPosition({
					top: rect.bottom + window.scrollY + 4,
					right: window.innerWidth - rect.right,
				});
			}
		};

		if (isDropdownOpen) {
			window.addEventListener("scroll", updatePosition);
			window.addEventListener("resize", updatePosition);
		}

		return () => {
			window.removeEventListener("scroll", updatePosition);
			window.removeEventListener("resize", updatePosition);
		};
	}, [isDropdownOpen]);

	return (
		<div className='mt-10 max-w-xl mx-auto'>
			<div className=''>
				{/* URL Input Section with Language Selector */}
				<div className='relative mb-4 border-2 border-black bg-white flex items-center h-16 py-2 rounded-md'>
					{/* URL Icon */}
					<div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
						<Link
							className='text-zinc-800'
							size={20}
						/>
					</div>

					{/* URL Input */}
					<input
						type='url'
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder='Paste article URL here'
						className='flex-1 pl-12 pr-4 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm'
						disabled={isLoading}
					/>

					{/* Language Selector inside input */}
					<div className='relative mr-2'>
						<button
							ref={buttonRef}
							type='button'
							onClick={handleDropdownToggle}
							disabled={isLoading}
							className='border border-gray-300 bg-gray-50 h-10 px-3 rounded-md flex items-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
							<img
								className='w-6 h-6 rounded-full object-cover'
								src={`/icons/flags/${selectedLanguage.code}.svg`}
								alt={selectedLanguage.name}
							/>
							<ChevronDown
								size={14}
								className={`text-gray-500 transition-transform ${
									isDropdownOpen ? "rotate-180" : ""
								}`}
							/>
						</button>
					</div>
				</div>

				{/* URL Validation Error */}
				{url && !isValidUrl(url) && (
					<p className='text-red-600 text-xs mb-4 ml-1 text-left'>
						Please enter a valid URL
					</p>
				)}

				{/* External Submit Button */}
				<button
					type='button'
					onClick={handleSubmit}
					disabled={!canSubmit || isLoading}
					className={`w-full h-14 rounded-md transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold tracking-wider ${
						canSubmit && !isLoading
							? "bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-800"
							: "bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-300"
					}`}>
					{isLoading ? (
						<>
							<LoadingSpinner
								size='25px'
								color='gray'
							/>
							<span>Translating...</span>
						</>
					) : (
						<>
							<span>Translate to {selectedLanguage.name}</span>
							<ArrowRight size={16} />
						</>
					)}
				</button>

				{/* Click outside to close dropdown */}
				{isDropdownOpen && (
					<div
						className='fixed inset-0 z-40'
						onClick={() => setIsDropdownOpen(false)}
					/>
				)}
			</div>

			{/* Portaled Dropdown Menu */}
			{isDropdownOpen &&
				createPortal(
					<div
						className='fixed bg-white border-2 border-black rounded-md shadow-lg z-50 max-h-[20rem] overflow-hidden w-[18rem]'
						style={{
							top: `${dropdownPosition.top}px`,
							right: `${dropdownPosition.right}px`,
						}}>
						{/* Search Bar */}
						<div className='p-3 border-b border-gray-200 bg-gray-50'>
							<div className='relative'>
								<div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
									<Search
										className='text-gray-400'
										size={16}
									/>
								</div>
								<input
									ref={searchRef}
									type='text'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder='Search languages...'
									className='w-full pl-9 pr-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent'
								/>
							</div>
						</div>

						{/* Languages List */}
						<div className='max-h-[15rem] overflow-y-auto'>
							{filteredLanguages.length > 0 ? (
								filteredLanguages.map((language) => (
									<button
										key={language.code}
										type='button'
										onClick={() => {
											setSelectedLanguage(language);
											setIsDropdownOpen(false);
											setSearchTerm("");
										}}
										className='w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3 text-sm border-b border-gray-100 last:border-b-0'>
										<img
											src={`/icons/flags/${language.code}.svg`}
											className='w-6 h-6 rounded-full object-cover'
											alt={language.name}
										/>
										<span className='font-medium text-zinc-800'>
											{language.name}
										</span>
									</button>
								))
							) : (
								<div className='px-4 py-6 text-center text-gray-500 text-sm'>
									No languages found
								</div>
							)}
						</div>
					</div>,
					document.body
				)}
		</div>
	);
}

function Hero() {
	return (
		<section className='bg-white md:min-h-[45rem] h-screen flex md:items-center  relative overflow-hidden justify-center w-full  '>
			<div className='max-w-3xl relative z-10 h-fit  ticket-border top-[17vh] md:top-10 mx-8'>
				<div className='bg-white py-16 ticket-shape px-3'>
					<div className='z-10 relative text-center'>
						<h1 className='text-zinc-800 font-serif text-[1.3rem] md:text-[2.7rem] font-medium  mb-4 md:mb-6 leading-tight'>
							Break language barriers and <br /> unlock global knowledge
						</h1>
						<p className='w-[85%] text-zinc-600 text-xs md:text-center text-justify  md:text-sm mb-8 leading-relaxed mx-auto'>
							Our AI-powered platform instantly converts any online
							article into beautifully formatted PDFs in 150+ languages.
							Access knowledge without barriers, improve language skills,
							and explore content from around the world with just one
							click.
						</p>
					</div>
					<URLTransformForm />
					<p className='text-xs text-zinc-500 text-center mt-6'>
						We support {lingoSupportedLanguages.length}+ languages,
						including Spanish, French, German, and many more.
					</p>
				</div>
			</div>

			{/* Animated Flags Section */}
			<div className='w-full  absolute  inset  h-full'>
				<div className='w-full relative md:block h-full'>
					{/* <CareerCard className='absolute bottom-20 h-fit -left-14 z-10 bg-white shadow-md ' /> */}
					<FeatureItem
						code='world'
						title='Global Access'
						description='Unlock worldwide content'
						iconColor='text-blue-600'
						iconBgColor='bg-blue-50'
						className='absolute right-2 top-10 md:top-[20%] h-fit md:right-[4%] z-10 bg-gray-100  border'
					/>

					<FeatureItem
						code='no'
						title='PDF Export'
						description='Beautiful formatted documents'
						iconColor='text-orange-600'
						iconBgColor='bg-orange-50'
						className='absolute md:bottom-20 h-fit md:left-[15%] z-10 bg-white shadow-md bottom-[4px] border'
					/>

					<div className=' h-full w-full overflow-hidden border left-0 '>
						<AnimatePresence>
							<motion.img
								src='/images/hero-img.svg'
								className='absolute inset-0 h-full w-full object-cover grayscale-[.2] brightness-[.6]  '
								initial={{
									opacity: 0,
									scale: 1,
								}}
								animate={{
									opacity: 1,
									scale: 1.1,
								}}
								exit={{
									opacity: 0,
									scale: 1.15,
								}}
								transition={{
									opacity: { duration: 0.5, ease: "easeInOut" },
									scale: { duration: 10, ease: "easeOut" },
								}}
							/>
						</AnimatePresence>
					</div>
				</div>
			</div>

			<img
				src='/images/shadow.avif'
				alt=''
				className='absolute inset-0 opacity-30 invert brightness-200 hidden'
			/>
		</section>
	);
}

export default Hero;
