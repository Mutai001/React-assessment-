import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../hooks/types';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  toggleTodo: (index: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} toggleTodo={() => toggleTodo(index)} />
      ))}
    </div>
  );
};

export default TodoList;
