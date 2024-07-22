// src/store/types.ts
export interface Item {
  id: number;
  name: string;
}

export interface ItemState {
  loading: boolean;
  items: Item[];
  error: string;
}

export interface RootState {
  items: ItemState;
}
