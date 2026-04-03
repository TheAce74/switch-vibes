import Illustration1 from "#/assets/about-illustration-1.svg?url";
import Illustration2 from "#/assets/about-illustration-2.svg?url";
import Illustration3 from "#/assets/about-illustration-3.svg?url";
import Illustration4 from "#/assets/about-illustration-4.svg?url";
import IllustrationApple from "#/assets/about-illustration-apple.svg?url";
import VibeSection from "#/components/layout/vibe-section";
import { cn } from "#/lib/utils";

const SMALL_FEATURES = [
	{
		id: "unlimited-playlist-size",
		title: "Unlimited Playlist Size",
		description:
			"Unlike other services, we don't restrict you with limitations on the number of tracks you can migrate from your playlists. Whether you have 50 or 5000 songs in your playlist, SwitchVibes allows you to transfer them all at once.",
		image: Illustration1,
		bgClass: "bg-bg-difference-1 text-black",
		imgClass: "w-[45%]",
	},
	{
		id: "no-account-access-required",
		title: "No Account Access Required",
		description:
			"We value your privacy and security. We don't require access to your source and destination platform accounts. Simply provide the playlist link, and we'll take care of the rest.",
		image: Illustration2,
		bgClass: "bg-bg-difference-2 text-white",
		imgClass: "w-[55%]",
	},
	{
		id: "intuitive-interface",
		title: "Intuitive Interface",
		description:
			"We believe that simplicity is key. Our user-friendly interface makes it easy for anyone to jump right in and go straight to doing what matters.",
		image: Illustration3,
		bgClass: "bg-bg-difference-3 text-white",
		imgClass: "w-[50%]",
	},
	{
		id: "intelligent-song-matching",
		title: "Intelligent Song Matching",
		description:
			"Our intelligent track matching algorithms ensure precise track finding, preserving the integrity of your playlists during the migration process.",
		image: Illustration4,
		bgClass: "bg-bg-difference-4 text-white",
		imgClass: "w-[55%]",
	},
];

export default function AboutSection() {
	return (
		<VibeSection id="about" className="flex flex-col gap-6 md:gap-10">
			{/* Heading */}
			<h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight lg:text-5xl">
				What Sets Us Apart
			</h2>

			{/* Features Grid */}
			<ul className="grid gap-6 lg:gap-8 md:grid-cols-2">
				{SMALL_FEATURES.map((feature) => (
					<li
						key={feature.id}
						className={cn(
							"relative md:min-h-75 min-h-70 overflow-hidden rounded-3xl p-8 sm:p-10 transition-transform duration-300 hover:scale-[1.01]",
							feature.bgClass,
						)}
					>
						<div className="relative z-10 flex flex-col gap-2 md:max-w-62.5 max-w-75 lg:max-w-75">
							<h3 className="font-heading text-lg md:text-xl font-bold leading-tight lg:text-2xl">
								{feature.title}
							</h3>
							<p className="text-sm opacity-80 sm:text-base leading-relaxed">
								{feature.description}
							</p>
						</div>
						<img
							src={feature.image}
							alt=""
							className={cn(
								"absolute object-contain pointer-events-none xl:w-[40%] bottom-0 right-0",
								feature.imgClass,
							)}
						/>
					</li>
				))}

				{/* Apple Music Banner */}
				<li className="relative md:col-span-2 min-h-100 overflow-hidden rounded-3xl bg-bg-difference-3 p-10 sm:p-16 xl:px-32 flex flex-col lg:flex-row items-center justify-between gap-12 transition-transform duration-300 hover:scale-[1.005]">
					<div className="relative z-10 flex flex-col gap-8 lg:gap-12 w-full lg:w-auto">
						<div className="flex flex-col">
							<h3 className="font-heading text-[5rem] sm:text-[7rem] lg:text-[8.5rem] font-bold leading-[0.85] tracking-tighter bg-linear-to-r from-[#5E9FF5] to-[#786CFF] bg-clip-text text-transparent">
								Apple
								<br />
								Music
							</h3>
						</div>
						<p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-bg-difference-4">
							Coming soon
						</p>
					</div>

					<div className="relative w-full aspect-square max-w-[320px] sm:max-w-100 md:max-w-112.5">
						<img
							src={IllustrationApple}
							alt="Apple Music Support"
							className="h-full w-full object-contain drop-shadow-2xl"
						/>
					</div>
				</li>
			</ul>
		</VibeSection>
	);
}
