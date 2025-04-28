
import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import BoggleBoard from '@/components/BoggleBoard';
import BoggleTimer from '@/components/BoggleTimer';
import BoggleWordList from '@/components/BoggleWordList';
import BoggleScore from '@/components/BoggleScore';
import BoggleControls from '@/components/BoggleControls';
import BoggleScoreExplainer from '@/components/BoggleScoreExplainer';
import BoggleRules from '@/components/BoggleRules';
import { generateBoggleBoard, arePositionsAdjacent, calculateWordScore } from '@/utils/boggleUtils';

const GAME_TIME = 180; // 3 minutes in seconds

const Index = () => {
  const [board, setBoard] = useState<string[][]>([]);
  const [selectedPath, setSelectedPath] = useState<number[][]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [wordScores, setWordScores] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  
  const { toast } = useToast();

  // Initialize the game board
  const initializeGame = useCallback(() => {
    const newBoard = generateBoggleBoard();
    setBoard(newBoard);
    setSelectedPath([]);
    setCurrentWord('');
    setFoundWords([]);
    setWordScores({});
    setScore(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle die click
  const handleDiceClick = (row: number, col: number) => {
    if (!gameStarted || gameOver) return;
    
    const position = [row, col];
    
    // Check if this position is already selected
    const isAlreadySelected = selectedPath.some(([r, c]) => r === row && c === col);
    if (isAlreadySelected) return;
    
    // Check if this is a valid adjacent position to the last selected die
    if (selectedPath.length > 0) {
      const lastPosition = selectedPath[selectedPath.length - 1];
      if (!arePositionsAdjacent(lastPosition, position)) return;
    }
    
    // Add the position to the path and update current word
    setSelectedPath([...selectedPath, position]);
    setCurrentWord(prevWord => prevWord + board[row][col]);
  };

  // Submit a word
  const handleSubmitWord = () => {
    if (currentWord.length < 3) {
      toast({
        title: "Word too short",
        description: "Words must be at least 3 letters long.",
      });
      return;
    }
    
    // Check if the word has already been found
    if (foundWords.includes(currentWord.toLowerCase())) {
      toast({
        title: "Word already found",
        description: `You've already found "${currentWord}".`,
      });
      clearSelection();
      return;
    }
    
    const wordScore = calculateWordScore(currentWord);
    
    setFoundWords(prev => [...prev, currentWord.toLowerCase()]);
    setWordScores(prev => ({ ...prev, [currentWord.toLowerCase()]: wordScore }));
    setScore(prev => prev + wordScore);
    
    toast({
      title: `+${wordScore} points!`,
      description: `"${currentWord}" has been added to your list.`,
    });
    
    clearSelection();
  };

  // Clear current selection
  const clearSelection = () => {
    setSelectedPath([]);
    setCurrentWord('');
  };

  // Start a new game
  const handleNewGame = () => {
    if (gameStarted && !gameOver) {
      if (confirm('Are you sure you want to restart the game? Current progress will be lost.')) {
        initializeGame();
        setGameStarted(true);
      }
    } else {
      initializeGame();
      setGameStarted(true);
    }
  };

  // Handle game timeout
  const handleTimeout = () => {
    setGameOver(true);
    toast({
      title: "Time's up!",
      description: `Game over! Final score: ${score}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-boggle-light to-white">
      <div className="container max-w-5xl mx-auto p-4">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-boggle-dark mb-2">BCT Boggle Blitz</h1>
          <p className="text-boggle-secondary">Find as many words as you can in 3 minutes!</p>
        </header>

        {/* Game Status Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <BoggleScore score={score} className="w-full md:w-auto" />
          <BoggleTimer 
            initialTime={GAME_TIME} 
            onTimeout={handleTimeout} 
            isRunning={gameStarted && !gameOver} 
            className="w-full md:w-1/3"
          />
          <BoggleRules className="w-full md:w-auto" />
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Word List */}
          <div className="space-y-6 order-2 lg:order-1">
            <BoggleWordList 
              words={foundWords} 
              scores={wordScores}
            />
            <BoggleScoreExplainer />
          </div>
          
          {/* Middle Column - Game Board */}
          <div className="order-1 lg:order-2">
            <BoggleBoard 
              board={board}
              selectedPath={selectedPath}
              onDiceClick={handleDiceClick}
            />
          </div>
          
          {/* Right Column - Controls */}
          <div className="space-y-6 order-3">
            <BoggleControls
              currentWord={currentWord}
              onSubmitWord={handleSubmitWord}
              onClearSelection={clearSelection}
              onNewGame={handleNewGame}
              gameStarted={gameStarted}
              gameOver={gameOver}
            />
            
            {gameOver && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2 text-boggle-dark">Game Over!</h3>
                <p className="mb-2">Final Score: <span className="font-bold text-boggle-primary">{score}</span></p>
                <p className="mb-2">Words Found: <span className="font-bold">{foundWords.length}</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
