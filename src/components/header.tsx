import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<header className="border-b px-4 py-4 w-full">
			<nav className="flex items-center gap-4 max-w-7xl mx-auto">
				<Link to="/" className="font-bold text-lg">
					Switch Vibes
				</Link>
			</nav>
		</header>
	);
}
