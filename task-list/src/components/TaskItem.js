import React, { useState } from 'react';
import './main.css';

const TaskItem = ({ task, userId, onUpdate }) => {

  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    dateTime: task.dateTime,
    description: task.description
  });

  const handleEdit = () => {

    setEditing(true);
  };

  const handleInputChange = event => {

    const { name, value } = event.target;

    setEditedTask(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = taskId => {
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userToUpdate = users.find((user) => user.id === userId);

    if (userToUpdate) {
      const taskIndex = userToUpdate.tasks.findIndex(task => task.id === taskId);
    
      if (taskIndex !== -1) {
        userToUpdate.tasks[taskIndex] = { ...userToUpdate.tasks[taskIndex], ...editedTask };
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Дані збережено.');
      } 
        else {
          console.error('Помилка при редагуванні завдання: завдання не знайдено.');
        };
    } 
      else {
        console.error('Помилка при редагуванні завдання: користувач не знайдений.');
      };

    setEditing(false);
    onUpdate();
  };

  const handleDelete = taskId => {

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userToUpdate = users.find((user) => user.id === userId);

    if (userToUpdate) {

      userToUpdate.tasks = userToUpdate.tasks.filter(task => task.id !== taskId);

      const updatedUsers = users.map((user) => {

        if (user.id === userId) {
          return userToUpdate;
        }

        return user;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      console.log('Завдання видалено.');
    } 
      else {

        console.error('Помилка при видалені завдання.');
      };

    onUpdate();
  };

  return (
    <div>
      {editing ? (
        <div className="col center">
          <input 
            className='edit-text' 
            type="text" 
            name="title" 
            value={editedTask.title} 
            onChange={handleInputChange} 
          />
          <input 
            className='edit-text' 
            type="datetime-local" 
            name="dateTime" 
            value={editedTask.dateTime} 
            onChange={handleInputChange} 
          />
          <textarea 
            className='edit-text' 
            name="description" 
            value={editedTask.description} 
            onChange={handleInputChange} 
          />
          <button type="button" onClick={() => handleSave(task.id)}>Зберегти</button>
        </div>
      ) : (
        <div className="col">
          <p>{task.tags}</p>
          <p>{task.description}</p>
          <div className="row center">
            <button className='edit' type='button' onClick={handleEdit}>Редагувати</button>
            <button className='edit' type='button' onClick={() => handleDelete(task.id)}>Видалити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;