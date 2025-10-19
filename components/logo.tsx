import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          {/* YouTube Red Gradient */}
          <linearGradient id="youtubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" />
            <stop offset="50%" stopColor="#FF4444" />
            <stop offset="100%" stopColor="#CC0000" />
          </linearGradient>
          
          {/* Clock Blue Gradient */}
          <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          
          {/* White Gradient */}
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          
          {/* Accent Gradient */}
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          
          {/* Glow Effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Inner Shadow */}
          <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset dx="0" dy="1"/>
            <feGaussianBlur stdDeviation="1" result="offset-blur"/>
            <feFlood floodColor="#000000" floodOpacity="0.15"/>
            <feComposite in2="offset-blur" operator="in"/>
            <feMerge> 
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Enhanced YouTube Play Button Background - Maximum Enlarged */}
        <circle
          cx="32"
          cy="32"
          r="32"
          fill="url(#youtubeGradient)"
          filter="url(#glow)"
        />
        
        {/* Enhanced Inner Ring - Maximum Enlarged */}
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
        />
        
        {/* Additional Inner Ring for depth - Maximum Enlarged */}
        <circle
          cx="32"
          cy="32"
          r="24"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />

        {/* Enhanced YouTube Play Triangle - Maximum Enlarged */}
        <g transform="translate(32, 32)">
          {/* Shadow/Depth Triangle */}
          <polygon
            points="-9,-12 -9,12 16,0"
            fill="rgba(0,0,0,0.25)"
            transform="translate(1.5,1.5)"
          />
          {/* Main Triangle - Maximum Enlarged */}
          <polygon
            points="-9,-12 -9,12 16,0"
            fill="url(#whiteGradient)"
            filter="url(#glow)"
          />
        </g>

        {/* Clock Ring - Maximum Enlarged and Enhanced */}
        <g transform="translate(32, 32)">
          {/* Outer Clock Ring - Maximum Enlarged */}
          <circle
            cx="0"
            cy="0"
            r="30"
            fill="none"
            stroke="url(#clockGradient)"
            strokeWidth="4"
            opacity="1"
            strokeDasharray="8,3"
            filter="url(#glow)"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0"
              to="360"
              dur="20s"
              repeatCount="indefinite"/>
          </circle>
          
          {/* Inner Clock Ring - Maximum Enlarged */}
          <circle
            cx="0"
            cy="0"
            r="26"
            fill="none"
            stroke="rgba(59, 130, 246, 0.4)"
            strokeWidth="1.5"
            opacity="0.8"
          />
          
          {/* Enhanced Hour Markers - Adjusted for Maximum Clock Size */}
          <g stroke="url(#clockGradient)" strokeWidth="3" opacity="1">
            {/* 12 o'clock - Maximum Enhanced and Repositioned */}
            <line x1="0" y1="-28" x2="0" y2="-22" strokeLinecap="round" strokeWidth="4" />
            {/* 3 o'clock - Maximum Enhanced and Repositioned */}
            <line x1="28" y1="0" x2="22" y2="0" strokeLinecap="round" strokeWidth="4" />
            {/* 6 o'clock - Maximum Enhanced and Repositioned */}
            <line x1="0" y1="28" x2="0" y2="22" strokeLinecap="round" strokeWidth="4" />
            {/* 9 o'clock - Maximum Enhanced and Repositioned */}
            <line x1="-28" y1="0" x2="-22" y2="0" strokeLinecap="round" strokeWidth="4" />
            
            {/* Other hour markers - Maximum Repositioned */}
            <line x1="19.8" y1="-19.8" x2="17.3" y2="-17.3" strokeLinecap="round" strokeWidth="3" />
            <line x1="19.8" y1="19.8" x2="17.3" y2="17.3" strokeLinecap="round" strokeWidth="3" />
            <line x1="-19.8" y1="19.8" x2="-17.3" y2="17.3" strokeLinecap="round" strokeWidth="3" />
            <line x1="-19.8" y1="-19.8" x2="-17.3" y2="-17.3" strokeLinecap="round" strokeWidth="3" />
          </g>
          
          {/* Enhanced Clock Hands - Maximum Enlarged and Animated */}
          <g>
            {/* Hour Hand - Maximum Enlarged */}
            <line x1="0" y1="0" x2="0" y2="-14" stroke="url(#whiteGradient)" strokeWidth="4" strokeLinecap="round" filter="url(#glow)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0"
                to="360"
                dur="43200s"
                repeatCount="indefinite"/>
            </line>
            
            {/* Minute Hand - Maximum Enlarged */}
            <line x1="0" y1="0" x2="0" y2="-22" stroke="url(#whiteGradient)" strokeWidth="3.5" strokeLinecap="round" filter="url(#glow)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0"
                to="360"
                dur="3600s"
                repeatCount="indefinite"/>
            </line>
            
            {/* Second Hand - Maximum Enhanced */}
            <line x1="0" y1="0" x2="0" y2="-24" stroke="url(#accentGradient)" strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0"
                to="360"
                dur="60s"
                repeatCount="indefinite"/>
            </line>
          </g>
        </g>




      </svg>
    </div>
  );
}