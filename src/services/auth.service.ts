// src/service/auth.service.ts
import {
	createClient,
	SupabaseClient,
	Session,
	AuthChangeEvent,
	User,
} from "@supabase/supabase-js";
import { env } from "@/utils/env.utils";
import Cookies from "js-cookie";
import showToast from "@/utils/toast.utils";
// import { stripe } from "@/utils/stipe.utils";

class AuthService {
	private supabase: SupabaseClient;
	public isAdmin = false;

	constructor() {
		const supabaseUrl = env.VITE_SUPABASE_URL;
		const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

		this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
			auth: {
				persistSession: true, // This enables Supabase to handle session persistence
				autoRefreshToken: true, // Automatically refresh tokens
			},
		});
	}

	private async handleOAuthSignIn(user: User) {
		try {
			// Check if profile already exists
			console.log(user);
			const { data: existingProfile } = await this.supabase
				.from("profile")
				.select("*")
				.eq("email", user.email)
				.single();

			console.log(existingProfile);

			// If profile exists, just update the session cookies
			if (existingProfile) {
				const {
					data: { session },
				} = await this.supabase.auth.getSession();
				if (session) {
					this.saveSessionToCookies(session);
				}
				console.log("I am an existing user");
				return;
			}

			// Extract user information from Google OAuth response
			const email = user.email || "";
			const username =
				email.split("@")[0] || `user_${user.id.substring(0, 8)}`;

			// // Create Stripe customer
			// const customer = await stripe.customers.create({
			// 	email: email,
			// 	name: fullName,
			// 	metadata: {
			// 		source: "google_signup",
			// 		user_id: user.id,
			// 	},
			// });

			// Create profile in the database
			const { error: profileError } = await this.supabase
				.from("profile")
				.insert({
					id: user.id,
					username: username,
					email: email,
					avatar:
						user.user_metadata?.avatar_url ||
						`${env.VITE_SUPABASE_URL}/storage/v1/object/public/content/avatars/avatar.png`,
					updated_at: new Date().toISOString(),
				});

			if (profileError) throw profileError;

			// // Update user with customer ID in auth metadata
			// await this.supabase.auth.updateUser({
			// 	data: {
			// 		customer_id: customer.id,
			// 		username: username,
			// 	},
			// });

			showToast.message("Account created successfully");
		} catch (error) {
			console.error("Error handling OAuth sign-in:", error);
		}
	}

	// Get current session
	async getSession(): Promise<Session | null> {
		const {
			data: { session },
		} = await this.supabase.auth.getSession();
		return session;
	}

	// Get user profile
	async getUserProfile(userId: string) {
		const { data, error } = await this.supabase
			.from("User")
			.select("*")
			.eq("id", userId)
			.single();

		if (error) throw error;
		return data;
	}

	// Helper method to save session to cookies
	private saveSessionToCookies(session: Session) {
		// Parse the access token expiration
		const accessTokenExpiry = session.expires_at
			? new Date(session.expires_at * 1000)
			: new Date(Date.now() + 60 * 60 * 1000); // Fallback: 1 hour

		// Set refresh token to expire in 60 days
		const refreshTokenExpiry = new Date(
			Date.now() + 60 * 24 * 60 * 60 * 1000
		); // 60 days

		// Set cookies
		Cookies.set("nora--accessToken", session.access_token, {
			expires: accessTokenExpiry,
		});

		Cookies.set("nora--refreshToken", session.refresh_token, {
			expires: refreshTokenExpiry,
		});

		console.log("Saved session tokens to cookies");
	}

	// Get current user
	async getCurrentUser() {
		try {
			// Get the session directly from Supabase
			const {
				data: { session },
				error: sessionError,
			} = await this.supabase.auth.getSession();

			if (sessionError) throw sessionError;

			if (!session) {
				return {
					success: false,
					authenticated: false,
					message: "No active session found",
				};
			}

			// Get the user
			const {
				data: { user },
				error: userError,
			} = await this.supabase.auth.getUser();

			if (userError || !user) {
				return {
					success: false,
					authenticated: false,
					message: "User not found",
				};
			}

			// Get user profile
			const { data: profile, error: profileError } = await this.supabase
				.from("profile")
				.select("*")
				.eq("id", user.id)
				.single();

			if (profileError) {
				return {
					success: false,
					authenticated: true, // User is authenticated but profile not found
					message: "Profile not found",
				};
			}

			// Ensure cookies are up to date
			if (session) {
				this.saveSessionToCookies(session);
			}

			return {
				success: true,
				authenticated: true,
				...profile,
			};
		} catch (error) {
			console.error("Error in getCurrentUser:", error);
			return {
				success: false,
				authenticated: false,
				message: "Failed to get user information",
			};
		}
	}

	// Check if username is available
	async isUsernameAvailable(username: string) {
		const { data, error } = await this.supabase
			.from("User")
			.select("username")
			.eq("username", username)
			.limit(1);

		if (error) throw error;
		return data.length === 0;
	}

	// Sign in with Google
	async signInWithGoogle() {
		return this.supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});
	}

	async handleOAuthCallback() {
		const { data, error } = await this.supabase.auth.getSession();

		if (error) {
			console.error("Error getting session:", error);
			return {
				success: false,
				error: error.message,
			};
		}

		if (data.session) {
			// Save session to cookies
			await this.handleOAuthSignIn(data.session.user);
			await this.saveSessionToCookies(data.session);
			showToast.message("Logged in successfully");

			return {
				success: true,
				user: data.session.user,
			};
		}

		return {
			success: false,
			error: "No session found",
		};
	}

	// Use the proper type for the callback parameter
	onAuthStateChange(
		callback: (event: AuthChangeEvent, session: Session | null) => void
	) {
		return this.supabase.auth.onAuthStateChange(callback);
	}

	// Sign out
	async signOut() {
		// Sign out from Supabase
		const { error } = await this.supabase.auth.signOut();
		if (error) throw error;

		showToast.message("Logged out successfully");
		return true;
	}
}

export const authService = new AuthService();
