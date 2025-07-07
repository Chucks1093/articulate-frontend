import { useLoaderData, useNavigate } from "react-router";
import {
	Eye,
	FilePenLine,
	AlertCircle,
	ExternalLink,
	Globe,
} from "lucide-react";
import ArticleContent from "@/components/article/ArticleContent";
import { ArticleLoaderResponse } from "@/scripts/article.loader";

interface PreviewToastProps {
	switchToPreview: () => void;
}

export const PreviewToast: React.FC<PreviewToastProps> = ({
	switchToPreview,
}) => (
	<div className='animate-enter z-50 w-[22rem] bg-white shadow-lg rounded-lg pointer-events-auto flex fixed bottom-5 right-5 border border-zinc-200 items-center px-3'>
		<div className='flex-1 w-0 py-4 px-1 flex items-center gap-2'>
			<div className='bg-blue-50 p-2 rounded-full animate-pulse'>
				<Eye className='w-5 h-5 text-blue-600' />
			</div>
			<h3 className='text-sm font-medium text-zinc-800'>Preview Mode</h3>
		</div>
		<button
			className='flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 h-fit'
			onClick={switchToPreview}>
			<FilePenLine className='w-5 h-5' />
			<span className='font-medium text-sm'>Back to Editor</span>
		</button>
	</div>
);

/**
 * Fixed Header Component
 */
function ArticleHeader({ user }: { user: any }) {
	const navigate = useNavigate();

	return (
		<header className='fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo and Brand */}
					<div className='flex items-center gap-3'>
						<button
							onClick={() => navigate("/")}
							className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
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
						</button>
					</div>

					{/* Navigation */}
					<div className='flex items-center gap-4'>
						<button
							onClick={() => navigate("/auth")}
							className='bg-blue-600 hover:bg-blue-700 text-white text-md font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2'>
							Translate
							<Globe size={20} />
						</button>
						{user.authenticated ? (
							<div className='flex items-center gap-6'>
								<div className='flex items-center gap-2'>
									<img
										src={user.avatar || "/images/no-profile.jpg"}
										alt={user.name || "User"}
										className='w-9 h-9 rounded-full ring-4 ring-blue-50'
									/>
									<span className='hidden text-md capitalize font-montserrat font-medium text-gray-700  '>
										{user.username || "User"}
									</span>
								</div>
							</div>
						) : (
							<div className='flex items-center gap-3'>
								<button
									onClick={() => navigate("/auth")}
									className='text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors'>
									Sign In
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}

/**
 * Footer Component
 */
function ArticleFooter() {
	const navigate = useNavigate();

	return (
		<footer className='bg-gray-50 border-t border-gray-200 mt-16'>
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

						{/* Navigation Links */}
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
								className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase '>
								Home
							</button>
							<button
								onClick={() => navigate("/articles")}
								className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase '>
								Articles
							</button>
							<button
								onClick={() => navigate("/auth")}
								className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase '>
								Sign In
							</button>
						</div>

						<p className='text-xs text-gray-500'>
							© 2024 Articulate. All rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
/**
 * Component for handling errors
 */
function ErrorView({ error, user }: { error: string; user: any }) {
	const navigate = useNavigate();

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
			<div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
				<div className='mb-6'>
					<div className='mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
						<AlertCircle className='w-8 h-8 text-red-600' />
					</div>
					<h1 className='text-2xl font-bold text-gray-900 mb-2'>
						Unable to Load Article
					</h1>
					<p className='text-gray-600 mb-4'>{error}</p>
					<p className='text-sm text-gray-500'>
						Please check the URL and try again.
					</p>
				</div>

				<div className='space-y-3'>
					<button
						onClick={() => window.location.reload()}
						className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors'>
						Try Again
					</button>
					{user?.authenticated ? (
						<button
							onClick={() => navigate("/dashboard")}
							className='w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors'>
							Back to Dashboard
						</button>
					) : (
						<button
							onClick={() => navigate("/")}
							className='w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors'>
							Go Home
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

/**
 * Updated ArticlePreview component - Responsive with Header and Footer
 */
const ArticlePreview = () => {
	const { user, article, isValid, error } =
		useLoaderData() as ArticleLoaderResponse;
	const navigate = useNavigate();

	// Handle errors
	if (!isValid || error) {
		return (
			<>
				<ArticleHeader user={user} />
				<div className='pt-20'>
					<ErrorView
						error={error || "Unknown error occurred"}
						user={user}
					/>
				</div>
			</>
		);
	}

	// Handle missing article data
	if (!article) {
		return (
			<>
				<ArticleHeader user={user} />
				<div className='pt-20'>
					<ErrorView
						error='Article data is not available'
						user={user}
					/>
				</div>
			</>
		);
	}

	// Format the date
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className='bg-white min-h-screen'>
			{/* Fixed Header */}
			<ArticleHeader user={user} />

			{/* Main Content */}
			<main className='pt-20'>
				{/* Back button */}

				{/* Cover image if available */}
				{article.author_avatar && (
					<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8'>
						<img
							src={article.author_avatar}
							alt='Article cover'
							className='w-full rounded-xl h-48 sm:h-64 md:h-80 lg:h-96 object-cover'
						/>
					</div>
				)}

				<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
					{/* Author and metadata */}
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
						<div className='flex gap-3 items-center'>
							<img
								src={article.author_avatar || "/images/no-profile.jpg"}
								alt={article.author}
								className='w-12 h-12 rounded-full flex-shrink-0'
							/>
							<div className='min-w-0'>
								<h2 className='font-grotesk text-lg font-medium text-zinc-700 truncate'>
									{article.author}
								</h2>
								<p className='font-poppins text-sm text-zinc-500'>
									{article.created_at &&
										`Created on ${formatDate(article.created_at)}`}
									{article.published_at &&
										` • Published ${formatDate(article.published_at)}`}
								</p>
							</div>
						</div>

						<div className='flex gap-2 flex-wrap'>
							<div className='bg-blue-100 px-3 py-1 rounded-[.7rem] font-grotesk'>
								<span className='text-sm text-blue-600'>
									{article.converted_lang.toUpperCase()}
								</span>
							</div>
							<div className='bg-gray-100 px-3 py-1 rounded-[.7rem] font-grotesk'>
								<span className='text-sm text-gray-500'>
									Original: {article.original_lang.toUpperCase()}
								</span>
							</div>
						</div>
					</div>

					{/* Article title */}
					<div className='mb-6'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl font-medium font-montserrat text-gray-600 tracking-tight leading-tight md:leading-tight'>
							{article.title}
						</h1>
					</div>

					{/* Article description */}
					{article.description && (
						<div className='mb-8'>
							<p className='text-lg text-gray-600 leading-relaxed'>
								{article.description}
							</p>
						</div>
					)}

					{/* Article content */}
					<div className='prose prose-lg max-w-none mb-12'>
						<ArticleContent content={article.body} />
					</div>

					{/* Original article link */}
					<div className='pt-8 border-t border-gray-200 mb-8'>
						<p className='text-sm text-gray-500 mb-2'>
							Original article:
						</p>
						<a
							href={article.original_url}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-600 hover:text-blue-800 underline break-all text-sm sm:text-base'>
							{article.original_url}
						</a>
					</div>

					{/* Call to action for unauthenticated users */}
					{!user.authenticated && (
						<div className='p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 mb-8'>
							<div className='text-center'>
								<h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-2'>
									Want to translate your own articles?
								</h3>
								<p className='text-gray-600 mb-4 text-sm sm:text-base'>
									Sign in to access our AI-powered translation service
									and save your favorite articles.
								</p>
								<button
									onClick={() => navigate("/auth")}
									className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors text-sm sm:text-base'>
									Get Started for Free
								</button>
							</div>
						</div>
					)}
				</div>
			</main>

			{/* Footer */}
			<ArticleFooter />
		</div>
	);
};

export default ArticlePreview;
