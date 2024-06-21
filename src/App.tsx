import React from 'react';
import TodoApp from './components/TodoApp';
import '../src/styles/App.scss'

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
};

export default App;
