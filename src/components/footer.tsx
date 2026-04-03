import Logo from "#/assets/logo.svg?url";

const NAV_LINKS = [
	{ label: "About", href: "/#about" },
	{ label: "Perks", href: "/#perks" },
	{ label: "FAQs", href: "/#faqs" },
] as const;

const GITHUB_REPOS = [
	{ label: "Frontend", href: "https://github.com/TheAce74/switch-vibes" },
	{ label: "Backend", href: "https://github.com/Onyenso/Switch-Vibes" },
] as const;

export default function Footer() {
	return (
		<footer className="w-full bg-bg">
			<div className="mx-auto w-full max-w-300 px-4 md:px-6 lg:px-8 py-12 md:py-16 flex flex-col gap-5">
				{/* Top Branding & Nav */}
				<div className="flex flex-col gap-8">
					<a
						href="/#hero"
						className="inline-block transform-gpu transition-opacity hover:opacity-80"
					>
						<img src={Logo} alt="SwitchVibes" className="h-7 w-auto" />
					</a>

					<nav>
						<ul className="flex flex-wrap items-center gap-x-12 gap-y-4">
							{NAV_LINKS.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-base font-medium transition-colors duration-200 hover:text-primary"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{/* Divider */}
				<div className="h-px w-full bg-[#71777D]" />

				{/* Bottom Links & Tagline */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					{/* GitHub Repos */}
					<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
						{GITHUB_REPOS.map((repo, i) => (
							<div key={repo.href} className="flex items-center gap-4">
								<a
									href={repo.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-xs font-medium text-[#92989F] transition-colors hover:text-foreground focus-visible:text-foreground"
								>
									{repo.label}
								</a>
								{i < GITHUB_REPOS.length - 1 && (
									<span className="h-3 w-px bg-[#92989F]" />
								)}
							</div>
						))}
					</div>

					{/* Strategic Text */}
					<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30 md:text-right">
						Open Source & Transparency First
					</p>
				</div>
			</div>
		</footer>
	);
}
