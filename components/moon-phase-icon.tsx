interface MoonPhaseIconProps {
  phase: number;
  className?: string;
}

export default function MoonPhaseIcon({
  phase,
  className = "",
}: MoonPhaseIconProps) {
  const normalizedPhase = phase % 1;

  const getShadowPath = () => {
    const centerX = 50;
    const centerY = 50;
    const radius = 45;

    if (normalizedPhase < 0.03) {
      return `M ${centerX} ${
        centerY - radius
      } A ${radius} ${radius} 0 1 1 ${centerX} ${
        centerY + radius
      } A ${radius} ${radius} 0 1 1 ${centerX} ${centerY - radius}`;
    }

    if (normalizedPhase > 0.97) {
      return `M ${centerX} ${
        centerY - radius
      } A ${radius} ${radius} 0 1 1 ${centerX} ${
        centerY + radius
      } A ${radius} ${radius} 0 1 1 ${centerX} ${centerY - radius}`;
    }

    if (normalizedPhase >= 0.47 && normalizedPhase <= 0.53) {
      return "";
    }

    if (normalizedPhase < 0.5) {
      const offset = (normalizedPhase / 0.5) * radius * 2;
      const ellipseRadius = radius * (1 - normalizedPhase * 2);

      return `M ${centerX} ${centerY - radius} 
              A ${radius} ${radius} 0 0 1 ${centerX} ${centerY + radius} 
              A ${Math.abs(ellipseRadius)} ${radius} 0 0 ${
        normalizedPhase < 0.25 ? 1 : 0
      } ${centerX} ${centerY - radius}`;
    }

    const waning = (normalizedPhase - 0.5) / 0.5;
    const ellipseRadius = radius * (waning * 2 - 1);

    return `M ${centerX} ${centerY - radius} 
            A ${radius} ${radius} 0 0 0 ${centerX} ${centerY + radius} 
            A ${Math.abs(ellipseRadius)} ${radius} 0 0 ${
      normalizedPhase > 0.75 ? 0 : 1
    } ${centerX} ${centerY - radius}`;
  };

  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle
        cx="50"
        cy="50"
        r="45"
        className="fill-muted stroke-border stroke-2"
      />

      {getShadowPath() && (
        <path d={getShadowPath()} className="fill-background" />
      )}
    </svg>
  );
}
