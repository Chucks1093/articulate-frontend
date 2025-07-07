// components/ArticleCard.tsx
import React from "react";
import { Download, Eye, ExternalLink } from "lucide-react";
import { TranslatedArticle, Language } from "@/types/article.types";
import { formatDate, getLanguageName } from "@/utils/helpers.utils";
import { useNavigate } from "react-router";

interface ArticleCardProps {
	article: TranslatedArticle["article"];
	languages: Language[];
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, languages }) => {
	const navigate = useNavigate();
	const handleView = () => {
		console.log("Viewing article:", article.title);
	};

	const handleDownload = () => {
		console.log("Downloading article:", article.title);
	};

	return (
		<article className='bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300'>
			{/* Header with Flag and View Button */}
			<div className='flex justify-between items-start mb-4'>
				<div className='flex items-center gap-2'>
					<img
						src={`/icons/flags/${article.converted_lang}.svg`}
						alt={`${article.converted_lang} flag`}
						className='w-8 h-8 rounded-full object-cover'
					/>
					<span className='text-xs text-gray-500 font-medium'>
						{formatDate(article.created_at)}
					</span>
				</div>
				<a
					href={`/articles/${article.doc_id}`}
					onClick={handleView}
					className='text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-blue-50'>
					<Eye className='w-5 h-5' />
				</a>
			</div>

			{/* Article Title */}
			<h2 className='text-lg font-semibold text-gray-900 mb-3 line-clamp-3 leading-tight'>
				{article.title}
			</h2>

			{/* Tags */}
			<div className='flex flex-wrap gap-2 mb-4'>
				<span className='px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full'>
					{getLanguageName(article.converted_lang, languages)}
				</span>
				<span className='px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full'>
					Translated
				</span>
			</div>

			{/* Author Info */}
			<div className='flex items-center gap-2 mb-4 text-sm text-gray-600'>
				<span>by {article.author}</span>
			</div>

			{/* Action Buttons */}
			<div className='flex gap-2 pt-2'>
				<a
					href={article.original_url}
					target='_blank'
					rel='noopener noreferrer'
					className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'>
					<ExternalLink className='w-4 h-4' />
					Original
				</a>
				<button
					onClick={handleDownload}
					className='flex-1 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'>
					<Download className='w-4 h-4' />
					Download
				</button>
			</div>
		</article>
	);
};

export default ArticleCard;
