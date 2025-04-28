const DICTIONARY_URL = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';

let englishWords = new Set<string>();
let dictionaryLoaded = false;

export const loadDictionary = async (): Promise<void> => {
  if (dictionaryLoaded) return;
  
  try {
    const response = await fetch(DICTIONARY_URL);
    const text = await response.text();
    
    // Split the text into words and filter for valid Boggle words (3-16 letters)
    const words = text
      .split('\n')
      .map(word => word.trim().toLowerCase())
      .filter(word => word.length >= 3 && word.length <= 16);
    
    englishWords = new Set(words);
    dictionaryLoaded = true;
    console.log(`Dictionary loaded with ${englishWords.size} words`);
  } catch (error) {
    console.error('Failed to load dictionary:', error);
    // Fallback to the basic word list if loading fails
    englishWords = new Set([
      "about", "above", "ace", "act", "add", "age", "ago", "aid", "aim", "air",
      "all", "also", "and", "any", "are", "arm", "art", "ash", "ask", "bad",
      "bag", "ban", "bar", "bat", "bay", "bed", "bee", "beg", "bet", "bid",
      "big", "bit", "box", "boy", "bug", "bus", "but", "buy", "bye", "cab",
      "can", "cap", "car", "cat", "cry", "cup", "cut", "dad", "dam", "dan",
      "day", "die", "dig", "dim", "dip", "dog", "dot", "dry", "due", "dug",
      "ear", "eat", "egg", "ego", "end", "era", "eye", "fan", "far", "fat",
      "fee", "few", "fig", "fix", "fly", "fog", "for", "fox", "fun", "fur",
      "gap", "gas", "gel", "get", "god", "got", "gun", "gut", "guy", "gym",
      "had", "ham", "hat", "hay", "her", "hey", "him", "hip", "his", "hit",
      "hop", "hot", "how", "hub", "hue", "hug", "hut", "ice", "ink", "inn",
      "into", "iris", "its", "jam", "jar", "jaw", "jet", "job", "jog", "joy",
      "key", "kid", "kit", "lab", "lac", "lay", "leg", "let", "lid", "lie",
      "lip", "lit", "log", "lot", "low", "mad", "man", "map", "mat", "may",
      "men", "met", "mix", "mob", "mod", "mom", "mood", "moon", "mop", "moss",
      "mud", "mug", "nail", "name", "navy", "near", "neat", "neck", "need",
      "nest", "net", "new", "news", "next", "nice", "nick", "nine", "node",
      "nose", "note", "noun", "nuts", "oak", "oats", "ocean", "odd", "odds",
      "oil", "okay", "old", "one", "only", "open", "oral", "orange", "ore",
      "our", "out", "oven", "over", "pace", "pack", "page", "paid", "pain",
      "pair", "palm", "park", "part", "pass", "past", "path", "peak", "pear",
      "peer", "pest", "pick", "pier", "pile", "pine", "pink", "pit", "plan",
      "play", "plot", "plug", "plus", "poem", "poet", "pole", "poll", "pond",
      "pool", "poor", "port", "post", "pot", "pour", "pray", "prep", "pull",
      "pure", "push", "quit", "race", "rail", "rain", "rake", "rank", "rare",
      "rate", "raw", "read", "real", "red", "rest", "rice", "rich", "ride",
      "ring", "ripe", "rise", "risk", "road", "rock", "role", "roll", "roof",
      "room", "root", "rope", "rose", "rule", "rush", "rust", "sad", "safe",
      "sail", "sale", "salt", "same", "sand", "save", "say", "seal", "seat",
      "seed", "seek", "seem", "self", "sell", "send", "sent", "ship", "shop",
      "shot", "show", "shut", "sick", "side", "sign", "silk", "sing", "sink",
      "site", "size", "skin", "skip", "sky", "slam", "slip", "slow", "snap",
      "snow", "soap", "sock", "soft", "soil", "sold", "some", "song", "soon",
      "sort", "soul", "soup", "spot", "star", "stay", "step", "stop", "such",
      "suit", "sure", "swim", "tail", "take", "tale", "talk", "tall", "tank",
      "tape", "task", "team", "tear", "tell", "tent", "term", "test", "text",
      "than", "that", "them", "then", "they", "thin", "this", "thus", "tide",
      "tile", "time", "tiny", "tire", "tone", "tool", "top", "torn", "tour",
      "town", "trap", "tray", "tree", "trip", "true", "tube", "turn", "twin",
      "type", "unit", "upon", "use", "used", "user", "vary", "vast", "very",
      "view", "vote", "wait", "wake", "walk", "wall", "want", "war", "warm",
      "wash", "wave", "way", "wear", "weed", "week", "well", "went", "were",
      "west", "what", "when", "whip", "who", "wide", "wife", "wild", "will",
      "wind", "wine", "wing", "wire", "wise", "wish", "with", "wood", "word",
      "wore", "work", "yard", "yarn", "year", "yes", "yet", "you", "your",
      "zero", "zone", "zoo"
    ]);
    console.log(`Dictionary loaded with ${englishWords.size} words`);
  }
};

export const isValidWord = (word: string): boolean => {
  return englishWords.has(word.toLowerCase());
};

// Initial dictionary load
loadDictionary();
