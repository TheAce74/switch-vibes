import { Github } from "lucide-react";
import { motion } from "motion/react";
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
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto w-full max-w-300 px-4 md:px-6 lg:px-8 py-12 md:py-16 flex flex-col gap-5"
      >
        {/* Top Branding & Nav */}
        <div className="flex flex-col gap-8">
          <motion.a
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="/#hero"
            className="inline-block transform-gpu transition-opacity hover:opacity-80"
          >
            <img src={Logo} alt="SwitchVibes" className="h-7 w-auto" />
          </motion.a>

          <nav>
            <ul className="flex flex-wrap items-center gap-x-12 gap-y-4">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  key={link.label}
                >
                  <a
                    href={link.href}
                    className="text-base font-medium transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </motion.li>
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
                  className="flex items-center gap-1.5 text-xs font-medium text-[#92989F] transition-colors hover:text-foreground focus-visible:text-foreground hover:underline underline-offset-4"
                >
                  <Github className="size-3.5 shrink-0" />
                  {repo.label}
                </a>
                {i < GITHUB_REPOS.length - 1 && (
                  <span className="h-3 w-px bg-[#92989F]" />
                )}
              </div>
            ))}
          </div>

          {/* Strategic Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30 md:text-right"
          >
            Open Source & Transparency First
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
}
