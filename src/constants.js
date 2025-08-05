export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Add validation
if (!BASE_URL) {
	console.error('❌ VITE_BACKEND_URL is not defined!');
	console.log('Available env vars:', import.meta.env);
} else {
	console.log('✅ BASE_URL loaded:', BASE_URL);
}