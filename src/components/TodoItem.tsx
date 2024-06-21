import React from 'react';
import { Todo } from '../types';
import iconCheck from '../images/icon-check.svg';
import iconCross from '../images/icon-cross.svg';

interface Props {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="todo-item">
      <div className="todo-check" onClick={onToggle}>
        <img src={iconCheck} alt="check icon" className={todo.completed ? 'checked' : ''} />
      </div>
      <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      <button onClick={onDelete}>
        <img src={iconCross} alt="delete icon" />
      </button>
    </div>
  );
};

export default TodoItem;
