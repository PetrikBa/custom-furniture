export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-10 no-dark-mode">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="font-semibold text-white">Custom Furniture s.r.o.</p>
        <p>VAT: BG12345678 · Sofia, Bulgaria</p>
        <p>© {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  );
}
