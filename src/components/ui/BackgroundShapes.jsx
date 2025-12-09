const BackgroundShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Abstract curved shapes */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 360 760" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3E4F46" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9DB0A4" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD87A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3E4F46" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* Large curved shape - top right */}
        <path
          d="M 200 0 Q 300 100 360 200 L 360 0 Z"
          fill="url(#grad1)"
          className="animate-pulse-slow"
        />
        
        {/* Medium curved shape - bottom left */}
        <path
          d="M 0 500 Q 100 600 200 700 L 0 760 Z"
          fill="url(#grad2)"
          className="animate-pulse-slow"
          style={{ animationDelay: '1s' }}
        />
        
        {/* Small accent shape - center */}
        <ellipse
          cx="280"
          cy="400"
          rx="120"
          ry="80"
          fill="url(#grad2)"
          opacity="0.2"
          className="animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        />
      </svg>
      
      {/* Additional layered circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-40 left-5 w-48 h-48 bg-secondary/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
    </div>
  )
}

export default BackgroundShapes

