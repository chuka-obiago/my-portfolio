import React, { useState, useEffect, useRef } from "react";
import ProductBg from "./assets/img/products_bg.png";

const Products: React.FC = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Validation state
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
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

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isSectionVisible) {
          setIsSectionVisible(true);
          if (sectionRef.current) sectionObserver.unobserve(sectionRef.current);
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!email.trim()) {
      e.preventDefault();
      setError("Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      e.preventDefault();
      setError("Please enter a valid email address.");
      return;
    }
    setError(""); // clear error and allow Mailchimp submission
  };

  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen w-full overflow-hidden bg-[#211e1f] text-white">
      <style>
        {`
          @keyframes letter-pop {
            0% { opacity: 0; transform: translateY(20px) scale(0.8); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-title-reveal span {
            display: inline-block;
            animation: letter-pop 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
          }
          .hidden-title span { opacity: 0; }
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
          {"PRODUCTS".split("").map((letter, i) => (
            <span key={i} style={{ animationDelay: `${i * 100}ms` }}>
              {letter}
            </span>
          ))}
        </div>
      </h2>

      {/* Coming Soon Section */}
      <div
        ref={sectionRef}
        className="relative flex-1 flex items-center justify-center w-full my-2"
      >
        <div className="relative flex items-center justify-center w-full">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img
              src={ProductBg}
              alt="Background"
              className={`transition-all duration-1000 ease-in object-contain w-[100%] md:w-[36%] blur-lg ${
                isSectionVisible ? "opacity-30" : "opacity-0"
              }`}
            />
          </div>

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
              My team and I are building innovative products to simplify and
              supercharge your workflow. Stay tuned and be the first to experience them.
            </p>
          </div>
        </div>
      </div>

      {/* ---- Mailchimp Embedded Form with inline validation ---- */}
      {error && (
        <p className="text-red-400 text-sm mt-2 text-center px-4">{error}</p>
      )}
      <form
        onSubmit={handleSubmit}
        action="https://gmail.us18.list-manage.com/subscribe/post?u=4ec1739ba86ba38b8a4144f74&amp;id=38c21f6372&amp;f_id=0045b6e6f0"
        method="post"
        target="_blank"
        noValidate
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-50 md:mb-30"
      >
        <input
          type="email"
          name="EMAIL"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full sm:w-80 px-4 py-3 rounded-full bg-white/10 text-white placeholder-white/50 border 
            ${error ? "border-red-400" : "border-white/20"} 
            focus:outline-none focus:border-white/50 transition-all duration-300 text-center`}
        />
        {/* Hidden anti-bot field */}
        <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
          <input
            type="text"
            name="b_4ec1739ba86ba38b8a4144f74_38c21f6372"
            tabIndex={-1}
            defaultValue=""
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/80 transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          Notify Me
        </button>
      </form>
      {/* <a href="/thankyou">Go to Thank You Page</a> */}
    </section>
  );
};

export default Products;
