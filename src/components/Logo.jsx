function Logo() {
  return (
    <div className="flex items-center gap-1">
      <svg
        width="44"
        height="44"
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Play/Pulse icon */}
        <path
          d="M16 12L32 22L16 32V12Z"
          fill="url(#iconGradient)"
          stroke="#00ED64"
          strokeWidth="1.5"
        >
          <animate
            attributeName="opacity"
            values="1;0.8;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ED64" />
            <stop offset="100%" stopColor="#00A0FF" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        width="120"
        height="40"
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Text with animated underline */}
        <text
          x="0"
          y="29"
          fontFamily="'Poppins', sans-serif"
          fontSize="20"
          fontWeight="600"
          fill="white"
          letterSpacing="0.5"
        >
          VEEDLE
        </text>
        <path
          d="M0 32 H0"
          stroke="url(#underlineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            values="M0 32 H0; M0 32 H100"
            dur="0.6s"
            fill="freeze"
          />
        </path>
        <defs>
          <linearGradient
            id="underlineGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#00ED64" />
            <stop offset="100%" stopColor="#00A0FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default Logo;
