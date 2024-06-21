import React, { useReducer } from 'react';
import { todoReducer } from '../hooks/Reducer';
import { Todo, Action } from '../hooks/types';
import Header from '../components/Header';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import '../styles/TodoApp.scss';

const TodoApp: React.FC = () => {
  const [todos, dispatch] = useReducer<React.Reducer<Todo[], Action>>(todoReducer, [
    { text: 'Complete online JavaScript course', completed: true },
    { text: 'Jog around the park 3x', completed: false },
    { text: '10 minutes meditation', completed: false },
    { text: 'Read for 1 hour', completed: false },
    { text: 'Pick up groceries', completed: false },
    { text: 'Complete Todo App on Frontend Mentor', completed: false },
  ]);

  const addTodo = (text: string) => dispatch({ type: 'ADD_TODO', text });
  const toggleTodo = (index: number) => dispatch({ type: 'TOGGLE_TODO', index });
  const clearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' });

  return (
    <div className="todo-app">
      <Header />
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div className="footer">
        <span>{todos.filter(todo => !todo.completed).length} items left</span>
        <div className="filters">
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
};

export default TodoApp;
