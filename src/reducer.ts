import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface State {
  todos: Todo[];
}

export const initialState: State = {
  todos: []
};

type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            text: action.payload,
            completed: false,
          },
        ],
      };
      
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
      
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
      
    case 'CLEAR_COMPLETED':
      return {
        todos: state.todos.filter((todo) => !todo.completed),
      };
      
    case 'SET_TODOS':
      return {
        todos: action.payload,
      };
      
    case 'EDIT_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
      
    default:
      return state;
  }
};

export default reducer;