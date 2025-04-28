BCT Boggle

Boggle™ is a word game in which players attempt to find words in
sequences of adjacent letters on a plastic grid of lettered dice.
The full game rules: https://en.wikipedia.org/wiki/Boggle#Rules
In Boggle, the scoring is calculated based on the length of the
words found by the players and works like this:
- Each valid word is a given a number of points based on its
character count, the greater the length the more points
(words shorter than 3 letters are not considered).

| Word  length | Points |
|---------------|--------|
| 3, 4 | 1 |
| 5 | 2 |
| 6 | 3 |
| 7 | 5 |
| 8+ | 11 |
- When multiple players are involved, only words that are unique to each player give points. The
same words found by two or more players give zero points.

We would like you to build a primitive but playable version of the Boggle game.
Please provide a solution in JavaScript w/HTML. Use of a framework like AngularJS or similar is welcome if done properly.
Basic requirements
1. All source code, documentation and comments should be written in English.
2. The game only needs to support one player and the web application’s user interface should be
displayed in English. The user should be able to play the game using a mouse and/or keyboard.
3. The rules of the game must be observed, i.e.
    1. Use a fixed board size of 4x4 (total of 16 dice).
    2. Words must be a minimum of 3 characters, each die must not be used more than once
       per word.
    3. Words can only be constructed from the letters of sequentially adjacent dice (e.g. those
       horizontally, vertically, and diagonally neighbouring the current one).
4. The game should use the scoring function you wrote in the first part to compute the player’s
score from the list of words he/she has found.
5. The game does not validate words but assumes what the user enters is correct.

Bonus feature: Limit the playtime to 3 minutes

----
> Lovable
> 07:31 on Apr 28, 2025
> 
> Looking at your request to create a Boggle game, I'm immediately thinking of creating an engaging, retro-styled word game with smooth interactions and classic gameplay elements. I'll draw inspiration from vintage board games while giving it a modern, clean interface.
>
> For the BCT Boggle Blitz game, I'll implement these core features:
>
> A 4x4 grid of letter dice with randomized letters
> Word tracking system for found words
> Scoring based on the specified point system
> Timer functionality for 3-minute gameplay
> Game state management (start, playing, game over)
> Responsive design that works on different screen sizes
>
> For the visual design, I'll use:
> 
> - A retro game-inspired color palette with purple accents
> - Clean typography with a game-like feel
> - Animated dice selection for better user feedback
> - Simple, intuitive UI with clear game state indicators
>
> Let's build this Boggle game that's both nostalgic and enjoyable to play!
> 
> feat: Implement Boggle game
> 
> I've created a playable Boggle game with a 4x4 grid, word tracking system, 3-minute timer, and scoring based on the specified rules. The game features a retro-inspired purple color scheme with an intuitive interface for finding and submitting words.
> 
> What's next?
> - Refine & Customize: Tweak the design, animations, and layouts via prompts or visual edits.
> - Master Prompting: Use clear, detailed, and iterative prompts for better outcomes.
> - GitHub Sync: Transfer your project's code to GitHub for two-way sync of edits.
> - Debug with Ease: Activate our experimental "chat mode" to troubleshoot issues quickly.
> - Add project knowledge: Set key context or custom instructions you want to include in every edit in this project.
>
> Need to save game data, add user accounts, or connect with other services? Supabase is a simple way to add these features without complex technical setup.

----
Can you add word validation using a simple dictionary of known English words?

----
> Lovable
> 07:36 on Apr 28, 2025
> 
> I'll add word validation against a dictionary before accepting submitted words. Let me create a dictionary utility and update the game logic.
> 
> 
> 
> Add word validation
> 
> I've added basic dictionary validation that checks if submitted words exist in a predefined list of common English words. Now when players submit a word, it will first check if it exists in the dictionary before accepting it.

----
Wait, now at the start of the play (after clicking "Play Again"), the "Time Left" shows 00:00 in red and there's indeed no time given at all to play... Can you fix that?

----
> Lovable
> 07:44 on Apr 28, 2025
> 
> Let me check what's causing the timer issue when starting a new game.
> 
> Looking at the BoggleTimer component and session replay data, the issue appears to be that the timer state isn't being properly reset when starting a new game. Let's fix this:
> 
> Fix: Reset timer on new game
> 
> The issue has been fixed by adding a new useEffect that resets the timer state (timeLeft and progress) whenever the game starts (isRunning becomes true). This ensures the timer starts from the initial time when a new game begins.
> 
> Refactor Index.tsx

----
The dictionary used is very limited it seems, how many words does it contain, where does it come from?

----
> Lovable
> 07:49 on Apr 28, 2025
> 
> Let me check the dictionary file to analyze its contents.
> 
> Read
> src/utils/dictionaryUtils.ts
> 
> After analyzing the dictionary file, I can tell you that it's a very basic dictionary containing approximately 350-400 common English words. These are mostly short, common words (3-6 letters) that would be suitable for Boggle, but it's indeed quite limited.
> 
> The dictionary seems to be a hand-picked selection of common English words, focusing on:
> 
> - Basic verbs (act, add, aim, etc.)
> - Common nouns (cat, dog, car, etc.)
> - Simple adjectives (big, hot, old, etc.)
> - Short prepositions and conjunctions (and, for, but, etc.)
>
> This is quite restrictive for a Boggle game, as many valid English words that could be formed on the board would not be recognized. For comparison, a proper Boggle dictionary should contain tens of thousands of words - official Boggle uses dictionaries with 100,000+ words.
> 
> I can propose a plan to significantly improve the word validation by using a more comprehensive dictionary:
> 
> Replace the current static word list with a more comprehensive English dictionary
> 
> We could use one of several open-source word lists like:
> - ENABLE (Enhanced North American Benchmark Lexicon) - ~175,000 words
> - SOWPODS (Official Scrabble Dictionary) - ~270,000 words
> - TWL06 (Tournament Word List) - ~180,000 words
>
> Optimize the dictionary loading and lookup:
> 
> - Load the dictionary asynchronously when the game starts
> - Use a Set or Trie data structure for efficient word lookups
> - Filter out words shorter than 3 letters and longer than 16 letters (max possible in 4x4 grid)
> - Add a loading state while the dictionary is being initialized

----
You can indeed follow-up with the plan and you could use the following source for the dictionary: https://github.com/dwyl/english-words/blob/master/words_alpha.txt

----
> Lovable
> 07:51 on Apr 28, 2025
> 
> I'll help implement a more comprehensive dictionary using the provided word list. Let's download and integrate it.
> 
> The dictionary has been updated to use a much more comprehensive word list. You should now find many more valid words while playing!
> 
> Refactor Index.tsx

