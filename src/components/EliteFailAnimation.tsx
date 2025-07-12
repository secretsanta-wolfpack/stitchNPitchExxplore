import React from 'react';
import { X } from 'lucide-react';

interface EliteFailAnimationProps {
  isActive: boolean;
  eliteName: string;
  onClose: () => void;
}

const EliteFailAnimation: React.FC<EliteFailAnimationProps> = ({ isActive, eliteName, onClose }) => {
  if (!isActive) return null;

  const eliteFailMessages = [
    "Elite status not achieved this time! 👑",
    "Almost elite level! Keep striving! ⭐",
    "Elite journey continues! 🌟",
    "Not quite elite yet! Try again! 💫",
    "Elite standards are high! 🎯",
    "Elite level requires more! 🚀",
    "Elite status pending! 📈",
    "Elite achievement in progress! 🔄"
  ];

  const randomMessage = eliteFailMessages[Math.floor(Math.random() * eliteFailMessages.length)];

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <style>
        {`
          .elite-fail-bounce {
            animation: elite-fail-bounce 0.8s ease-out;
          }
          
          @keyframes elite-fail-bounce {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(-90deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          
          .elite-fail-shake {
            animation: elite-fail-shake 0.5s ease-in-out infinite;
          }
          
          @keyframes elite-fail-shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          
          .elite-fail-float {
            animation: elite-fail-float 2s ease-in-out infinite;
          }
          
          @keyframes elite-fail-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .elite-fail-emoji {
            animation: elite-fail-emoji-spin 1s linear infinite;
          }
          
          @keyframes elite-fail-emoji-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-70 backdrop-blur-sm overflow-y-auto"
        onClick={handleClose}
      >
        <div 
          className="bg-gradient-to-br from-orange-500 to-red-500 bg-opacity-10 backdrop-blur-xl border border-orange-400 border-opacity-30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl text-center elite-fail-bounce relative my-auto"
          onClick={handleModalClick}
        >
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-200 transition-colors bg-white bg-opacity-20 rounded-full p-1.5 sm:p-2 hover:bg-opacity-30 z-10 backdrop-blur-sm"
            type="button"
          >
            <X className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Animated Emojis */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl md:text-6xl elite-fail-emoji">👑</span>
            <span className="text-3xl sm:text-4xl md:text-6xl elite-fail-float">📈</span>
            <span className="text-3xl sm:text-4xl md:text-6xl elite-fail-shake">⭐</span>
          </div>
          
          {/* Main Message */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 elite-fail-shake">
            NOT QUITE ELITE! 
          </h1>
          
          <div className="bg-gradient-to-r from-orange-500 to-red-500 bg-opacity-20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 backdrop-blur-sm border border-orange-400 border-opacity-30">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 break-words">
              {eliteName}
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-white opacity-90 break-words">
              {randomMessage}
            </p>
          </div>
          
          {/* Funny Animation Elements */}
          <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 mb-4 sm:mb-6">
            <div className="text-2xl sm:text-3xl md:text-4xl elite-fail-float" style={{ animationDelay: '0.2s' }}>🎯</div>
            <div className="text-2xl sm:text-3xl md:text-4xl elite-fail-float" style={{ animationDelay: '0.4s' }}>📊</div>
            <div className="text-2xl sm:text-3xl md:text-4xl elite-fail-float" style={{ animationDelay: '0.6s' }}>🚀</div>
            <div className="text-2xl sm:text-3xl md:text-4xl elite-fail-float" style={{ animationDelay: '0.8s' }}>💎</div>
          </div>
          
          <div className="text-white text-sm sm:text-base md:text-lg opacity-80 mb-4 sm:mb-6 px-2">
            Elite status requires exceptional performance! Keep pushing forward! 🌟
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="bg-gradient-to-r from-orange-500 to-red-500 bg-opacity-20 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-opacity-30 transition-all transform hover:scale-105 font-semibold text-sm sm:text-base backdrop-blur-sm z-10 relative border border-orange-400 border-opacity-30"
            type="button"
          >
            Continue Elite Journey
          </button>
        </div>
      </div>
    </>
  );
};

export default EliteFailAnimation;