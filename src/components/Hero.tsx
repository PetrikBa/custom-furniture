"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["900"] });

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const videos = Array.from({ length: 4 }, (_, i) => `${basePath}/vid${i + 1}.mp4`);

export default function Hero() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    setIndex((prev) => (prev + 1) % videos.length);
  };
  return (
    <section id="home" className="relative h-[80vh] w-full overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        key={index}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videos[index]} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0" style={{ opacity: 0.45, backgroundColor: "#1A202C" }} />

      {/* Obsah */}
      <div className="relative z-10 flex h-full flex-col justify-end pb-24 text-white w-full">
        <div className="mx-auto w-full max-w-6xl px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`${nunito.className} w-[50vw] mb-4 font-black tracking-tight leading-tight max-w-xl no-dark-color`}
            style={{ fontSize: "clamp(1.75rem, 5vmin, 4.5rem)" }}
          >
            Custom furniture designs created and installed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 max-w-lg text-sm text-white/80 sm:text-base no-dark-color"
          >
            Custom furniture tailored to your space. We handle everything from design to professional installation, ensuring premium quality and a seamless fit for your perfect home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="text-white text-base px-16 py-6 cursor-pointer"
              style={{ backgroundColor: "#7acfc4" }}
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book an appointment
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
