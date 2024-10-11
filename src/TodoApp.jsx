import React, { useReducer, useState } from 'react';
import './TodoApp.css';
import Modal from './Modal';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodoToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: todoToDelete });
    setModalOpen(false);
    setTodoToDelete(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {state.todos.map((todo, index) => (
          <li key={todo.id} className={todo.liked ? 'liked' : ''}>
            {todo.text}
            <div className="actions-container">
              <button onClick={() => dispatch({ type: 'TOGGLE_LIKE', payload: todo.id })}>
                {todo.liked ? 'Unlike' : 'Like'}
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
};

export default TodoApp;
