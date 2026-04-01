import { Button } from "#/components/ui/button";

export function DefaultCatchBoundary({ error }: { error: Error }) {
	console.error("Error caught by boundary:", error);

	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
			<div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50/50 mb-8 border border-red-100">
				<svg
					className="h-12 w-12 text-red-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
			</div>
			<h1 className="mt-2 font-heading text-4xl font-bold tracking-tight text-text sm:text-5xl">
				Oops! Something went wrong.
			</h1>
			<p className="mt-5 max-w-lg text-lg text-text/70 font-sans">
				We apologize for the inconvenience. An unexpected error occurred while
				processing your request.
			</p>

			{process.env.NODE_ENV === "development" && (
				<div className="mt-8 text-left w-full max-w-2xl bg-bg-input p-5 rounded-2xl overflow-auto hidden md:block border border-bg-difference-1 shadow-sm">
					<p className="font-mono text-sm text-red-600 break-all font-semibold">
						Message: {error?.message || "Unknown Error"}
					</p>
					{error?.stack && (
						<pre className="mt-2 font-mono text-xs text-text/60 whitespace-pre-wrap">
							{error.stack}
						</pre>
					)}
				</div>
			)}

			<div className="mt-10">
				<Button variant="primary" onClick={() => window.location.assign("/")}>
					Return Home
				</Button>
			</div>
		</div>
	);
}
