import React, { useReducer, useState } from 'react';
import Header from '../components/Header';
import TodoInput from '../components/TodoInput';
// import TodoList from '../components/TodoList';
// import 'App.scss';
import '../styles/App.scss';

interface TodoAPP {
  id: number;
  text: string;
  completed: boolean;
}

type ActionType = 
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'CLEAR_COMPLETED' };

const reducer = (state: TodoAPP[], action: ActionType): TodoAPP[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [, dispatch] = useReducer(reducer, []);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="app">
      <Header />
      <TodoInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        addTodo={() => {
          dispatch({ type: 'ADD_TODO', text: inputValue });
          setInputValue('');
        }}
      />
      {/* <TodoList
        todos={state}
        toggleTodo={(id: number) => dispatch({ type: 'TOGGLE_TODO', id })}
      /> */}
      <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
        Clear Completed
      </button>
    </div>
  );
};

export default App;
