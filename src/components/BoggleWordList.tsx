
import React from 'react';
import { cn } from "@/lib/utils";

interface BoggleWordListProps {
  words: string[];
  scores: { [key: string]: number };
  className?: string;
}

const BoggleWordList: React.FC<BoggleWordListProps> = ({ 
  words, 
  scores,
  className
}) => {
  return (
    <div className={cn("bg-white p-4 rounded-lg shadow-md", className)}>
      <h3 className="text-lg font-bold mb-2 text-boggle-dark">Found Words</h3>
      {words.length === 0 ? (
        <p className="text-gray-500 italic">No words found yet...</p>
      ) : (
        <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
          {words.map((word, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="capitalize">{word}</span>
              <span className="bg-boggle-light text-boggle-secondary px-2 py-1 rounded-md text-xs">
                +{scores[word] || 0} pts
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoggleWordList;
