// components/Footer.tsx
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from './assets/img/co-logo.png';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-[#d9d7cb] text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand / Name */}
        <div className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Central Content */}
        <div className="flex-1 text-center">
          <p className="text-sm inline-block">
            © {new Date().getFullYear()} Chukwuka Obiago. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex-shrink-0 flex justify-center md:justify-end gap-5">
          <a
            href="mailto:chukaobiago@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="hover:text-white transition-colors"
          >
            <MdEmail className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/chukwuka-obiago/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors"
          >
            <FaLinkedinIn className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}