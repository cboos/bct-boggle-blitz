
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface BoggleTimerProps {
  initialTime: number; // in seconds
  onTimeout: () => void;
  isRunning: boolean;
  className?: string;
}

const BoggleTimer: React.FC<BoggleTimerProps> = ({ 
  initialTime, 
  onTimeout, 
  isRunning,
  className
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeout]);

  useEffect(() => {
    setProgress((timeLeft / initialTime) * 100);
  }, [timeLeft, initialTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">Time Left</span>
        <span className={cn(
          "text-sm",
          timeLeft < 30 && "text-red-500 animate-pulse"
        )}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <Progress 
        value={progress} 
        className={cn(
          "h-2",
          timeLeft < 30 && "bg-red-200 [&>div]:bg-red-500"
        )} 
      />
    </div>
  );
};

export default BoggleTimer;
