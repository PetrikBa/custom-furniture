"use client";

import { motion } from "motion/react";

// Sem neskôr nahraď skutočnými obrázkami v public/gallery/
const placeholders = [1, 2, 3, 4, 5, 6];

export default function Gallery() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Portfolio</h2>
          <p className="mt-4 text-stone-500 text-lg">A showcase of our completed projects.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {placeholders.map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="aspect-square rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center text-stone-400 text-sm"
            >
              {/* Nahraď: <Image src={`/gallery/${n}.jpg`} alt="Realizácia" fill className="object-cover" /> */}
              [ Photo {n} ]
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
