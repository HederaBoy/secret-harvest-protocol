import logoImage from "@/assets/fhe-farm-logo.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={logoImage} 
        alt="FHE Farm Logo" 
        className={`${sizeClasses[size]} glow-effect animate-float`}
      />
      <div className="flex flex-col">
        <span className="font-cyber font-bold text-xl text-gradient-primary">
          FHE Farm
        </span>
        <span className="font-tech text-xs text-muted-foreground">
          Harvest Privately
        </span>
      </div>
    </div>
  );
};

export default Logo;