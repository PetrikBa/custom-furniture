"use client";

import Image from "next/image";
import { motion } from "motion/react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const images = [1, 2, 3, 4, 5, 6].map((n) => ({ src: `${basePath}/ref${n}.jpg`, alt: `Reference ${n}` }));

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
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative aspect-square rounded-xl overflow-hidden bg-stone-100"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#1A202C] opacity-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
