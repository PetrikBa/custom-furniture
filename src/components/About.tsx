"use client";

import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              About Us
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-4">
              We are a family business with over 10 years of tradition in crafting bespoke furniture.
              Every project is a challenge to create something unique that fits perfectly
              into your home.
            </p>
            <p className="text-stone-600 text-lg leading-relaxed">
              We use quality materials, pay attention to detail, and guarantee the satisfaction
              of every customer. Our workshop is based in Sofia, with delivery across Bulgaria.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100"
          >
            {/* Sem vlož svoju fotku dielne — nahraď placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm">
              [ Workshop photo ]
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
