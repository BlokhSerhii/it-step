import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './main.css';

const AddTask = ({ userId, project, onUpdate }) => {

  const [taskData, setTaskData] = useState({
    id: '',
    title: '',
    dateTime: '',
    description: '',
    tags: 'private',
    priority: 'high',
    projectId: project?.id || '',
    projectTitle: project?.title || ''
  });

  const [isPrivateChecked, setIsPrivateChecked] = useState(true);
  const [isBusinessChecked, setIsBusinessChecked] = useState(false);

  const handleInputChange = event => {

    const { name, value } = event.target;

    setTaskData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTagChange = event => {

    const { value, checked } = event.target;

    if (value === 'private') {

      setIsPrivateChecked(checked);
      setIsBusinessChecked(false);
    } 
      else if (value === 'business') {
        
        setIsBusinessChecked(checked);
        setIsPrivateChecked(false);
      };

    if (checked) {

      setTaskData(prevData => ({
        ...prevData,
        tags: value
      }));
    } 
      else {

        setTaskData(prevData => ({
          ...prevData,
          tags: prevData.tags.filter(tag => tag !== value)
        }));
      };
  };

  const handleSubmit = event => {

    event.preventDefault();

    const taskId = uuidv4();
    const newTaskData = { ...taskData, id: taskId };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userToUpdate = users.find((user) => user.id === userId);

    if (userToUpdate) {

      userToUpdate.tasks.push(newTaskData);

      const updatedUsers = users.map((user) => {

        if (user.id === userId) {
          return userToUpdate;
        };

        return user;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } 
      else {
        console.error('Помилка при додаванні завдання.');
      };

    setTaskData({
      id: '',
      title: '',
      dateTime: '',
      description: '',
      tags: 'private',
      priority: 'high',
      projectId: project?.id || '',
      projectTitle: project?.title || ''
    });

    setIsPrivateChecked(true);
    setIsBusinessChecked(false);

    onUpdate();
  };

  return (
    <div className='item sidebar'>
      <h3>Додати завдання</h3>
      <form name="add-task" onSubmit={handleSubmit} className="col">
          <div className='col'>
            <label htmlFor="title">Назва:</label>
            <input 
              type="text" 
              name="title"
              id="title" 
              value={taskData.title} 
              onChange={handleInputChange} 
              required
            />
          </div>
          <div className='col'>
            <label htmlFor="dateTime">Час:</label>
            <input 
              type="datetime-local" 
              name="dateTime" 
              id="dateTime"
              value={taskData.dateTime} 
              onChange={handleInputChange} 
              required
            />
          </div> 
        <div className='col'>
          <label htmlFor="description">Опис:</label>
          <textarea 
            name="description" 
            id="description"
            value={taskData.description} 
            onChange={handleInputChange} 
            required
          />
        </div>
        <div>
          <label htmlFor="private">
            <input 
              type="checkbox" 
              name="tags" 
              id="private"
              value="private" 
              onChange={handleTagChange} 
              checked={isPrivateChecked} 
            /> Приватнe
          </label>
          <label htmlFor="business">
            <input 
              type="checkbox" 
              name="tags" 
              id="business"
              value="business" 
              onChange={handleTagChange} 
              checked={isBusinessChecked} 
            /> Діловe
          </label>
        </div>
        <div>
          <label htmlFor="priority">пріоритет:</label>
          <select name="priority" id="priority" value={taskData.priority} onChange={handleInputChange}>
            <option value="high">Високий</option>
            <option value="medium">Середній</option>
            <option value="low">Низький</option>
          </select>
        </div>
        <button type="submit">Зберегти завдання</button>
      </form>
    </div>
  );
};

export default AddTask;