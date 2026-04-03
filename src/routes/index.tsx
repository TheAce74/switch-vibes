import { createFileRoute } from "@tanstack/react-router";
import AboutSection from "#/components/about-section";
import FaqsSection from "#/components/faqs-section";
import Footer from "#/components/footer";
import HeroSection from "#/components/hero-section";
import PerksSection from "#/components/perks-section";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<HeroSection />
			<AboutSection />
			<PerksSection />
			<FaqsSection />
			<Footer />
		</main>
	);
}
