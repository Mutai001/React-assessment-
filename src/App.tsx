import React from 'react';
import './styles/App.scss';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import useTodos from './hooks/useTodos';

const App: React.FC = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="container">
      <Header />
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
};

export default App;
