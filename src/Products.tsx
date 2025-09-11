import React, { useState, useEffect, useRef } from "react";
import ProductBg from "./assets/img/products_bg.png";

const Products: React.FC = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    // Observer for Title (re-animates each time)
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(false);
          setTimeout(() => setIsTitleVisible(true), 50);
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) titleObserver.observe(titleRef.current);

    // Observer for Section (only once)
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isSectionVisible) {
          setIsSectionVisible(true);
          if (sectionRef.current) {
            sectionObserver.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    return () => {
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
      if (sectionRef.current) sectionObserver.unobserve(sectionRef.current);
    };
  }, [isSectionVisible]);

  const handleNotify = (event: React.FormEvent) => {
    event.preventDefault();
    const emailInput = (event.target as HTMLFormElement).elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const email = emailInput.value;
    if (email) {
      console.log(`Email submitted for updates: ${email}`);
      alert("Thank you! You will be notified of our progress.");
      emailInput.value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <section
      className="relative flex flex-col items-center justify-start min-h-screen w-full overflow-hidden bg-[#211e1f] text-white"
    >
      {/* Animation styles */}
      <style>
        {`
          @keyframes letter-pop {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.8);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-title-reveal span {
            display: inline-block;
            animation: letter-pop 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
          }
          .hidden-title span {
            opacity: 0;
          }
        `}
      </style>

      {/* Title */}
      <h2
        ref={titleRef}
        className="relative z-20 pt-15 text-5xl md:text-6xl font-extrabold uppercase tracking-widest text-white"
      >
        <span className="sr-only">PRODUCTS</span>
        <div
          key={isTitleVisible ? "visible" : "hidden"}
          className={isTitleVisible ? "animate-title-reveal" : "hidden-title"}
        >
          <span style={{ animationDelay: "0ms" }}>P</span>
          <span style={{ animationDelay: "100ms" }}>R</span>
          <span style={{ animationDelay: "200ms" }}>O</span>
          <span style={{ animationDelay: "300ms" }}>D</span>
          <span style={{ animationDelay: "400ms" }}>U</span>
          <span style={{ animationDelay: "500ms" }}>C</span>
          <span style={{ animationDelay: "600ms" }}>T</span>
          <span style={{ animationDelay: "700ms" }}>S</span>
        </div>
      </h2>

      {/* Coming Soon Section with BG */}
      <div
        ref={sectionRef}
        className="relative flex-1 flex items-center justify-center w-full my-2"
      >
        <div className="relative flex items-center justify-center w-full">
          {/* Background Image  */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img
              src={ProductBg}
              alt="Background"
              className={`transition-all duration-1000 ease-in object-contain w-[100%] md:w-[40%] blur-lg ${
                isSectionVisible ? "opacity-30" : "opacity-0"
              }`}
            />
          </div>

          {/* Coming Soon Content */}
          <div
            className={`relative z-10 p-10 md:p-26 max-w-2xl text-center transition-all duration-1000 ease-out transform ${
              isSectionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white/80 mb-4">
              Coming Soon!
            </h3>
            <p className="text-lg text-white/70 leading-relaxed">
              We are currently crafting a suite of innovative products designed
              to revolutionize your workflow. Our team is working hard to bring
              you solutions that are both powerful and intuitive.
            </p>
          </div>
        </div>
      </div>

      {/* Email Notify Form (outside BG) */}
      <form
        onSubmit={handleNotify}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-50 md:mb-20"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full sm:w-80 px-4 py-3 rounded-full bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
          required
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/80 transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          Notify Me
        </button>
      </form>
    </section>
  );
};

export default Products;
