import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="font-heading text-9xl font-bold bg-linear-to-br from-bg-difference-2 to-bg-difference-4 bg-clip-text text-transparent opacity-90">
        404
      </h1>
      <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
        Page Not Found
      </h2>
      <p className="mt-4 max-w-lg text-lg text-text/70 font-sans">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved or doesn't exist.
      </p>
      <div className="mt-10">
        <Link
          to="/"
          className="rounded-full bg-text px-8 py-3.5 text-sm font-semibold text-bg shadow-sm hover:bg-bg-difference-2 transition-all duration-300 transform hover:-translate-y-1"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
