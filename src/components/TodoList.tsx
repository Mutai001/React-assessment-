import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Trash2, Edit, Check, X } from 'lucide-react';
import { Action, Todo } from '../reducer'; // Import Todo and Action types from reducer

interface TodoListProps {
  todos: Todo[];
  dispatch: React.Dispatch<Action>; // Explicitly typed as Dispatch<Action>
  onClearCompleted: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, dispatch, onClearCompleted }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const handleToggle = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      dispatch({
        type: 'EDIT_TODO',
        payload: { id: editingId, text: editText },
      });
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (todos.length === 0) {
    return (
      <div className="todo-list empty-state">
        <div className="empty-message">
          <h3>Your task list is empty</h3>
          <p>Add a new task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div
            className="todo-items"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredTodos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id}
                index={index}
                isDragDisabled={editingId === todo.id}
              >
                {(provided, snapshot) => (
                  <div
                    className={`todo-item ${snapshot.isDragging ? 'dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {editingId === todo.id ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit();
                            if (e.key === 'Escape') handleCancelEdit();
                          }}
                        />
                        <div className="edit-actions">
                          <button
                            onClick={handleSaveEdit}
                            className="save-button"
                            aria-label="Save edits"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="cancel-button"
                            aria-label="Cancel edits"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="todo-content">
                          <label className="checkbox-container">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() => handleToggle(todo.id)}
                            />
                            <span className="checkbox"></span>
                          </label>
                          <span
                            className={`todo-text ${todo.completed ? 'completed' : ''}`}
                          >
                            {todo.text}
                          </span>
                        </div>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleStartEdit(todo)}
                            className="edit-button"
                            aria-label="Edit todo"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(todo.id)}
                            className="delete-button"
                            aria-label="Delete todo"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="footer">
        <span className="items-left">{itemsLeft} items left</span>
        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;