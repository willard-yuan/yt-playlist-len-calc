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

        {/* Main YouTube Play Button Background */}
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="url(#youtubeGradient)"
          filter="url(#glow)"
        />
        
        {/* Inner Ring */}
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />

        {/* YouTube Play Triangle - Central Element */}
        <g transform="translate(32, 32)">
          <polygon
            points="-6,-8 -6,8 10,0"
            fill="url(#whiteGradient)"
            filter="url(#innerShadow)"
          />
        </g>

        {/* Clock Ring - Outer Element */}
        <g transform="translate(32, 32)">
          {/* Clock Face Background */}
          <circle
            cx="0"
            cy="0"
            r="20"
            fill="none"
            stroke="url(#clockGradient)"
            strokeWidth="2"
            opacity="0.8"
            strokeDasharray="4,2"
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
          
          {/* Hour Markers */}
          <g stroke="url(#clockGradient)" strokeWidth="1.5" opacity="0.9">
            <line x1="0" y1="-18" x2="0" y2="-16" strokeLinecap="round" />
            <line x1="12.7" y1="-12.7" x2="11.3" y2="-11.3" strokeLinecap="round" />
            <line x1="18" y1="0" x2="16" y2="0" strokeLinecap="round" />
            <line x1="12.7" y1="12.7" x2="11.3" y2="11.3" strokeLinecap="round" />
            <line x1="0" y1="18" x2="0" y2="16" strokeLinecap="round" />
            <line x1="-12.7" y1="12.7" x2="-11.3" y2="11.3" strokeLinecap="round" />
            <line x1="-18" y1="0" x2="-16" y2="0" strokeLinecap="round" />
            <line x1="-12.7" y1="-12.7" x2="-11.3" y2="-11.3" strokeLinecap="round" />
          </g>
          
          {/* Clock Hands - Animated */}
          <g>
            {/* Hour Hand */}
            <line x1="0" y1="0" x2="0" y2="-8" stroke="url(#whiteGradient)" strokeWidth="2" strokeLinecap="round">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0"
                to="360"
                dur="43200s"
                repeatCount="indefinite"/>
            </line>
            
            {/* Minute Hand */}
            <line x1="0" y1="0" x2="0" y2="-12" stroke="url(#whiteGradient)" strokeWidth="1.5" strokeLinecap="round">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0"
                to="360"
                dur="3600s"
                repeatCount="indefinite"/>
            </line>
            
            {/* Second Hand */}
            <line x1="0" y1="0" x2="0" y2="-14" stroke="url(#accentGradient)" strokeWidth="1" strokeLinecap="round">
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
          
          {/* Center Dot */}
          <circle cx="0" cy="0" r="1.5" fill="url(#whiteGradient)" />
        </g>

        {/* Duration Indicators - Corner Elements */}
        <g opacity="0.8">
          {/* Top Left - Hours */}
          <g transform="translate(12, 12)">
            <circle cx="0" cy="0" r="4" fill="url(#clockGradient)" opacity="0.9" />
            <text x="0" y="1.5" textAnchor="middle" fontSize="3" fill="white" fontFamily="monospace" fontWeight="bold">H</text>
          </g>
          
          {/* Top Right - Minutes */}
          <g transform="translate(52, 12)">
            <circle cx="0" cy="0" r="4" fill="url(#clockGradient)" opacity="0.9" />
            <text x="0" y="1.5" textAnchor="middle" fontSize="3" fill="white" fontFamily="monospace" fontWeight="bold">M</text>
          </g>
          
          {/* Bottom Left - Seconds */}
          <g transform="translate(12, 52)">
            <circle cx="0" cy="0" r="4" fill="url(#clockGradient)" opacity="0.9" />
            <text x="0" y="1.5" textAnchor="middle" fontSize="3" fill="white" fontFamily="monospace" fontWeight="bold">S</text>
          </g>
          
          {/* Bottom Right - Total */}
          <g transform="translate(52, 52)">
            <circle cx="0" cy="0" r="4" fill="url(#accentGradient)" opacity="0.9" />
            <text x="0" y="1.5" textAnchor="middle" fontSize="2.5" fill="white" fontFamily="monospace" fontWeight="bold">∑</text>
          </g>
        </g>

        {/* Playlist Progress Bars - Left Side */}
        <g transform="translate(8, 28)" opacity="0.7">
          <rect x="0" y="0" width="6" height="1.5" rx="0.75" fill="url(#youtubeGradient)">
            <animate attributeName="width" values="6;8;6" dur="3s" repeatCount="indefinite"/>
          </rect>
          <rect x="0" y="3" width="5" height="1.5" rx="0.75" fill="url(#youtubeGradient)" opacity="0.8">
            <animate attributeName="width" values="5;7;5" dur="2.5s" repeatCount="indefinite"/>
          </rect>
          <rect x="0" y="6" width="4" height="1.5" rx="0.75" fill="url(#youtubeGradient)" opacity="0.6">
            <animate attributeName="width" values="4;6;4" dur="2s" repeatCount="indefinite"/>
          </rect>
        </g>

        {/* Playlist Progress Bars - Right Side */}
        <g transform="translate(50, 28)" opacity="0.7">
          <rect x="0" y="0" width="6" height="1.5" rx="0.75" fill="url(#clockGradient)">
            <animate attributeName="width" values="6;8;6" dur="2.8s" repeatCount="indefinite"/>
          </rect>
          <rect x="0" y="3" width="5" height="1.5" rx="0.75" fill="url(#clockGradient)" opacity="0.8">
            <animate attributeName="width" values="5;7;5" dur="3.2s" repeatCount="indefinite"/>
          </rect>
          <rect x="0" y="6" width="4" height="1.5" rx="0.75" fill="url(#clockGradient)" opacity="0.6">
            <animate attributeName="width" values="4;6;4" dur="2.3s" repeatCount="indefinite"/>
          </rect>
        </g>

        {/* Connecting Data Flow Lines */}
        <g stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" fill="none" opacity="0.6">
          <path d="M14,32 Q23,28 32,32" strokeDasharray="1,1">
            <animate attributeName="stroke-dashoffset" values="0;2" dur="2s" repeatCount="indefinite"/>
          </path>
          <path d="M32,32 Q41,28 50,32" strokeDasharray="1,1">
            <animate attributeName="stroke-dashoffset" values="0;2" dur="2s" repeatCount="indefinite"/>
          </path>
        </g>
      </svg>
    </div>
  );
}