import React from 'react';
import { Todo, Action } from '../types';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
}

const TodoList: React.FC<Props> = ({ todos, dispatch }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
          onDelete={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
        />
      ))}
    </div>
  );
};

export default TodoList;
