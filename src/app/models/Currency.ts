import {Query} from "./Query";

export interface Currency {
  success: boolean;
  query: Query;
  info: null | string;
  date: string;
  result: number;
}
