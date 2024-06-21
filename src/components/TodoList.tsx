import React, { useState } from 'react';
import { Todo, Action } from '../types';
import TodoItem from './TodoItem';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface Props {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
}

const TodoList: React.FC<Props> = ({ todos, dispatch }) => {
  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-list">
      <Droppable droppableId="todos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {filteredTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={() => dispatch({ type: 'TOGGLE_TODO' as const, payload: todo.id })}
                      onDelete={() => dispatch({ type: 'DELETE_TODO' as const, payload: todo.id })}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="footer">
        <span>{activeCount} items left</span>
        <div className="filters">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        </div>
        {/* <button className="clear-completed" onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>Clear Completed</button> */}
      </div>
    </div>
  );
};

export default TodoList;
