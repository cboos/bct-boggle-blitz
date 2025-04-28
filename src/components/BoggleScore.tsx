
import React from 'react';
import { cn } from "@/lib/utils";

interface BoggleScoreProps {
  score: number;
  className?: string;
}

const BoggleScore: React.FC<BoggleScoreProps> = ({ score, className }) => {
  return (
    <div className={cn("bg-white p-4 rounded-lg shadow-md", className)}>
      <h3 className="text-lg font-bold mb-2 text-boggle-dark">Score</h3>
      <p className="text-3xl font-bold text-boggle-primary">{score}</p>
    </div>
  );
};

export default BoggleScore;
