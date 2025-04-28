
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BoggleControlsProps {
  currentWord: string;
  onSubmitWord: () => void;
  onClearSelection: () => void;
  onNewGame: () => void;
  gameStarted: boolean;
  gameOver: boolean;
  className?: string;
}

const BoggleControls: React.FC<BoggleControlsProps> = ({
  currentWord,
  onSubmitWord,
  onClearSelection,
  onNewGame,
  gameStarted,
  gameOver,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-2 text-boggle-dark">Current Word</h3>
        <div className="py-2 px-3 bg-boggle-light rounded-md min-h-12 flex items-center justify-center">
          <p className="text-xl capitalize">
            {currentWord || <span className="text-gray-400 italic">Select letters...</span>}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 justify-center">
        <Button
          onClick={onClearSelection}
          variant="outline"
          disabled={!gameStarted || gameOver || !currentWord}
          className="flex-1"
        >
          Clear
        </Button>
        <Button
          onClick={onSubmitWord}
          disabled={!gameStarted || gameOver || currentWord.length < 3}
          className="flex-1 bg-boggle-primary hover:bg-boggle-secondary"
        >
          Submit
        </Button>
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={onNewGame}
          variant={gameStarted && !gameOver ? "outline" : "default"}
          className={cn(
            "w-full",
            !gameStarted || gameOver ? "bg-boggle-primary hover:bg-boggle-secondary" : ""
          )}
        >
          {!gameStarted ? 'Start Game' : (gameOver ? 'Play Again' : 'Restart Game')}
        </Button>
      </div>
    </div>
  );
};

export default BoggleControls;
