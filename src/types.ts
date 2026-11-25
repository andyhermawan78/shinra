export interface Player {
  id: string;
  name: string;
  avatar: string;
  r1Answer?: string;
  r1Correct?: boolean;
  r1Score: number;
  r2Answer?: string;
  r2Correct?: boolean;
  r2Score: number;
  r2TimeLeft?: number;
  totalScore: number;
}

export type GameStage = 
  | 'LOBBY'
  | 'R1_PLAY'
  | 'R1_HANDOFF'
  | 'R1_SUMMARY'
  | 'R2_PLAY'
  | 'R2_HANDOFF'
  | 'R2_SUMMARY'
  | 'RESULTS';
