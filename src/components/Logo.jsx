"use client"

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
            <stop offset="0%" stopColor="#00ed64" />
            <stop offset="50%" stopColor="#00c050" />
            <stop offset="100%" stopColor="#00a040" />
          </linearGradient>
          <filter id="vibeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <text x="39" y="29" fontFamily="sans-serif" fontSize="25" fontWeight="bold" fill="white" letterSpacing="2">
          VEEDLE
        </text>

        {/* Animated Accent Line */}
        <rect x="40" y="36" width="0" height="2" rx="1" fill="url(#vibecastGradient)">
          <animate attributeName="width" values="0;109;109" dur="2s" begin="0s" repeatCount="1" fill="freeze" />
        </rect>
      </svg>
    </div>
  )
}

export default Logo
