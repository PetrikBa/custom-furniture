"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

const reasons = [
  { stat: "10+", label: "years of experience" },
  { stat: "500+", label: "happy customers" },
  { stat: "5 yr.", label: "product warranty" },
  { stat: "100%", label: "made in Bulgaria" },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-stone-900 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <Badge variant="outline" className="text-white border-white/30 mb-4">
            Why Us
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Quality you can trust
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {reasons.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-5xl font-bold text-white mb-2">{item.stat}</span>
              <span className="text-stone-400 text-sm">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
