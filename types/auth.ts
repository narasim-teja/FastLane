export type DailySignInAuth = {
  user: string;
  time: number;
  rsv: Rsv;
};

export type Rsv = {
  r: string;
  s: string;
  v: number;
};
