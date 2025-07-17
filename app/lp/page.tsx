import BentoGrid from "./components/bento-grid";
import CallToAction from "./components/call-to-action";
import Footer from "./components/footer";
import Header from "./components/header";
import HeroSection from "./components/hero-section";
import Plans from "./components/plans";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen container max-w-7xl mx-auto space-y-20">
			<Header />
			<HeroSection />
			<BentoGrid />
			<Plans />
			<CallToAction />
			<Footer />
		</div>
	);
}
