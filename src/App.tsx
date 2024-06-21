import React, { useReducer, useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import reducer, { initialState } from './reducer';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TODO</h1>
        <div className="new-todo">
          <input
            type="text"
            placeholder="Create a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
      </header>
      <TodoList todos={state.todos} dispatch={dispatch} />
    </div>
  );
};

export default App;
