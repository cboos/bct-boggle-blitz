
import React, { useState, useEffect } from 'react';
import BoggleDice from './BoggleDice';
import { cn } from "@/lib/utils";

interface BoggleBoardProps {
  board: string[][];
  selectedPath: number[][] | null;
  onDiceClick: (row: number, col: number) => void;
  className?: string;
}

const BoggleBoard: React.FC<BoggleBoardProps> = ({
  board,
  selectedPath,
  onDiceClick,
  className
}) => {
  const isSelected = (row: number, col: number) => {
    if (!selectedPath) return false;
    return selectedPath.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className={cn("grid grid-cols-4 gap-2 p-4 bg-boggle-dark rounded-lg shadow-lg w-full max-w-md mx-auto", className)}>
      {board.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <BoggleDice
            key={`${rowIndex}-${colIndex}`}
            letter={letter}
            selected={isSelected(rowIndex, colIndex)}
            onClick={() => onDiceClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default BoggleBoard;
