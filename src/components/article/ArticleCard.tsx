// components/ArticleCard.tsx
import React, { memo, useState } from "react";
import {
	Download,
	Eye,
	ExternalLink,
	MoreVertical,
	Trash2,
	Copy,
} from "lucide-react";
import { TranslatedArticle, Language } from "@/types/article.types";
import { formatDate } from "@/utils/helpers.utils";

import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { articleService } from "@/services/article.service";

interface ArticleCardProps {
	article: TranslatedArticle["article"];
	languages: Language[];
	bg?: string;
	onDelete?: (articleId: string) => Promise<void> | void;
}

const ArticleCard = memo(function ArticleCard({
	article,
	bg = "bg-gray-100",
}: ArticleCardProps) {
	const [downloading, setDownloading] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(
				`${window.location.origin}/articles/${article.doc_id}`
			);
			// Optionally, show a toast or feedback here
			console.log("Link copied to clipboard!");
		} catch (err) {
			console.error("Failed to copy link:", err);
		}
	};

	const handleDownload = async () => {
		try {
			setDownloading(true);
			await articleService.downloadArticlePDF(article.doc_id, article.title);
			console.log("Downloading article:", article.title);
			// Add your download logic here
		} catch (error) {
			console.error("Download failed:", error);
		} finally {
			setDownloading(false);
		}
	};

	const handleDelete = async () => {
		// Optional: Add confirmation dialog
		if (!confirm(`Are you sure you want to delete "${article.title}"?`)) {
			return;
		}

		try {
			setDeleting(true);
			await articleService.deleteArticle(article.doc_id, "");
		} catch (error) {
			console.error("Delete failed:", error);
			// You might want to show a toast notification here
		} finally {
			setDeleting(false);
		}
	};

	const handleVisitOriginal = () => {
		window.open(article.original_url, "_blank", "noopener noreferrer");
	};

	const dateTime = formatDate(article.created_at);

	return (
		<article
			className={cn(
				"p-2 shadow-md rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-200",
				deleting && "opacity-50 pointer-events-none"
			)}>
			{/* Header Section */}
			<div
				className={cn(
					"flex justify-between items-center rounded-t-lg p-4 bg-gray-100 .border-b border-gray-300",
					bg
				)}>
				<div className='flex items-center gap-2'>
					<div className='h-8 w-8 border-4 border-white ring-1 ring-gray-200 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm'>
						<img
							src={`/icons/flags/${article.converted_lang}.svg`}
							alt={`${article.converted_lang} flag`}
							className='h-14 w-14 object-cover'
						/>
					</div>

					<p className='text-xs text-gray-700 font-grotesk font-semibold'>
						{dateTime}
					</p>
				</div>
				<div className='flex items-center gap-2'>
					{/* Language Badge */}
					<span className='px-2 py-1 bg-zinc-50 text-zinc-500 text-xs font-medium rounded-full border border-zinc-400 font-grotesk'>
						{article.converted_lang}
					</span>
				</div>
			</div>

			{/* Title Section */}
			<div
				className={cn(
					"h-[14rem] pt-4 px-4 bg-gray-100 overflow-hidden flex flex-col justify-between pb-3",
					bg
				)}>
				<h1 className='font-montserrat text-lg text-gray-600 leading-tight line-clamp-6'>
					{article.title}
				</h1>
				{article.author && (
					<p className='text-gray-400 text-sm font-grotesk mt-3'>
						by {article.author}
					</p>
				)}
			</div>

			{/* Action Buttons */}
			<div className='flex justify-between items-center gap-3 pt-4 pb-2 px-2'>
				<div className='flex gap-2 flex-1'>
					<a
						href={`/articles/${article.doc_id}`}
						className='bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-grotesk disabled:opacity-50 disabled:cursor-not-allowed'>
						<Eye className='w-4 h-4' />
						View
					</a>
				</div>

				<div className='flex items-center gap-2'>
					<span className='px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg border border-gray-300 font-grotesk'>
						PDF
					</span>

					{/* More Actions Dropdown - Using shadcn */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								disabled={deleting}
								className='bg-gray-50 hover:bg-gray-400 text-zinc-500 h-8 w-8 rounded-lg border border-gray-300 disabled:opacity-50'
								aria-label='More actions'>
								<MoreVertical className='w-4 h-4' />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent
							align='center'
							className='bg-white border-gray-300 rounded-lg min-w-[160px] shadow-lg'>
							<DropdownMenuItem
								onClick={handleDownload}
								disabled={downloading || deleting}
								className='text-gray-700 hover:bg-gray-50 focus:text-black hover:text-gray-700 focus:bg-gray-100 cursor-pointer font-grotesk disabled:opacity-50 disabled:cursor-not-allowed'>
								<Download className='w-4 h-4 mr-2' />
								{downloading ? "Downloading..." : "Download"}
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={handleCopy}
								disabled={deleting}
								className='text-gray-700 focus:text-black hover:bg-gray-100 focus:bg-gray-100 cursor-pointer font-grotesk disabled:opacity-50 disabled:cursor-not-allowed'>
								<Copy className='w-4 h-4 mr-2' />
								Copy Link
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={handleVisitOriginal}
								disabled={deleting}
								className='text-gray-700 focus:text-black hover:bg-gray-100 focus:bg-gray-100 cursor-pointer font-grotesk disabled:opacity-50 disabled:cursor-not-allowed'>
								<ExternalLink className='w-4 h-4 mr-2' />
								Visit Original
							</DropdownMenuItem>

							<>
								<DropdownMenuSeparator className='bg-gray-200' />
								<DropdownMenuItem
									onClick={handleDelete}
									disabled={deleting || downloading}
									className='text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 cursor-pointer font-grotesk disabled:opacity-50 disabled:cursor-not-allowed'>
									<Trash2 className='w-4 h-4 mr-2' />
									{deleting ? "Deleting..." : "Delete"}
								</DropdownMenuItem>
							</>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</article>
	);
});

export default ArticleCard;
