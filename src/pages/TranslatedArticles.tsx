// pages/TranslatedArticles.tsx
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Globe } from "lucide-react";

// Import components
import Header from "@/components/article/Header";
import ArticleCard from "@/components/article/ArticleCard";
import ArticleCardSkeleton from "@/components/article/ArticleCardSkeleton";
import SearchAndFilter from "@/components/article/SearchAndFilter";

import { mockProfile, languages } from "@/utils/data.utils";
import { Article, articleService } from "@/services/article.service";
import { authService } from "@/services/auth.service";

const TranslatedArticles: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [articles, setArticles] = useState<Article[]>([]);
	const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

	// Filter articles
	const filteredArticles = useMemo(() => {
		let filtered = articles;

		if (selectedLanguage !== "all") {
			filtered = filtered.filter(
				(article) => article.converted_lang === selectedLanguage
			);
		}

		if (searchTerm.trim()) {
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter((article) => {
				return [article.title, article.author, article.converted_lang].some(
					(field) => field?.toLowerCase().includes(searchLower)
				);
			});
		}

		return filtered;
	}, [articles, searchTerm, selectedLanguage]);

	// Load articles
	useEffect(() => {
		const loadArticles = async () => {
			setIsLoading(true);
			try {
				const user = await authService.getCurrentUser();
				const articles = await articleService.getAllArticles(user.id);
				setArticles(articles);
			} catch (error) {
				console.error("Error loading articles:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadArticles();
	}, []);

	const handleLogout = () => {
		console.log("Logging out...");
		// Handle logout logic
	};

	const clearFilters = () => {
		setSearchTerm("");
		setSelectedLanguage("all");
	};

	return (
		<div className='bg-gray-50 min-h-screen'>
			{/* Header */}
			<Header
				profile={mockProfile}
				onLogout={handleLogout}
			/>

			{/* Main Content */}
			<motion.div
				className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}>
				{/* Page Title */}
				<motion.div
					className='mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						Translated Articles
					</h1>
					<p className='text-gray-600'>
						Access your AI-translated articles in multiple languages with
						beautifully formatted PDFs
					</p>
				</motion.div>

				{/* Search and Filter Section */}
				<SearchAndFilter
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
					selectedLanguage={selectedLanguage}
					onLanguageChange={setSelectedLanguage}
					languages={languages}
					resultsCount={
						searchTerm || selectedLanguage !== "all"
							? filteredArticles.length
							: undefined
					}
					totalCount={
						searchTerm || selectedLanguage !== "all"
							? articles.length
							: undefined
					}
				/>

				{/* Content */}
				{isLoading ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{Array.from({ length: 8 }).map((_, index) => (
							<ArticleCardSkeleton key={index} />
						))}
					</motion.div>
				) : filteredArticles.length > 0 ? (
					<motion.div
						initial={{ opacity: 0, y: 25 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{filteredArticles.map((article) => (
							<ArticleCard
								key={article.doc_id}
								article={article}
								languages={languages}
							/>
						))}
					</motion.div>
				) : searchTerm || selectedLanguage !== "all" ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-gray-200'>
						<Search className='w-16 h-16 text-gray-300 mb-4' />
						<h3 className='text-lg font-medium text-gray-700 mb-2'>
							No articles found
						</h3>
						<p className='text-gray-500 max-w-md mb-6'>
							No articles match your search criteria. Try different
							keywords or change the language filter.
						</p>
						<button
							onClick={clearFilters}
							className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'>
							Clear filters
						</button>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-gray-200'>
						<Globe className='w-16 h-16 text-gray-300 mb-4' />
						<h3 className='text-lg font-medium text-gray-700 mb-2'>
							No translated articles yet
						</h3>
						<p className='text-gray-500 max-w-md'>
							Start translating articles using our AI-powered translation
							tool. Your translated articles will appear here.
						</p>
					</motion.div>
				)}
			</motion.div>
		</div>
	);
};

export default TranslatedArticles;
