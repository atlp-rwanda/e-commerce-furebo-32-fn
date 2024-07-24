// src/store/types.ts
export interface Item {
  name: string;
  id: number;
}

export interface ItemState {
  loading: boolean;
  items: Item[];
  error: string;
}

export interface RootState {
  user: any;
  items: ItemState;
}