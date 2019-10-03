export class Album {
  id: string;
  ref: string;
  name: string;
  title: string;
  description: string;
  duration: number;
  status: string;
  url?: string;
  like?: string;
  tags?: Array<string>;
  note?: Array<number>;
  price?: number;
  priceTTC?: number;
}

export class List {
  id: string;
  list: Array<string>;
}

export class Time {
  hour: number;
  minute: number;
  second: number;
}

export class StatusPlayer {
  albumId: string;
  song: string;
  playing: boolean;
  current: number;
  total: number;
  ratio: number;
}
