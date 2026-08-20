"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HardHat } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Find Labour", href: "/find-labour" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-20  items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-blue-950 text-white">
            <HardHat className="size-5" />
          </div>
          <div className="leading-tight">
            <p className="font-heading text-lg font-bold text-blue-950 dark:text-white">
              Shromik
            </p>
            <p className="text-[11px] text-muted-foreground">
              Service for People
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  isActive
                    ? "text-blue-950 after:absolute after:-bottom-6.5 after:left-0 after:h-0.5 after:w-full after:bg-blue-950 dark:text-white dark:after:bg-white"
                    : "text-muted-foreground hover:text-blue-950 dark:hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Button
          className="bg-blue-950 text-white hover:bg-blue-900"
          size="lg"
          render={<Link href="/#how-it-works" />}
          nativeButton={false}
        >
          Request Labour
        </Button>
      </div>
    </header>
  );
}
