import React from 'react';
import './styles/TodoItem.scss';

interface Props {
  todo: {
    text: string;
    completed: boolean;
  };
  toggleTodo: () => void;
}

const TodoItem: React.FC<Props> = ({ todo, toggleTodo }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`} onClick={toggleTodo}>
      <input type="checkbox" checked={todo.completed} readOnly />
      <span>{todo.text}</span>
    </div>
  );
};

export default TodoItem;
