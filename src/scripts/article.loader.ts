import { redirect } from "react-router";
import { Article, articleService } from "@/services/article.service";
import { authService } from "@/services/auth.service";
import { Profile } from "@/hooks/useProfileStore";

interface ArticleParams {
	params: {
		docId?: string;
	};
}

export interface ArticleLoaderResponse {
	user: Profile;
	article: Article | null;
	isValid: boolean;
	error?: string;
}

export async function getArticleDetails({
	params,
}: ArticleParams): Promise<ArticleLoaderResponse> {
	try {
		// Always check authentication first (but don't require it)
		const user = await authService.getCurrentUser();

		// Extract the document ID from params
		const docId = params.docId;

		// Handle missing document ID
		if (!docId) {
			return {
				user: {
					authenticated: user.authenticated,
					...user,
				},
				article: null,
				isValid: false,
				error: "Document ID is missing from the URL",
			};
		}

		// Try to get article data regardless of authentication status
		const articleData = await articleService.getArticlesByDocId(docId);

		// Validate article data
		if (!articleData || !articleData.id) {
			return {
				user: {
					authenticated: user.authenticated,
					...user,
				},
				article: null,
				isValid: false,
				error: "Article not found or has been removed",
			};
		}

		// Article is publicly viewable - return success
		return {
			user: {
				authenticated: user.authenticated,
				...user,
			},
			article: {
				...articleData,
			},
			isValid: true,
		};
	} catch (error) {
		console.error("Failed to load article details:", error);

		// Critical error - redirect to dashboard
		// This handles cases where the auth service itself fails
		redirect("/");
		throw new Response("Failed to load article", {
			status: 500,
			statusText: "Internal Server Error",
		});
	}
}
