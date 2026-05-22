import React from 'react';

interface LogoProps {
  primaryColor?: string; // #761A7E
  secondaryColor?: string; // #CBAF00
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  sloganText?: string;
  subSloganText?: string;
}

export default function SeotaiLogo({
  primaryColor = '#761A7E',
  secondaryColor = '#CBAF00',
  size = 'md',
  showText = true,
  sloganText = 'LEADING KOREA LAND OPERATOR',
  subSloganText = '(株) 瑞泰國際旅行社'
}: LogoProps) {
  
  // Calculate sizing classes
  const svgDimensions = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  }[size];

  const titleSize = {
    sm: 'text-sm font-bold',
    md: 'text-2xl font-bold tracking-tight',
    lg: 'text-3xl font-extrabold tracking-tight',
    xl: 'text-4xl font-extrabold tracking-wider'
  }[size];

  const subSize = {
    sm: 'text-[7px]',
    md: 'text-xs tracking-widest font-semibold',
    lg: 'text-sm tracking-widest font-bold',
    xl: 'text-base tracking-widest font-bold'
  }[size];

  const subSloganSize = {
    sm: 'text-[7px]',
    md: 'text-sm font-semibold mt-[2px]',
    lg: 'text-base font-bold mt-[3px]',
    xl: 'text-lg font-bold mt-[4px]'
  }[size];

  return (
    <div id="seotai-branding-logo" className="flex items-center gap-3 select-none text-left">
      {/* 8-Petal Alternating Floral Emblem SVG */}
      <svg 
        className={`${svgDimensions} shrink-0`} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines or subtle accents */}
        <line x1="50" y1="20" x2="50" y2="80" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="28.7" y1="28.7" x2="71.3" y2="71.3" stroke="#E2E8F0" strokeWidth="1" />
        <line x1="28.7" y1="71.3" x2="71.3" y2="28.7" stroke="#E2E8F0" strokeWidth="1" />

        {/* Alternating Petals 
            Angle: 0(N), 45(NE), 90(E), 135(SE), 180(S), 225(SW), 270(W), 315(NW)
            Petals alternate in color: 
            0 (N): Purple
            45 (NE): Gold
            90 (E): Purple
            135 (SE): Gold
            180 (S): Purple
            225 (SW): Gold
            270 (W): Purple
            315 (NW): Gold
        */}
        
        {/* Angle 0: North - Purple */}
        <path d="M50 14 C44 26, 56 26, 50 14 Z" fill={primaryColor} />
        <circle cx="50" cy="14" r="7" fill={primaryColor} />
        
        {/* Angle 45: North-East - Gold */}
        <path d="M75.5 24.5 C67 33, 75.5 41.5, 75.5 24.5 Z" fill={secondaryColor} />
        <circle cx="75.5" cy="24.5" r="7" fill={secondaryColor} />

        {/* Angle 90: East - Purple */}
        <path d="M86 50 C74 44, 74 56, 86 50 Z" fill={primaryColor} />
        <circle cx="86" cy="50" r="7" fill={primaryColor} />

        {/* Angle 135: South-East - Purple */}
        <path d="M75.5 75.5 C75.5 58.5, 67 67, 75.5 75.5 Z" fill={primaryColor} />
        <circle cx="75.5" cy="75.5" r="7" fill={primaryColor} />

        {/* Angle 180: South - Purple */}
        <path d="M50 86 C56 74, 44 74, 50 86 Z" fill={primaryColor} />
        <circle cx="50" cy="86" r="7" fill={primaryColor} />

        {/* Angle 225: South-West - Purple */}
        <path d="M24.5 75.5 C33 67, 24.5 58.5, 24.5 75.5 Z" fill={primaryColor} />
        <circle cx="24.5" cy="75.5" r="7" fill={primaryColor} />

        {/* Angle 270: West - Gold */}
        <path d="M14 50 C26 56, 26 44, 14 50 Z" fill={secondaryColor} />
        <circle cx="14" cy="50" r="7" fill={secondaryColor} />

        {/* Angle 315: North-West - Gold */}
        <path d="M24.5 24.5 C24.5 41.5, 33 33, 24.5 24.5 Z" fill={secondaryColor} />
        <circle cx="24.5" cy="24.5" r="7" fill={secondaryColor} />

        {/* Central Core Circle */}
        <circle cx="50" cy="50" r="10" fill={primaryColor} />
        <circle cx="50" cy="50" r="6" fill="#FFFFFF" opacity="0.2" />
      </svg>

      {/* Typography Section */}
      {showText && (
        <div className="flex flex-col select-none">
          {/* Main Title */}
          <span 
            className={`font-black ${titleSize}`} 
            style={{ color: primaryColor, fontFamily: 'sans-serif' }}
          >
            SEOTAI TRAVEL
          </span>
          <span 
            className={`font-extrabold text-neutral-800 ${subSize}`}
            style={{ letterSpacing: '0.12em' }}
          >
            {sloganText}
          </span>
          <span 
            className={`font-semibold ${subSloganSize}`}
            style={{ color: secondaryColor }}
          >
            {subSloganText}
          </span>
        </div>
      )}
    </div>
  );
}
