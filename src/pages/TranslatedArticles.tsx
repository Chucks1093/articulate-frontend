// pages/TranslatedArticles.tsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Globe } from "lucide-react";

// Import components
import ArticleCard from "@/components/article/ArticleCard";
import ArticleCardSkeleton from "@/components/article/ArticleCardSkeleton";
import SearchAndFilter from "@/components/article/SearchAndFilter";

import { languages } from "@/utils/data.utils";
import {
	Article,
	articleService,
	PaginatedResponse,
} from "@/services/article.service";
import { authService } from "@/services/auth.service";
import Header from "@/components/article/Header";

const ITEMS_PER_PAGE = 12;

const TranslatedArticles: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [paginatedData, setPaginatedData] =
		useState<PaginatedResponse<Article> | null>(null);
	const [allArticles, setAllArticles] = useState<Article[]>([]);
	const [userId, setUserId] = useState<string>("");

	// Load articles with pagination from Supabase
	const loadArticles = useCallback(
		async (page: number = 1) => {
			if (!userId) return;

			setIsLoading(true);
			try {
				const response = await articleService.getAllArticles({
					page,
					limit: ITEMS_PER_PAGE,
					userId: userId,
				});

				const data = [...response.data, ...response.data];

				setPaginatedData(response);
				setAllArticles(data);
			} catch (error) {
				console.error("Error loading articles:", error);
				setPaginatedData({
					data: [],
					pagination: {
						page: 1,
						limit: ITEMS_PER_PAGE,
						total: 0,
						totalPages: 0,
						hasNext: false,
						hasPrev: false,
					},
				});
				setAllArticles([]);
			} finally {
				setIsLoading(false);
			}
		},
		[userId]
	);

	// Client-side filtering and search
	const filteredArticles = useMemo(() => {
		if (!allArticles.length) return [];

		let filtered = allArticles;

		// Filter by language
		if (selectedLanguage !== "all") {
			filtered = filtered.filter(
				(article) => article.converted_lang === selectedLanguage
			);
		}

		// Filter by search term
		if (searchTerm.trim()) {
			const searchLower = searchTerm.toLowerCase().trim();
			filtered = filtered.filter(
				(article) =>
					article.title.toLowerCase().includes(searchLower) ||
					article.author.toLowerCase().includes(searchLower) ||
					article.description?.toLowerCase().includes(searchLower) ||
					article.body.toLowerCase().includes(searchLower)
			);
		}

		return filtered;
	}, [allArticles, selectedLanguage, searchTerm]);

	// Client-side pagination for filtered results
	const paginatedFilteredArticles = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		const paginatedItems = filteredArticles.slice(startIndex, endIndex);

		const total = filteredArticles.length;
		const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

		return {
			data: paginatedItems,
			pagination: {
				page: currentPage,
				limit: ITEMS_PER_PAGE,
				total,
				totalPages,
				hasNext: currentPage < totalPages,
				hasPrev: currentPage > 1,
			},
		};
	}, [filteredArticles, currentPage]);

	// Get user and load initial articles
	useEffect(() => {
		const initializeData = async () => {
			try {
				const user = await authService.getCurrentUser();
				setUserId(user.id);
			} catch (error) {
				console.error("Error getting user:", error);
			}
		};

		initializeData();
	}, []);

	// Load articles when userId is available
	useEffect(() => {
		if (userId) {
			loadArticles(1);
			setCurrentPage(1);
		}
	}, [userId, loadArticles]);

	// Reset to first page when search or language filter changes
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedLanguage]);

	// Handle search change
	const handleSearchChange = useCallback((newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	}, []);

	// Handle language filter change
	const handleLanguageChange = useCallback((newLanguage: string) => {
		setSelectedLanguage(newLanguage);
	}, []);

	// Handle page change
	const handlePageChange = useCallback((page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	// Pagination helper functions
	const goToPreviousPage = useCallback(() => {
		if (currentPage > 1) {
			handlePageChange(currentPage - 1);
		}
	}, [currentPage, handlePageChange]);

	const goToNextPage = useCallback(() => {
		if (currentPage < paginatedFilteredArticles.pagination.totalPages) {
			handlePageChange(currentPage + 1);
		}
	}, [
		currentPage,
		paginatedFilteredArticles.pagination.totalPages,
		handlePageChange,
	]);

	// Clear filters
	const clearFilters = useCallback(() => {
		setSearchTerm("");
		setSelectedLanguage("all");
		setCurrentPage(1);
	}, []);

	const { data: articles, pagination } = paginatedFilteredArticles;

	return (
		<div className='bg-gray-50 min-h-screen py-10 hero__bg'>
			<Header className='static mx-auto translate-x-0 max-w-5xl' />

			{/* Main Content */}
			<motion.div
				className='max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8'
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}>
				{/* Search and Filter Section */}
				<SearchAndFilter
					searchTerm={searchTerm}
					onSearchChange={handleSearchChange}
					selectedLanguage={selectedLanguage}
					onLanguageChange={handleLanguageChange}
					resultsCount={pagination.total}
					totalCount={paginatedData?.pagination.total}
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
				) : articles.length > 0 ? (
					<>
						<motion.div
							initial={{ opacity: 0, y: 25 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
							{articles.map((article) => {
								return (
									<ArticleCard
										key={article.doc_id}
										article={article}
										languages={languages}
									/>
								);
							})}
						</motion.div>

						{/* Pagination */}
						{pagination.totalPages > 1 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.4, delay: 0.3 }}>
								<div className='bg-white rounded-lg border border-gray-200 shadow-sm mt-6 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0'>
									<div className='text-xs sm:text-sm text-gray-700 text-center sm:text-left'>
										Showing{" "}
										<span className='font-medium'>
											{(currentPage - 1) * ITEMS_PER_PAGE + 1}
										</span>{" "}
										to{" "}
										<span className='font-medium'>
											{Math.min(
												currentPage * ITEMS_PER_PAGE,
												pagination.total
											)}
										</span>{" "}
										of{" "}
										<span className='font-medium'>
											{pagination.total}
										</span>{" "}
										article(s)
									</div>
									<div className='flex items-center gap-2'>
										<button
											onClick={goToPreviousPage}
											disabled={currentPage === 1}
											className={`px-3 sm:px-4 py-2 border border-gray-200 rounded-md text-xs sm:text-sm transition-colors ${
												currentPage === 1
													? "text-gray-400 bg-gray-50 cursor-not-allowed"
													: "text-gray-700 bg-white hover:bg-gray-50"
											}`}>
											Previous
										</button>
										<span className='px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-700'>
											Page {currentPage} of {pagination.totalPages}
										</span>
										<button
											onClick={goToNextPage}
											disabled={
												currentPage === pagination.totalPages ||
												pagination.totalPages === 0
											}
											className={`px-3 sm:px-4 py-2 border border-gray-200 rounded-md text-xs sm:text-sm transition-colors ${
												currentPage === pagination.totalPages ||
												pagination.totalPages === 0
													? "text-gray-400 bg-gray-50 cursor-not-allowed"
													: "text-gray-700 bg-white hover:bg-gray-50"
											}`}>
											Next
										</button>
									</div>
								</div>
							</motion.div>
						)}
					</>
				) : searchTerm || selectedLanguage !== "all" ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-gray-200'>
						<Search className='w-16 h-16 text-gray-300 mb-4' />
						<h3 className='text-lg font-medium text-gray-700 mb-2 font-grotesk'>
							No articles found
						</h3>
						<p className='text-gray-500 max-w-md mb-6 font-grotesk'>
							No articles match your search criteria. Try different
							keywords or change the language filter.
						</p>
						<button
							onClick={clearFilters}
							className='bg-app-primary hover:bg-app-primary/90 text-white font-grotesk px-4 py-2 rounded-md transition-colors'>
							Clear filters
						</button>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-gray-200'>
						<Globe className='w-16 h-16 text-gray-300 mb-4' />
						<h3 className='text-lg font-medium text-gray-700 mb-2 font-grotesk'>
							No translated articles yet
						</h3>
						<p className='text-gray-500 max-w-md font-grotesk'>
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
