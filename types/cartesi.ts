export type Notice = {
  index: number;
  input: { index: number };
  payload: string;
};

export type Report = Notice;

export type Voucher = Notice & {
  destination: string;
};

export type GraphQLResponse<T> = {
  data: T;
};
