"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sofa, Menu, X, Moon } from "lucide-react";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["900"] });

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = () => setMenuOpen(false);

  const allIds = [...links.map((l) => l.href.slice(1)), "contact"];

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60);
      const current = [...allIds].reverse().find((id) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top <= window.innerHeight * 0.45;
      });
      setActive(current ? `#${current}` : "#home");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme ? savedTheme === "dark" : prefersDark;

    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode, themeLoaded]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!headerRef.current?.contains(target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    href === "#home"
      ? window.scrollTo({ top: 0, behavior: "smooth" })
      : document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setActive(href);
    closeMenu();
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const headerClass = `fixed py-2 top-0 left-0 right-0 z-50 transition-all duration-25 ${
    scrolled || menuOpen
      ? "bg-white/100 backdrop-blur shadow-sm dark:bg-stone-900"
      : "bg-transparent dark:bg-stone-800"
  }`;

  const linkClass = (href: string) => `text-sm font-medium transition-colors cursor-pointer relative ${
    scrolled
      ? "text-stone-600 hover:text-stone-900 dark:text-white dark:hover:text-gray-300"
      : "text-white/80 hover:text-white"
  } ${
    active === href
      ? `after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 ${
          scrolled ? "after:bg-stone-900 dark:after:bg-white" : "after:bg-white"
        }`
      : ""
  }`;

  return (
    <header ref={headerRef} className={headerClass}>
      <div className="mx-auto max-w-6xl px-8 h-16 flex items-center justify-between gap-4 flex-nowrap">
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`${nunito.className} flex items-center gap-2 text-xl cursor-pointer whitespace-nowrap shrink-0 ${
            scrolled || menuOpen ? "text-stone-900 dark:text-white" : "text-white"
          }`}
        >
          <Sofa className="w-6 h-6" />
          Custom Furniture Bulgaria
        </span>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={linkClass(link.href)}
            >
              {link.label}
            </button>
          ))}
          <Button
            size="icon"
            onClick={toggleDarkMode}
            variant="ghost"
            className={`cursor-pointer rounded-full ${
              scrolled ? "text-stone-700 hover:bg-stone-100 dark:text-white dark:hover:bg-white/10" : "text-white hover:bg-white/15"
            }`}
            aria-label="Toggle Dark Mode"
          >
            <Moon className="w-5 h-5" />
          </Button>
          <Button
            size="sm"
            onClick={() => scrollTo("#contact")}
            className={`cursor-pointer transition-all ${
              active === "#contact"
                ? scrolled
                  ? "bg-stone-900 text-white hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                  : "bg-white text-black ring-2 ring-white"
                : "bg-white text-black hover:bg-white/90 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            }`}
          >
            Contact
          </Button>
        </nav>

        {/* Hamburger button */}
        <button
          className={`md:hidden p-2 rounded-md transition-colors ${
            scrolled || menuOpen ? "text-stone-900 dark:text-white" : "text-white"
          }`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-8 py-4 flex flex-col gap-4 border-t transition-colors bg-white/95 text-stone-600 border-stone-100 dark:bg-stone-900 dark:text-white dark:border-stone-700">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-left text-sm font-medium py-1 transition-colors cursor-pointer ${
                active === link.href
                  ? "text-stone-900 font-bold dark:text-white"
                  : "text-stone-600 hover:text-stone-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleDarkMode}
            className="self-start cursor-pointer text-stone-700 hover:bg-stone-100 dark:text-white dark:hover:bg-white/10"
            aria-label="Toggle Dark Mode"
          >
            <Moon className="w-4 h-4 mr-2" />
            Dark mode
          </Button>
          <Button
            size="sm"
            onClick={() => scrollTo("#contact")}
            className={`self-start cursor-pointer transition-all ${
              active === "#contact"
                ? "bg-stone-900 text-white hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                : "bg-stone-900 text-white hover:bg-stone-800 dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
          >
            Contact
          </Button>
        </div>
      )}
    </header>
  );
}
