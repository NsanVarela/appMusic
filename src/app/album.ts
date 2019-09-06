export class Album {
  id: string;
  ref: string;
  name: string;
  title: string;
  description: string;
  duration: number;
  status: string;
  note: Array<number>;
  url?: string;
  tags?: Array<string>;
  like?: string;
}

export class List {
  id: string;
  list: Array<string>;
}
