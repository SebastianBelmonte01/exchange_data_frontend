import {Query} from "./Query";

export interface Currency {
  id: number;
  success: boolean;
  query: Query;
  info: null | string;
  date: string;
  result: number;
  isSeen: boolean;
}
