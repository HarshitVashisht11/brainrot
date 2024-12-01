export interface ProfileAnalysis {
    scores: {
      chillGuyScore: number;
      brainRotScore: number;
      hustleCultureScore: number;
      authenticityScore: number;
      memePotential: number;
    };
    analysis: string;
    brainRotQuotes: string[];
  }
  
  export interface BrainRotContent {
    type: 'linkedin' | 'tweet' | 'post';
    content: string;
    score: number;
  }