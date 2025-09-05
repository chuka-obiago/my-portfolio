import myLogo from '../assets/img/cursive_logo.png';

// LoadingScreen Component
// Displays your logo in the center with a fast, clean animation
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 animate-fade-in-slow">
      <div className="flex items-center justify-center">
        <img
          src={myLogo}
          alt="Logo"
          className="w-92 h-92 md:w-98 md:h-98 object-contain animate-pulse-logo"
        />
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulseLogo {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.9; }
        }

        .animate-fade-in-slow {
          animation: fadeInSlow 0.6s ease-out forwards;
        }

        .animate-pulse-logo {
          animation: pulseLogo 0.8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
