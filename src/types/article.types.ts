// types/article.types.ts

export interface TranslatedArticle {
	doc_id: string;
	article: {
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
	};
}

export interface Language {
	code: string;
	name: string;
}

export interface UserProfile {
	username: string;
	email: string;
	avatar: string;
}
