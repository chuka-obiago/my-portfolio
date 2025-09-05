import React, { useState, useEffect, useRef, useCallback } from 'react';
import CoLogo from '../assets/img/co-logo.png';

// const myLogoPlaceholder = "https://placehold.co/100x40/FFFFFF/2C3E50?text=Logo";

const Navbar: React.FC = () => {
  // State for controlling navbar behavior - internal to the component
  const [isHidden, setIsHidden] = useState(false);
  const [isGlassy, setIsGlassy] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Handle scroll events for Navbar behavior
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const heroSectionHeight = window.innerHeight;
    const navbarHeight = 80;

    // Determine scroll direction
    if (currentScrollY > lastScrollY.current && currentScrollY > navbarHeight) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    // Determine if scrolled past the hero section
    if (currentScrollY > heroSectionHeight - navbarHeight) {
      setIsGlassy(true);
    } else {
      setIsGlassy(false);
    }

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  // Function to smooth scroll to a section by its ID
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -0; // -80 for Navbar height offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    } else {
      console.warn(`Section with ID '${id}' not found.`);
    }
  };

  // Handle logo click to refresh the page
  const handleLogoClick = () => {
    window.location.reload();
  };

  // Handle Home link click to smoothly scroll to the very top
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const linkClasses = `px-4 py-2 text-white text-lg font-medium transition-all duration-300 rounded-lg cursor-pointer
                        hover:bg-black/25 hover:backdrop-blur-sm`;
  const glassyLinkClasses = `px-4 py-2 text-white text-lg font-medium transition-all duration-300 rounded-lg cursor-pointer
                              hover:bg-black/25 hover:backdrop-blur-sm
`;
  
  // Mobile menu classes
  const mobileLinkClasses = `block px-6 py-4 text-white text-lg font-medium transition-all duration-300 rounded-lg cursor-pointer
                             hover:bg-black/25 border-b border-white border-opacity-20 last:border-b-0`;
  const mobileGlassyLinkClasses = `block px-6 py-4 text-white text-lg font-medium transition-all duration-300 rounded-lg cursor-pointer
                                  hover:text-white hover:bg-black/25 border-b border-gray-300 border-opacity-30 last:border-b-0`;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 w-full flex justify-center py-4 transition-all duration-500
                      ${isHidden ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}
                      ${isGlassy ? 'bg-black/15 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="w-4/5 max-w-7xl mx-auto flex items-center justify-between">
          {/* Desktop Left Categories - Hidden on mobile */}
          <div className="hidden lg:flex space-x-6">
            <button className={isGlassy ? glassyLinkClasses : linkClasses} onClick={handleHomeClick}>
              HOME
            </button>
            <button className={isGlassy ? glassyLinkClasses : linkClasses} onClick={() => scrollToSection('about')}>
              ABOUT
            </button>
            <button className={isGlassy ? glassyLinkClasses : linkClasses} onClick={() => scrollToSection('projects')}>
              PROJECTS
            </button>
          </div>

          {/* Mobile Menu Button - Visible on mobile */}
          <button
            className="lg:hidden flex items-center px-3 py-2 border border-white border-opacity-30 rounded text-white hover:text-purple-300 hover:border-purple-300 transition-all duration-300"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo in Center */}
          <div className="flex-shrink-0 cursor-pointer" onClick={handleLogoClick}>
            <img
              src={CoLogo}
              alt="Logo"
              className="h-8 md:h-10 w-auto object-contain transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* Desktop Right Categories - Hidden on mobile */}
          <div className="hidden lg:flex space-x-6">
            <button className={isGlassy ? glassyLinkClasses : linkClasses} onClick={() => scrollToSection('services')}>
              SERVICES
            </button>
            <button className={isGlassy ? glassyLinkClasses : linkClasses} onClick={() => scrollToSection('products')}>
              PRODUCTS
            </button>
            <button className={isGlassy ? glassyLinkClasses : linkClasses} onClick={() => scrollToSection('contact')}>
              CONTACT
            </button>
          </div>

          {/* Mobile spacer to balance logo centering */}
          <div className="lg:hidden w-10"></div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-100 ease-in-out${
        isMobileMenuOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray bg-opacity-0 backdrop-blur-sm "
          onClick={toggleMobileMenu}
        ></div>
        
        {/* Mobile Menu Content */}
        <div className={`absolute top-0 left-0 w-full max-w-sm h-full transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isGlassy ? 'bg-gradient-to-br from-gray-900 to-gray-black bg-opacity-90 backdrop-blur-sm' : 'bg-gradient-to-br from-gray-900 to-gray-black backdrop-blur-sm'}`}>
          
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white border-opacity-20">
            <img
              src={CoLogo}
              alt="Logo"
              className="h-8 w-auto object-contain"
            />
            <button
              className="text-white hover:text-purple-300 transition-colors duration-300"
              onClick={toggleMobileMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="py-6">
            <button className={isGlassy ? mobileGlassyLinkClasses : mobileLinkClasses} onClick={handleHomeClick}>
              HOME
            </button>
            <button className={isGlassy ? mobileGlassyLinkClasses : mobileLinkClasses} onClick={() => scrollToSection('about')}>
              ABOUT
            </button>
            <button className={isGlassy ? mobileGlassyLinkClasses : mobileLinkClasses} onClick={() => scrollToSection('projects')}>
              PROJECTS
            </button>
            <button className={isGlassy ? mobileGlassyLinkClasses : mobileLinkClasses} onClick={() => scrollToSection('services')}>
              SERVICES
            </button>
            <button className={isGlassy ? mobileGlassyLinkClasses : mobileLinkClasses} onClick={() => scrollToSection('products')}>
              PRODUCTS
            </button>
            <button className={isGlassy ? mobileGlassyLinkClasses : mobileLinkClasses} onClick={() => scrollToSection('contact')}>
              CONTACT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;