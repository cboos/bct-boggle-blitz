
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BoggleRulesProps {
  className?: string;
}

const BoggleRules: React.FC<BoggleRulesProps> = ({ className }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("", className)}>Game Rules</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Boggle Rules</DialogTitle>
          <DialogDescription>How to play BCT Boggle Blitz</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Objective</h3>
            <p className="text-sm">Find as many words as possible on the 4x4 grid of letters within 3 minutes.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Rules</h3>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Words must be at least 3 letters long</li>
              <li>Letters must be adjacent (horizontally, vertically, or diagonally)</li>
              <li>Each die can only be used once per word</li>
              <li>The game does not validate if words are real</li>
              <li>You have 3 minutes to find as many words as possible</li>
              <li>The longer the word, the more points you get</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">How to Play</h3>
            <ol className="list-decimal list-inside text-sm space-y-2">
              <li>Click "Start Game" to begin</li>
              <li>Click on letters to form a word</li>
              <li>Click "Submit" to record the word</li>
              <li>Click "Clear" to start a new word</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoggleRules;
