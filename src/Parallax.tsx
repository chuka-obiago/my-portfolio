import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Parallax() {
  const ref = useRef(null);

  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // when section enters and exits viewport
  });

  // Different transform speeds for parallax
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 500]);   // slow
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, 700]); // medium
  const yFast = useTransform(scrollYProgress, [0, 1], [0, 100]);   // fast

  return (
    <section
      ref={ref}
      className=" w-full h-screen relative py-32 bg-gray-950 text-white overflow-hidden"
    >
      {/* Parallax background shapes */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"
      />
      <motion.div
        style={{ y: yMedium }}
        className="absolute top-40 right-20 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-2xl"
      />
      <motion.div
        style={{ y: yFast }}
        className="absolute bottom-10 left-1/2 w-48 h-48 bg-pink-500 rounded-full opacity-10 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold mb-6">PARALLAX</h2>
        <p className="text-lg text-gray-400">
          Web development, machine learning, and data solutions tailored to your needs.
        </p>
      </div>
    </section>
  );
}
