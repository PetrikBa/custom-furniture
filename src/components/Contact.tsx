"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid e-mail"),
  phone: z.string().optional().or(z.literal("")),
  message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/maqvrwre", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-stone-50 dark:bg-stone-900">
      <div className="mx-auto max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">Contact</h2>
          <p className="mt-4 text-stone-500 dark:text-stone-400 text-lg">
            Send us an enquiry — we reply within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-sm border border-stone-100 dark:border-stone-700"
        >
          {Object.keys(errors).length > 0 && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-300 text-sm font-medium">Please fix the errors below:</p>
            </div>
          )}
          
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-white">Full name *</Label>
              <Input 
                id="name" 
                placeholder="John Smith" 
                className="dark:bg-stone-700 dark:border-stone-600 dark:text-white dark:placeholder:text-stone-400" 
                {...register("name")} 
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && <p className="text-red-600 dark:text-red-400 text-sm">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="dark:text-white">Phone</Label>
              <Input 
                id="phone" 
                placeholder="+359 88 000 0000" 
                className="dark:bg-stone-700 dark:border-stone-600 dark:text-white dark:placeholder:text-stone-400" 
                {...register("phone")} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="dark:text-white">E-mail *</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="john@email.com" 
              className="dark:bg-stone-700 dark:border-stone-600 dark:text-white dark:placeholder:text-stone-400" 
              {...register("email")} 
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="text-red-600 dark:text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="dark:text-white">Message *</Label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Describe your requirements..."
              className="dark:bg-stone-700 dark:border-stone-600 dark:text-white dark:placeholder:text-stone-400"
              {...register("message")}
              aria-invalid={errors.message ? "true" : "false"}
            />
            {errors.message && <p className="text-red-600 dark:text-red-400 text-sm">{errors.message.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full"
            size="lg"
          >
            {status === "loading" ? "Sending..." : "Send Enquiry"}
          </Button>

          {status === "success" && (
            <p className="text-center text-green-600 font-medium">
              Thank you! We will get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-red-500 font-medium">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}
        </motion.form>

        {/* Kontaktné údaje */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center text-center text-stone-500 dark:text-stone-400 text-sm">
          <span>📞 +421 904 232 384</span>
          <span>✉️ info@custom-furniture.bg</span>
          <span>📍 Byala, Bulgaria</span>
        </div>
      </div>
    </section>
  );
}
