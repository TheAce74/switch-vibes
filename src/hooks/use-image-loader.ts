import { useEffect, useState } from "react";

export function useImageLoader(src: string) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setLoaded(false);
		setError(false);

		if (!src) return;

		const img = new Image();
		img.src = src;

		const handleLoad = () => setLoaded(true);
		const handleError = () => setError(true);

		img.addEventListener("load", handleLoad);
		img.addEventListener("error", handleError);

		// if already in cache the load event won't fire
		if (img.complete) {
			setLoaded(true);
		}

		return () => {
			img.removeEventListener("load", handleLoad);
			img.removeEventListener("error", handleError);
		};
	}, [src]);

	return { loaded, error };
}
