import { useReducer, useState } from 'react';
import TodoList from './TodoList';
import './App.css';

const initialState = {
  todos: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { text: action.payload, completed: false, isEditing: false }],
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.payload),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload ? { ...todo, isEditing: true } : todo
        ),
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload.index ? { ...todo, text: action.payload.text, isEditing: false } : todo
        ),
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [todo, setTodo] = useState('');

  const handleAddTodo = () => {
    if (todo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: todo });
      setTodo('');
    }
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <div className="todo-input">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <TodoList todos={state.todos} dispatch={dispatch} />
    </div>
  );
};

export default App;
