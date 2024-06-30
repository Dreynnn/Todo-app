import { useState } from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, dispatch }) => {
  const [editText, setEditText] = useState('');

  const handleEditClick = (index, text) => {
    setEditText(text);
    dispatch({ type: 'EDIT_TODO', payload: index });
  };

  const handleUpdateClick = (index) => {
    if (editText.trim()) {
      dispatch({ type: 'UPDATE_TODO', payload: { index, text: editText } });
      setEditText('');
    }
  };

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li key={index} className={todo.completed ? 'completed' : ''}>
          {todo.isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <span
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: index })}
              className="todo-text"
            >
              {todo.text}
            </span>
          )}
          {todo.isEditing ? (
            <button onClick={() => handleUpdateClick(index)}>Save</button>
          ) : (
            <button onClick={() => handleEditClick(index, todo.text)}>Edit</button>
          )}
          <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: index })}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      isEditing: PropTypes.bool.isRequired,
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default TodoList;
