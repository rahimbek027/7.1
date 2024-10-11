
import React, { useReducer, useState } from 'react';
import './TodoApp.css'; 

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, { id: Date.now(), text: action.payload, liked: false }] };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, liked: !todo.liked } : todo
        ),
      };
    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id} className={todo.liked ? 'liked' : ''}>
            <span>{todo.text}</span>
            <button onClick={() => dispatch({ type: 'TOGGLE_LIKE', payload: todo.id })}>
              {todo.liked ? 'Unlike' : 'Like'}
            </button>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
