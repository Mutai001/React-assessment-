import React from 'react';
import '../styles/TodoInput.scss';

interface Props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
}

const TodoInput: React.FC<Props> = ({ inputValue, setInputValue, addTodo }) => {
  return (
    <div className="todo-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default TodoInput;
