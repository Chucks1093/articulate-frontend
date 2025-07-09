// src/services/article.service.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/utils/env.utils";

// Request/Response types for Articulate API
export interface TranslationRequest {
	url: string;
	language: string;
	userId: string;
}

export interface Article {
	id: string;
	doc_id: string;
	title: string;
	description: string | null;
	author: string;
	author_avatar: string | null;
	body: string;
	original_url: string;
	original_lang: string;
	converted_lang: string;
	published_at: string | null;
	created_at: string;
	user: string;
}

export interface TranslatedArticle {
	doc_id: string;
	article: Article;
}

export interface TranslationResponse {
	doc_id: string;
	article: Article;
}

export interface ErrorResponse {
	error: string;
}

// Database types for Supabase
export interface ArticleDatabase {
	id?: string;
	doc_id: string;
	title: string;
	description?: string | null;
	author: string;
	author_avatar?: string | null;
	body: string;
	original_url: string;
	original_lang: string;
	converted_lang: string;
	published_at?: string | null;
	created_at?: string;
	user_id: string;
	is_bookmarked?: boolean;
}

export interface ArticleStats {
	user_id: string;
	total_articles: number;
	total_languages: number;
	recent_articles: number;
	bookmarked_articles: number;
}

export interface LanguageStats {
	language: string;
	count: number;
}

// Pagination types
export interface PaginationParams {
	page: number;
	limit: number;
	userId: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}

class ArticleService {
	private supabase: SupabaseClient;
	private API_BASE_URL: string;

	constructor() {
		const supabaseUrl = env.VITE_SUPABASE_URL;
		const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;
		this.API_BASE_URL = env.API_BASE_URL;

		this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
			auth: {
				persistSession: true,
				autoRefreshToken: true,
			},
		});
	}

	/**
	 * Translate an article from URL to target language
	 */
	async translateArticle(
		request: TranslationRequest
	): Promise<TranslationResponse> {
		try {
			const response = await fetch(`${this.API_BASE_URL}/translations`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Translation failed");
			}

			const result = await response.json();

			return result;
		} catch (error) {
			console.error("Translation error:", error);
			throw error;
		}
	}

	/**
	 * Download article as PDF
	 */
	async downloadArticlePDF(
		docId: string,
		articleTitle?: string
	): Promise<Blob> {
		try {
			const response = await fetch(`${this.API_BASE_URL}/docs/${docId}`);

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "PDF download failed");
			}

			const blob = await response.blob();

			// Create download link
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;

			// Get filename from Content-Disposition header or use article title
			const contentDisposition = response.headers.get("Content-Disposition");
			const filename = contentDisposition
				? contentDisposition.split("filename=")[1].replace(/"/g, "")
				: `${articleTitle || "article"}-${docId}.pdf`;

			a.download = filename;
			document.body.appendChild(a);
			a.click();

			// Clean up
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);

			return blob;
		} catch (error) {
			console.error("PDF download error:", error);
			throw error;
		}
	}

	async getArticlesByDocId(docId: string): Promise<Article> {
		const { data, error } = await this.supabase
			.from("articles")
			.select("*")
			.eq("doc_id", docId)
			.single();

		if (error) {
			console.error("Error fetching articles:", error);
			throw error;
		}

		// Transform database format to API format
		return data;
	}

	/**
	 * Get articles with pagination from Supabase
	 */
	async getAllArticles(
		params: PaginationParams
	): Promise<PaginatedResponse<Article>> {
		const { page, limit, userId } = params;
		const from = (page - 1) * limit;
		const to = from + limit - 1;

		// Get total count
		const { count } = await this.supabase
			.from("articles")
			.select("*", { count: "exact", head: true })
			.eq("user_id", userId);

		// Get paginated data
		const { data, error } = await this.supabase
			.from("articles")
			.select("*")
			.order("created_at", { ascending: false })
			.range(from, to);

		if (error) {
			console.error("Error fetching articles:", error);
			throw error;
		}

		const total = count || 0;
		const totalPages = Math.ceil(total / limit);

		return {
			data: data || [],
			pagination: {
				page,
				limit,
				total,
				totalPages,
				hasNext: page < totalPages,
				hasPrev: page > 1,
			},
		};
	}

	/**
	 * Delete an article
	 */
	async deleteArticle(docId: string, userId: string): Promise<void> {
		const { error } = await this.supabase
			.from("articles")
			.delete()
			.eq("doc_id", docId)
			.eq("user_id", userId);

		if (error) {
			console.error("Error deleting article:", error);
			throw error;
		}
	}

	/**
	 * Complete workflow: Translate article and optionally download PDF
	 */
	async translateAndProcess(
		url: string,
		language: string,
		userId: string,
		autoDownload: boolean = false
	): Promise<TranslationResponse> {
		try {
			// Step 1: Translate the article
			const translation = await this.translateArticle({
				url,
				language,
				userId,
			});

			// Step 2: Optionally download the PDF
			if (autoDownload) {
				await this.downloadArticlePDF(
					translation.doc_id,
					translation.article.title
				);
			}

			return translation;
		} catch (error) {
			console.error("Translate and process error:", error);
			throw error;
		}
	}
}

export const articleService = new ArticleService();
