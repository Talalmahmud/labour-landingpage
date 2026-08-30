"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HardHat, Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cloudinaryUrl } from "@/lib/cloudinary-url";
import type { SiteContent } from "@/lib/content-types";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Hire", href: "/labour-request" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

interface NavbarProps {
  content?: SiteContent["siteSettings"];
}

export function Navbar({ content }: NavbarProps) {
  const pathname = usePathname();
  const siteName = content?.siteName ?? "Shromik";
  const tagline = content?.tagline ?? "Service for People";

  const logo = content?.logoPublicId ? (
    <Image
      src={cloudinaryUrl(content.logoPublicId, "f_auto,q_auto,w_96,h_96,c_fit")}
      alt={siteName}
      width={36}
      height={36}
      className="size-9 shrink-0 rounded-lg object-contain"
    />
  ) : (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-950 text-white">
      <HardHat className="size-5" />
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          {logo}
          <div className="hidden min-w-0 leading-tight md:block">
            <p className="truncate font-heading text-lg font-bold text-blue-950 dark:text-white">
              {siteName}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {tagline}
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

        <div className="flex items-center gap-2">
          <Button
            className="hidden bg-blue-950 text-white hover:bg-blue-900 sm:inline-flex"
            size="lg"
            render={<Link href="/#how-it-works" />}
            nativeButton={false}
          >
            Request Labour
          </Button>

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border text-blue-950 transition-colors hover:bg-muted lg:hidden dark:text-white"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle className="flex min-w-0 items-center gap-2.5 text-base">
                  {logo}
                  <span className="truncate">{siteName}</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {links.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <SheetClose
                      key={link.label}
                      render={<Link href={link.href} />}
                      nativeButton={false}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-950 dark:bg-blue-900/30 dark:text-white"
                          : "text-muted-foreground hover:bg-muted hover:text-blue-950 dark:hover:text-white",
                      )}
                    >
                      {link.label}
                    </SheetClose>
                  );
                })}
              </nav>

              <SheetFooter>
                <SheetClose
                  render={<Link href="/#how-it-works" />}
                  nativeButton={false}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full bg-blue-950 text-white hover:bg-blue-900",
                  )}
                >
                  Request Labour
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
