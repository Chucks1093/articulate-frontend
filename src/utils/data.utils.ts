// data/mockData.ts
import {
	TranslatedArticle,
	Language,
	UserProfile,
} from "../types/article.types";

export const languages: Language[] = [
	{ code: "es", name: "Spanish" },
	{ code: "fr", name: "French" },
	{ code: "ja", name: "Japanese" },
	{ code: "de", name: "German" },
	{ code: "zh", name: "Chinese" },
	{ code: "it", name: "Italian" },
	{ code: "pt", name: "Portuguese" },
	{ code: "ru", name: "Russian" },
];

export const mockProfile: UserProfile = {
	username: "Alex Johnson",
	email: "alex@example.com",
	avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
};

export const mockArticles: TranslatedArticle[] = [
	{
		doc_id: "doc_7f8a9b2c1d3e4f5g6h7i8j9k",
		article: {
			id: "art_1a2b3c4d5e6f7g8h9i0j",
			doc_id: "doc_7f8a9b2c1d3e4f5g6h7i8j9k",
			title: "Cómo la Inteligencia Artificial está Transformando la Medicina",
			description:
				"Una mirada profunda a las innovaciones de IA que están revolucionando el sector sanitario mundial.",
			author: "Dr. Sarah Johnson",
			author_avatar:
				"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
			body: "# Cómo la Inteligencia Artificial está Transformando la Medicina\n\nLa inteligencia artificial (IA) está revolucionando el campo de la medicina de maneras que antes parecían imposibles...",
			original_url:
				"https://techcrunch.com/2024/how-ai-transforming-medicine",
			original_lang: "en",
			converted_lang: "es",
			published_at: "2024-01-15T10:30:00Z",
			created_at: "2024-01-15T14:22:33Z",
			user: "user_123abc456def789ghi",
		},
	},
	{
		doc_id: "doc_2k9l8m7n6o5p4q3r2s1t0u9v",
		article: {
			id: "art_2b3c4d5e6f7g8h9i0j1k",
			doc_id: "doc_2k9l8m7n6o5p4q3r2s1t0u9v",
			title: "L'avenir du Développement Durable dans l'Industrie Tech",
			description:
				"Comment les entreprises technologiques adoptent des pratiques durables pour un avenir plus vert.",
			author: "Prof. Michel Dubois",
			author_avatar:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
			body: "# L'avenir du Développement Durable dans l'Industrie Tech\n\nL'industrie technologique fait face à une pression croissante pour adopter des pratiques plus durables...",
			original_url:
				"https://www.wired.com/future-sustainable-development-tech",
			original_lang: "en",
			converted_lang: "fr",
			published_at: "2024-01-14T15:45:00Z",
			created_at: "2024-01-14T18:12:17Z",
			user: "user_456def789ghi012jkl",
		},
	},
	{
		doc_id: "doc_3x8w7v6u5t4s3r2q1p0o9n8m",
		article: {
			id: "art_3c4d5e6f7g8h9i0j1k2l",
			doc_id: "doc_3x8w7v6u5t4s3r2q1p0o9n8m",
			title: "クラウドコンピューティングの進化：2024年の展望",
			description:
				"企業がクラウド技術をどのように活用して競争優位性を獲得しているかを探る。",
			author: "Tech Insights Team",
			author_avatar: null,
			body: "# クラウドコンピューティングの進化：2024年の展望\n\nクラウドコンピューティングは、企業のデジタル変革の中核となっています...",
			original_url:
				"https://aws.amazon.com/blogs/enterprise-strategy/cloud-evolution-2024",
			original_lang: "en",
			converted_lang: "ja",
			published_at: "2024-01-13T09:20:00Z",
			created_at: "2024-01-13T11:55:42Z",
			user: "user_789ghi012jkl345mno",
		},
	},
	{
		doc_id: "doc_4m7l6k5j4i3h2g1f0e9d8c7b",
		article: {
			id: "art_4d5e6f7g8h9i0j1k2l3m",
			doc_id: "doc_4m7l6k5j4i3h2g1f0e9d8c7b",
			title: "Die Zukunft der Erneuerbaren Energien in Deutschland",
			description:
				"Analyse der deutschen Energiewende und ihrer Auswirkungen auf die europäische Energielandschaft.",
			author: "Dr. Klaus Weber",
			author_avatar:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
			body: "# Die Zukunft der Erneuerbaren Energien in Deutschland\n\nDeutschland steht an der Spitze der globalen Energiewende, mit ehrgeizigen Zielen...",
			original_url:
				"https://www.reuters.com/business/energy/future-renewable-energy-germany",
			original_lang: "en",
			converted_lang: "de",
			published_at: "2024-01-12T14:15:00Z",
			created_at: "2024-01-12T16:33:28Z",
			user: "user_012jkl345mno678pqr",
		},
	},
	{
		doc_id: "doc_5b6a9z8y7x6w5v4u3t2s1r0q",
		article: {
			id: "art_5e6f7g8h9i0j1k2l3m4n",
			doc_id: "doc_5b6a9z8y7x6w5v4u3t2s1r0q",
			title: "人工智能在教育领域的创新应用",
			description: "探索AI技术如何重塑现代教育体系，提供个性化学习体验。",
			author: "Dr. Li Wei",
			author_avatar:
				"https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400",
			body: "# 人工智能在教育领域的创新应用\n\n人工智能技术正在深刻改变教育行业的格局，为学生和教师带来前所未有的机遇...",
			original_url:
				"https://www.nature.com/articles/ai-innovation-education-2024",
			original_lang: "en",
			converted_lang: "zh",
			published_at: "2024-01-11T11:30:00Z",
			created_at: "2024-01-11T13:47:15Z",
			user: "user_345mno678pqr901stu",
		},
	},
	{
		doc_id: "doc_6p9o8n7m6l5k4j3i2h1g0f9e",
		article: {
			id: "art_6f7g8h9i0j1k2l3m4n5o",
			doc_id: "doc_6p9o8n7m6l5k4j3i2h1g0f9e",
			title: "Il Futuro della Blockchain nel Settore Finanziario",
			description:
				"Come la tecnologia blockchain sta rivoluzionando i servizi finanziari e le transazioni digitali.",
			author: "Marco Rossi",
			author_avatar:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
			body: "# Il Futuro della Blockchain nel Settore Finanziario\n\nLa tecnologia blockchain continua a trasformare il panorama finanziario globale...",
			original_url:
				"https://www.coindesk.com/business/blockchain-future-finance-2024",
			original_lang: "en",
			converted_lang: "it",
			published_at: "2024-01-10T16:20:00Z",
			created_at: "2024-01-10T18:02:51Z",
			user: "user_678pqr901stu234vwx",
		},
	},
];
