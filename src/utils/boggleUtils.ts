
// Define common dice configurations
export const BOGGLE_DICE = [
  ['A', 'A', 'E', 'E', 'G', 'N'],
  ['A', 'B', 'B', 'J', 'O', 'O'],
  ['A', 'C', 'H', 'O', 'P', 'S'],
  ['A', 'F', 'F', 'K', 'P', 'S'],
  ['A', 'O', 'O', 'T', 'T', 'W'],
  ['C', 'I', 'M', 'O', 'T', 'U'],
  ['D', 'E', 'I', 'L', 'R', 'X'],
  ['D', 'E', 'L', 'R', 'V', 'Y'],
  ['D', 'I', 'S', 'T', 'T', 'Y'],
  ['E', 'E', 'G', 'H', 'N', 'W'],
  ['E', 'E', 'I', 'N', 'S', 'U'],
  ['E', 'H', 'R', 'T', 'V', 'W'],
  ['E', 'I', 'O', 'S', 'S', 'T'],
  ['E', 'L', 'R', 'T', 'T', 'Y'],
  ['H', 'I', 'M', 'N', 'U', 'Qu'],
  ['H', 'L', 'N', 'N', 'R', 'Z'],
];

// Generate random board
export const generateBoggleBoard = (): string[][] => {
  // Shuffle the dice
  const shuffledDice = [...BOGGLE_DICE].sort(() => 0.5 - Math.random());
  
  // Generate a 4x4 board
  const board: string[][] = Array(4).fill(null).map(() => Array(4).fill(''));
  
  // Assign a random face from each die to the board
  let dieIndex = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const die = shuffledDice[dieIndex];
      const randomFace = die[Math.floor(Math.random() * die.length)];
      board[row][col] = randomFace;
      dieIndex++;
    }
  }
  
  return board;
};

// Check if two positions are adjacent
export const arePositionsAdjacent = (
  [row1, col1]: number[],
  [row2, col2]: number[]
): boolean => {
  const rowDiff = Math.abs(row1 - row2);
  const colDiff = Math.abs(col1 - col2);
  
  // Adjacent if difference in row and col are both <= 1 (including diagonals)
  // And not the same position
  return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
};

// Calculate score for a word based on its length
export const calculateWordScore = (word: string): number => {
  const length = word.length;
  
  if (length <= 4) return 1;
  if (length === 5) return 2;
  if (length === 6) return 3;
  if (length === 7) return 5;
  return 11; // 8 or more letters
};
