import { redirect } from "react-router";
import { authService } from "@/services/auth.service";
import showToast from "@/utils/toast.utils";

export async function requireAuth() {
	try {
		const user = await authService.getCurrentUser();

		if (!user.authenticated) {
			return redirect("/auth");
		}

		return { user };
	} catch (error) {
		console.error("Auth check failed:", error);
		showToast.error("An authentication error occurred");
		return redirect("/auth");
	}
}
