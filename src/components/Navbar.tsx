"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sofa, Menu, X } from "lucide-react";
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

  const scrollTo = (href: string) => {
    href === "#home"
      ? window.scrollTo({ top: 0, behavior: "smooth" })
      : document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setActive(href);
    closeMenu();
  };

  return (
    <header
      className={`fixed py-2 top-0 left-0 right-0 z-50 transition-all duration-25 ${
        scrolled || menuOpen ? "bg-white/100 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-8 h-16 flex items-center justify-between gap-4 flex-nowrap">
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`${nunito.className} flex items-center gap-2 text-xl cursor-pointer whitespace-nowrap shrink-0 ${scrolled || menuOpen ? "text-stone-900" : "text-white"}`}
        >
          <Sofa className="w-6 h-6" />
          Custom Furniture Bulgaria
        </span>

        <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium transition-colors cursor-pointer relative ${
                  scrolled ? "text-stone-600 hover:text-stone-900" : "text-white/80 hover:text-white"
                } ${
                  active === link.href
                    ? `after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 ${scrolled ? "after:bg-stone-900" : "after:bg-white"}`
                    : ""
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => scrollTo("#contact")}
              className={`cursor-pointer transition-all ${
                active === "#contact"
                  ? scrolled
                    ? "bg-stone-900 text-white hover:bg-stone-800"
                    : "bg-white text-black ring-2 ring-white"
                  : "bg-white text-black hover:bg-white/90"
              }`}
            >
              Contact
            </Button>
          </nav>

        {/* Hamburger button */}
        <button
          className={`md:hidden p-2 rounded-md transition-colors ${scrolled || menuOpen ? "text-stone-900" : "text-white"}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur border-t border-stone-100 px-8 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-left text-sm font-medium py-1 transition-colors cursor-pointer ${
                active === link.href ? "text-stone-900 font-bold" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button size="sm" onClick={() => scrollTo("#contact")} className="self-start bg-stone-900 text-white hover:bg-stone-800 cursor-pointer">
            Contact
          </Button>
        </div>
      )}
    </header>
  );
}
