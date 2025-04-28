
import React from 'react';
import { cn } from "@/lib/utils";

interface BoggleScoreExplainerProps {
  className?: string;
}

const BoggleScoreExplainer: React.FC<BoggleScoreExplainerProps> = ({ className }) => {
  return (
    <div className={cn("bg-white p-4 rounded-lg shadow-md", className)}>
      <h3 className="text-lg font-bold mb-2 text-boggle-dark">Scoring System</h3>
      
      <table className="boggle-score-table text-sm">
        <thead>
          <tr>
            <th>Word Length</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3-4 letters</td>
            <td>1 point</td>
          </tr>
          <tr>
            <td>5 letters</td>
            <td>2 points</td>
          </tr>
          <tr>
            <td>6 letters</td>
            <td>3 points</td>
          </tr>
          <tr>
            <td>7 letters</td>
            <td>5 points</td>
          </tr>
          <tr>
            <td>8+ letters</td>
            <td>11 points</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BoggleScoreExplainer;
