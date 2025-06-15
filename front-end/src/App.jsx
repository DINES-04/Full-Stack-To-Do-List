import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch todos on load
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/todos');
        setTodos(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCompletedTodos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/todos/completed');
        setCompletedTodos(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTodos();
    fetchCompletedTodos();
  }, []);

  // Add a new todo
  const handleAddTodo = () => {
    if (!newTitle.trim()) {
      alert('Title is required!');
      return;
    }

    if (!newDescription.trim()) {
      alert('Description is required!');
      return;
    }

    if (!newEmail.trim()) {
      alert('Email is required!');
      return;
    }

    const newTodo = { title: newTitle, description: newDescription, email: newEmail };
    axios.post('http://localhost:5000/todos', newTodo)
      .then(res => {
        setTodos([...allTodos, res.data]);
        setNewTitle('');
        setNewDescription('');
        setNewEmail('');
      })
      .catch(err => console.error(err));
  };

  // Delete a todo
  const handleDeleteTodo = id => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(allTodos.filter(todo => todo._id !== id));
        setCompletedTodos(completedTodos.filter(todo => todo._id !== id));
      })
      .catch(err => console.error(err));
  };

  // Complete a todo
  const handleComplete = id => {
    const todo = allTodos.find(todo => todo._id === id); // Find the todo that was clicked to complete

    axios.patch(`http://localhost:5000/todos/complete/${id}`, { email: todo.email })
      .then(res => {
        setCompletedTodos([...completedTodos, res.data]); // Add the completed todo to the completedTodos state
        setTodos(allTodos.filter(todo => todo._id !== id)); // Remove the completed todo from the active todos state
      })
      .catch(err => console.error(err));
  };

  // Edit a todo
  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = value => {
    setCurrentEditedItem(prev => ({
      ...prev,
      title: value,
    }));
  };

  const handleUpdateDescription = value => {
    setCurrentEditedItem(prev => ({
      ...prev,
      description: value,
    }));
  };

  const handleUpdateToDo = () => {
    axios.put(`http://localhost:5000/todos/${currentEditedItem._id}`, currentEditedItem)
      .then(res => {
        const updatedTodos = allTodos.map(todo =>
          todo._id === res.data._id ? res.data : todo
        );
        setTodos(updatedTodos);
        setCurrentEdit('');
      })
      .catch(err => console.error(err));
  };

  // Filter todos based on search term
  const filteredTodos = allTodos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompletedTodos = completedTodos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>To Do List</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
              required
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
              required
            />
          </div>
          <div className="todo-input-item">
            <label>Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              placeholder="Enter your email for reminders"
              required
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
            id="todo"
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
            id="todo1"
          >
            Completed
          </button>
        </div>

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            width: '70%',
            marginBottom: '15px',
            display: 'flex',
            marginLeft: '10%',
            marginTop: '7px',
            outline: 'none',
          }}
        />

        <div className="todo-list">
          {!isCompleteScreen && filteredTodos.map((item, index) => {
            if (currentEdit === index) {
              return (
                <div className="edit__wrapper" key={index}>
                  <input
                    placeholder="Updated Title"
                    onChange={e => handleUpdateTitle(e.target.value)}
                    value={currentEditedItem.title}
                  />
                  <textarea
                    placeholder="Updated Description"
                    rows={4}
                    onChange={e => handleUpdateDescription(e.target.value)}
                    value={currentEditedItem.description}
                  />
                  <button
                    type="button"
                    onClick={handleUpdateToDo}
                    className="primaryBtn"
                  >
                    Update
                  </button>
                </div>
              );
            } else {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteTodo(item._id)}
                      title="Delete?"
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => handleComplete(item._id)}
                      title="Complete?"
                    />
                    <AiOutlineEdit
                      className="check-icon"
                      onClick={() => handleEdit(index, item)}
                      title="Edit?"
                    />
                  </div>
                </div>
              );
            }
          })}

          {isCompleteScreen && filteredCompletedTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <small>Completed on: {item.completedOn}</small>
                  </p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDeleteTodo(item._id)}
                    title="Delete?"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
