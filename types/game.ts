// Generated by https://quicktype.io

export interface NewGameResponse {
  data: Data;
}

export interface Data {
  newGame: NewGame;
}

export interface NewGame {
  state: Array<number[]>;
  score: number;
  finished: boolean;
}

// Generated by https://quicktype.io

export interface ProcessGameResponse {
  data: Data;
}

export interface Data {
  processGame: ProcessGame;
}

export interface ProcessGame {
  state: Array<number[]>;
  score: number;
  finished: boolean;
}