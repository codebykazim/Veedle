function Logo() {
    return (
      <div className="flex items-center">
        <svg
          width="200"
          height="40"
          viewBox="0 0 200 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="vibecastGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <filter id="vibeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Play Icon with Pulse Animation */}
          <path
            d="M15 8C8.92487 8 4 12.9249 4 19C4 25.0751 8.92487 30 15 30C21.0751 30 26 25.0751 26 19C26 12.9249 21.0751 8 15 8ZM13 14.5L20 19L13 23.5V14.5Z"
            fill="url(#vibecastGradient)"
            filter="url(#vibeGlow)"
            transform="scale(1.2)"
          >
            <animate attributeName="opacity" values="1;0.8;1" dur="2s" begin="0s" repeatCount="1" />
          </path>

          {/* Text: VibeCast */}
          <text x="40" y="28" fontFamily="sans-serif" fontSize="20" fontWeight="bold" fill="white" letterSpacing="0.5">
            VIBECAST
          </text>

          {/* Animated Accent Line */}
          <rect x="40" y="34" width="0" height="2" rx="1" fill="url(#vibecastGradient)">
            <animate attributeName="width" values="0;100;100" dur="2s" begin="0s" repeatCount="1" fill="freeze" />
          </rect>
        </svg>
      </div>
    );
  }

  export default Logo;
