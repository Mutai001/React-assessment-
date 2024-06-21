export interface Todo {
  text: string;
  completed: boolean;
}

export type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; index: number }
  | { type: 'CLEAR_COMPLETED' };
