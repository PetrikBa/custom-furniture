"use client";

import Image from "next/image";
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
              We are a family business in crafting bespoke furniture. Every project is a challenge 
              to create something unique that fits perfectly into your apartment.
            </p>
            <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed">
              <span className="font-semibold text-stone-900 dark:text-white">Delivered and installed in record time.</span> We use quality materials, pay attention to 
              detail, and guarantee the satisfaction of every customer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/workshop.jpg`}
              alt="Our workshop"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#1A202C] opacity-25 rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
