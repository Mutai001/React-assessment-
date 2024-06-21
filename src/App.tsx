import React, { useReducer, useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import reducer, { initialState } from './reducer';
import iconSun from './images/icon-sun.svg';
import iconMoon from './images/icon-moon.svg';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState('');
  const [theme, setTheme] = useState('dark');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  // Remove the declaration of handleClearCompleted since it is not being used

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedTodos = Array.from(state.todos);
    const [movedTodo] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, movedTodo);
    dispatch({ type: 'SET_TODOS', payload: updatedTodos });
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>TODO</h1>
        <button className="theme-toggle" onClick={handleToggleTheme}>
          <img src={theme === 'dark' ? iconSun : iconMoon} alt="theme toggle icon" />
        </button>
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <TodoList todos={state.todos} dispatch={dispatch} />
      </DragDropContext>
      <div className="drag-and-drop">Drag and drop to reorder list</div>
    </div>
  );
};

export default App;
