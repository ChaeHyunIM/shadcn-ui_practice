import { atom } from "jotai";

export type csvData = {
  Cluster: string;
  제목: string;
}[];

export const fileAtom = atom<csvData>([]);
