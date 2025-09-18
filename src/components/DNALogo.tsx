import React from 'react';

const DNALogo = ({ className = "" }) => {
  return (
    <div className={`relative w-12 h-12 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="w-full h-full animate-dna-rotate"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* DNA Helix Structure */}
        <path
          d="M12 8C12 8 24 16 36 8C36 8 24 24 12 32C12 32 24 40 36 32"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
          className="animate-blockchain-glow"
        />
        <path
          d="M36 8C36 8 24 16 12 8C12 8 24 24 36 32C36 32 24 40 12 32"
          stroke="hsl(var(--primary-glow))"
          strokeWidth="2"
          fill="none"
          className="animate-blockchain-glow"
        />
        
        {/* Blockchain Rings */}
        <circle
          cx="24"
          cy="12"
          r="3"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          fill="none"
          className="animate-encrypted-pulse"
        />
        <circle
          cx="24"
          cy="24"
          r="4"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          fill="none"
          className="animate-encrypted-pulse"
        />
        <circle
          cx="24"
          cy="36"
          r="3"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          fill="none"
          className="animate-encrypted-pulse"
        />
        
        {/* Base Pairs */}
        <line x1="18" y1="12" x2="30" y2="12" stroke="hsl(var(--primary))" strokeWidth="1"/>
        <line x1="15" y1="24" x2="33" y2="24" stroke="hsl(var(--primary))" strokeWidth="1"/>
        <line x1="18" y1="36" x2="30" y2="36" stroke="hsl(var(--primary))" strokeWidth="1"/>
      </svg>
    </div>
  );
};

export default DNALogo;