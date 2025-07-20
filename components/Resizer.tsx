
import React from 'react';

interface ResizerProps {
  direction: 'horizontal' | 'vertical';
  onMouseDown: (e: React.MouseEvent) => void;
  isVisibleOnDesktop?: boolean;
}

const Resizer: React.FC<ResizerProps> = ({ direction, onMouseDown, isVisibleOnDesktop = false }) => {
  const baseClasses = "bg-slate-700 hover:bg-cyan-400/80 transition-colors duration-200 z-20 flex-shrink-0";
  const directionClasses = direction === 'vertical' ? "w-1.5 cursor-col-resize" : "h-1.5 cursor-row-resize w-full";
  const visibilityClass = isVisibleOnDesktop ? "hidden lg:block" : "";

  return (
    <div
      className={`${baseClasses} ${directionClasses} ${visibilityClass}`}
      onMouseDown={onMouseDown}
      role="separator"
      aria-orientation={direction}
    />
  );
};

export default Resizer;
