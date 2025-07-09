import { useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import lingoSupportedLanguages from "@/utils/languages.util";

function Footer() {
	const navigate = useNavigate();
	const [selectedLanguage, setSelectedLanguage] = useState(
		lingoSupportedLanguages[0]
	);
	const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

	const handleLanguageSelect = (
		language: (typeof lingoSupportedLanguages)[0]
	) => {
		setSelectedLanguage(language);
		setIsLanguageDropdownOpen(false);
		// TODO: Implement actual language switching functionality
		console.log("Language selected:", language);
	};

	return (
		<footer className='bg-gray-50 border-t border-gray-200 '>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Main Footer Content */}
				<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
					{/* Left Side - Brand and Navigation */}
					<div className='flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8'>
						<div className='flex items-center gap-3'>
							<div className='bg-app-primary flex items-center justify-center p-2 rounded-full relative'>
								<img
									src='/icons/logo.svg'
									alt='Articulate Logo'
									className='h-6 w-6'
								/>
							</div>
							<span className='text-xl font-montserrat font-semibold text-gray-900'>
								Articulate
							</span>
						</div>

						{/* Language Selector */}
						<div className='relative'>
							<button
								onClick={() =>
									setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
								}
								className='flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700'>
								<div className='w-5 h-5  rounded-full overflow-hidden flex items-center justify-center'>
									<img
										src={`/icons/flags/${selectedLanguage.code}.svg`}
										alt=''
										className='w-7 h-7  object-cover'
									/>
								</div>
								<span className='hidden sm:inline'>
									{selectedLanguage.name}
								</span>
								<span className='sm:hidden'>
									{selectedLanguage.code.toUpperCase()}
								</span>
								<ChevronDown
									className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
								/>
							</button>

							{/* Language Dropdown */}
							{isLanguageDropdownOpen && (
								<div className='absolute bottom-full left-0 mb-1 min-w-[18rem] bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto'>
									{lingoSupportedLanguages.map((language) => (
										<button
											key={language.code}
											onClick={() => handleLanguageSelect(language)}
											className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm ${
												selectedLanguage.code === language.code
													? "bg-blue-50 text-blue-600"
													: "text-gray-700"
											}`}>
											<div className='w-5 h-5  rounded-full overflow-hidden flex items-center justify-center'>
												<img
													src={`/icons/flags/${language?.code}.svg`}
													alt=''
													className='w-7 h-7  object-cover'
												/>
											</div>
											<span>{language.name}</span>
										</button>
									))}
								</div>
							)}

							{/* Backdrop to close dropdown */}
							{isLanguageDropdownOpen && (
								<div
									className='fixed inset-0 z-0'
									onClick={() => setIsLanguageDropdownOpen(false)}
								/>
							)}
						</div>
					</div>

					{/* Right Side - Social and Contact */}
					<div className='flex flex-col sm:flex-row sm:items-center gap-4'>
						<div className='flex items-center gap-4'>
							<a
								href='https://github.com/your-repo'
								target='_blank'
								rel='noopener noreferrer'
								className='p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors'>
								<svg
									className='w-5 h-5 text-gray-700'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
								</svg>
							</a>

							<a
								href='mailto:hello@articulate.com'
								className='p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors'>
								<svg
									className='w-5 h-5 text-gray-700'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
									/>
								</svg>
							</a>

							<a
								href='https://x.com/your-post-about-articulate'
								target='_blank'
								rel='noopener noreferrer'
								className='p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors'>
								<svg
									className='w-5 h-5 text-gray-700'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
								</svg>
							</a>
						</div>
					</div>
				</div>

				{/* Bottom Section - Copyright and Platform Availability */}
				<div className='mt-8 pt-6 border-t border-gray-200'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
						<div className='flex flex-wrap gap-6'>
							<button
								onClick={() => navigate("/")}
								className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase'>
								Home
							</button>
							<button
								onClick={() => navigate("/articles")}
								className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase'>
								Articles
							</button>
							<button
								onClick={() => navigate("/auth")}
								className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase'>
								Sign In
							</button>
						</div>

						<p className='text-sm text-gray-500'>
							© {new Date().getFullYear()} Articulate. All rights
							reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
