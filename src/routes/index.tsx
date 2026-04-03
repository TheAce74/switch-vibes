import { createFileRoute } from "@tanstack/react-router";
import AboutSection from "#/components/about-section";
import HeroSection from "#/components/hero-section";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<HeroSection />
			<AboutSection />
		</main>
	);
}
