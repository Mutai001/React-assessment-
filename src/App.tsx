import React, { useReducer, useState, useEffect } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import reducer, { initialState } from './reducer';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Sparkles, Sun, Moon, Plus } from 'lucide-react';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState('');
  const [theme, setTheme] = useState('dark');
  const [isFocused, setIsFocused] = useState(false);
  const [showCompleteAnimation, setShowCompleteAnimation] = useState(false);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTodos) {
      dispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
    }
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const handleAddTodo = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
      showCompletionAnimation();
    }
  };

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

  const showCompletionAnimation = () => {
    setShowCompleteAnimation(true);
    setTimeout(() => setShowCompleteAnimation(false), 1500);
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className={`app ${theme}`}>
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
      
      <header className="app-header">
        <div className="title-container">
          <h1>
            <Sparkles className="sparkle-icon" size={28} />
            TASKIFY
          </h1>
          <button className="theme-toggle" onClick={handleToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        
        <form className={`new-todo ${isFocused ? 'focused' : ''}`} onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="Create a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="add-button" aria-label="Add new todo">
            <Plus size={20} />
          </button>
        </form>
      </header>

      {showCompleteAnimation && (
        <div className="complete-animation">Task added successfully!</div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <TodoList 
          todos={state.todos} 
          dispatch={dispatch} 
          onClearCompleted={handleClearCompleted}
        />
      </DragDropContext>
      
      <div className="drag-and-drop">
        <span className="drag-icon">≡</span> Drag and drop to reorder list
      </div>
      
      <footer className="app-footer">
        <div className="stats">
          <span>Total: {state.todos.length} tasks</span>
          <span>Completed: {state.todos.filter(todo => todo.completed).length}</span>
        </div>
        <div className="credits">Taskify © {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
};

export default App;