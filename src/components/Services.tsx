"use client";

import { motion } from "motion/react";

const services = [
  {
    icon: "🪵",
    title: "Custom Manufacturing",
    description: "Every piece of furniture is designed and built precisely to your requirements and space.",
  },
  {
    icon: "🚚",
    title: "Delivery",
    description: "We ensure safe delivery of finished furniture directly to your home.",
  },
  {
    icon: "🛠️",
    title: "Full Preparation",
    description: "Complete setup: we handle electricity, water, and drainage during installation.",
  },
  {
    icon: "🔧",
    title: "Full Installation",
    description: "We take care of complete assembly and installation at the destination.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-stone-50">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-stone-500 text-lg">From design to installation — everything under one roof.</p>
        </motion.div>

        <div className="grid gap-6 sm:gap-12 xl:gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="service-card rounded-2xl bg-white p-5 shadow-sm border border-stone-100 flex flex-col items-center text-center"
            >
              <span className="text-4xl mb-3">{service.icon}</span>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-stone-500 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
