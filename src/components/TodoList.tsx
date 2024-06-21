import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../hooks/types';
import './TodoList.scss';

interface Props {
  todos: (Todo & { id: number })[]; // Add 'id' property to the 'Todo' type
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={() => toggleTodo(todo.id)} />
      ))}
    </div>
  );
};

export default TodoList;
