export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-10">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="font-semibold text-white">Custom Furniture ltd.</p>
        <p>VAT: 12345678 · Emona 5 , Byala, Bulgaria</p>
        <p>© {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  );
}
