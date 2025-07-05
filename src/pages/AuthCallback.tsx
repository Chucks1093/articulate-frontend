import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { authService } from "@/services/auth.service";

export default function AuthCallback() {
	const [status, setStatus] = useState("Processing your sign-in...");
	const navigate = useNavigate();
	const hasProcessed = useRef(false); // Prevent duplicate processing
	const isProcessing = useRef(false); // Prevent concurrent calls

	useEffect(() => {
		const handleCallback = async () => {
			// Prevent multiple calls
			if (hasProcessed.current || isProcessing.current) {
				console.log("Callback already processed or in progress");
				return;
			}

			isProcessing.current = true;

			try {
				console.log("Processing auth callback (once)");
				const result = await authService.handleOAuthCallback();

				if (result.success) {
					hasProcessed.current = true;
					setStatus("Sign-in successful! Redirecting...");

					setTimeout(() => {
						navigate("/dashboard", { replace: true });
					}, 1000);
				} else {
					setStatus(`Sign-in failed: ${result.error}`);

					setTimeout(() => {
						navigate("/auth", { replace: true });
					}, 2000);
				}
			} catch (error) {
				console.error("Error handling OAuth callback:", error);
				setStatus("An error occurred during sign-in. Please try again.");

				setTimeout(() => {
					navigate("/auth", { replace: true });
				}, 2000);
			} finally {
				isProcessing.current = false;
			}
		};

		handleCallback();
	}, []); // Empty dependency array

	return (
		<div className='flex min-h-screen flex-col items-center justify-center p-4 h-full bg-app-primary noice'>
			<div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
				<div className='flex flex-col items-center justify-center'>
					<div className='mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600'></div>
					<p className='text-center text-gray-600 font-montserrat font-medium'>
						{status}
					</p>
				</div>
			</div>
		</div>
	);
}
