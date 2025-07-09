import { useLoaderData, useNavigate } from "react-router";
import { AlertCircle, ExternalLink } from "lucide-react";
import ArticleContent from "@/components/article/ArticleContent";
import { ArticleLoaderResponse } from "@/scripts/article.loader";
import { Profile } from "@/hooks/useProfileStore";

/**
 * Component for handling errors
 */
function ErrorView({ error, user }: { error: string; user: Profile }) {
	const navigate = useNavigate();

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20'>
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
							onClick={() => navigate("/articles")}
							className='w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors'>
							Back to Articles
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
 * Updated ArticlePreview component - No header or footer (handled by layout)
 */
const ArticlePreview = () => {
	const { user, article, isValid, error } =
		useLoaderData() as ArticleLoaderResponse;
	const navigate = useNavigate();

	// Handle errors
	if (!isValid || error) {
		return (
			<ErrorView
				error={error || "Unknown error occurred"}
				user={user}
			/>
		);
	}

	// Handle missing article data
	if (!article) {
		return (
			<ErrorView
				error='Article data is not available'
				user={user}
			/>
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
		<div className='bg-white min-h-screen pt-[4vh] md:pt-[10vh] hero__bg'>
			{/* Main Content */}
			<main className='pt-20'>
				{/* Cover image if available */}
				{article.cover_photo && (
					<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8'>
						<img
							src={article.cover_photo}
							alt='Article cover'
							className='w-full rounded-xl md:h-[33rem] h-[24rem] object-cover'
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
								className='w-12 h-12 rounded-full flex-shrink-0 object-cover'
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
					<div className='pt-8 border-t border-gray-200  pb-10'>
						<p className='text-sm text-gray-500 mb-2'>
							Original article:
						</p>
						<a
							href={article.original_url}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-600 hover:text-blue-800 underline break-all text-sm sm:text-base flex items-center gap-1'>
							{article.original_url}
							<ExternalLink className='w-4 h-4' />
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
		</div>
	);
};

export default ArticlePreview;
