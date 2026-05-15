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
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const headerClass = `fixed py-2 top-0 left-0 right-0 z-50 transition-all duration-25 ${
    scrolled || menuOpen
      ? darkMode
        ? "bg-stone-900 text-white"
        : "bg-white/100 backdrop-blur shadow-sm"
      : darkMode
      ? "bg-stone-800 text-white"
      : "bg-transparent dark:bg-stone-900"
  }`;

  const linkClass = (href: string) => `text-sm font-medium transition-colors cursor-pointer relative ${
    scrolled
      ? darkMode
        ? "text-white hover:text-gray-300"
        : "text-stone-600 hover:text-stone-900"
      : darkMode
      ? "text-gray-300 hover:text-white"
      : "text-white/80 hover:text-white"
  } ${
    active === href
      ? `after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 ${
          scrolled
            ? darkMode
              ? "after:bg-white"
              : "after:bg-stone-900"
            : darkMode
            ? "after:bg-white"
            : "after:bg-white"
        }`
      : ""
  }`;

  return (
    <header ref={headerRef} className={headerClass}>
      <div className="mx-auto max-w-6xl px-8 h-16 flex items-center justify-between gap-4 flex-nowrap">
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`${nunito.className} flex items-center gap-2 text-xl cursor-pointer whitespace-nowrap shrink-0 ${
            scrolled || menuOpen
              ? darkMode
                ? "text-white"
                : "text-stone-900"
              : darkMode
              ? "text-white"
              : "text-white"
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
              darkMode ? "text-white hover:bg-white/10" : scrolled ? "text-stone-700 hover:bg-stone-100" : "text-white hover:bg-white/15"
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
                  ? darkMode
                    ? "bg-white text-black hover:bg-gray-300"
                    : "bg-stone-900 text-white hover:bg-stone-800"
                  : darkMode
                  ? "bg-white text-black ring-2 ring-white"
                  : "bg-white text-black ring-2 ring-white"
                : darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            Contact
          </Button>
        </nav>

        {/* Hamburger button */}
        <button
          className={`md:hidden p-2 rounded-md transition-colors ${
            scrolled || menuOpen
              ? darkMode
                ? "text-white"
                : "text-stone-900"
              : darkMode
              ? "text-white"
              : "text-white"
          }`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden px-8 py-4 flex flex-col gap-4 border-t transition-colors ${
          darkMode
            ? "bg-stone-900 text-white border-stone-700"
            : "bg-white/95 text-stone-600 border-stone-100"
        }`}>
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-left text-sm font-medium py-1 transition-colors cursor-pointer ${
                active === link.href
                  ? darkMode
                    ? "text-white font-bold"
                    : "text-stone-900 font-bold"
                  : darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleDarkMode}
            className={`self-start cursor-pointer ${darkMode ? "text-white hover:bg-white/10" : "text-stone-700 hover:bg-stone-100"}`}
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
                ? darkMode
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-stone-900 text-white hover:bg-stone-800"
                : darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-stone-900 text-white hover:bg-stone-800"
            }`}
          >
            Contact
          </Button>
        </div>
      )}
    </header>
  );
}
