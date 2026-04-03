"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import Logo from "#/assets/logo.svg?url";
import { Button } from "#/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "#/components/ui/sheet";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Perks", href: "/#perks" },
  { label: "FAQs", href: "/#faqs" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-bg/95 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-300 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/#hero" className="flex items-center">
          <img src={Logo} alt="SwitchVibes" className="h-5 w-auto" />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-medium transition-colors duration-200 hover:text-primary focus-visible:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>

        {/* Mobile Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <img src={Logo} alt="SwitchVibes" className="h-5 w-auto mt-1" />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <a
                      href={link.href}
                      className="flex w-full rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  }
                  nativeButton={false}
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
