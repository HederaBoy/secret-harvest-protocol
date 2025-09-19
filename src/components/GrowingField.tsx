import { useEffect, useState } from "react";

const GrowingField = () => {
  const [pulses, setPulses] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulses(prev => [...prev, Date.now()].slice(-8));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 overflow-hidden growing-field">
      {/* Digital Crop Rows */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-1 bg-gradient-to-t from-primary to-transparent animate-grow-pulse"
            style={{
              left: `${(i + 1) * 8}%`,
              height: `${Math.random() * 40 + 20}px`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Digital Pulses */}
      {pulses.map((pulse, index) => (
        <div
          key={pulse}
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"
          style={{
            animation: `grow-pulse 2s ease-out forwards`,
            animationDelay: `${index * 0.5}s`,
          }}
        />
      ))}

      {/* Particle Effect Overlay */}
      <div className="absolute inset-0 particle-field opacity-60" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
    </div>
  );
};

export default GrowingField;