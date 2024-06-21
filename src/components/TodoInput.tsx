import React, { useState } from 'react';
import './styles/TodoInput.scss';

interface Props {
  addTodo: (text: string) => void;
}

const TodoInput: React.FC<Props> = ({ addTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Create a new todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default TodoInput;
