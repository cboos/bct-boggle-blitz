
import React from 'react';
import { cn } from "@/lib/utils";

interface BoggleDiceProps {
  letter: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const BoggleDice: React.FC<BoggleDiceProps> = ({ 
  letter, 
  selected, 
  onClick,
  className
}) => {
  return (
    <div 
      className={cn(
        "boggle-dice h-16 w-16 md:h-20 md:w-20",
        selected && "selected",
        className
      )}
      onClick={onClick}
    >
      {letter.toUpperCase()}
    </div>
  );
};

export default BoggleDice;
