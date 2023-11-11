import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './main.css';

const AddProject = ({ userId, onUpdate }) => {

  const [projectData, setProjectData] = useState({
    title: '',
    description: ''
  });

  const handleInputChange = event => {

    const { name, value } = event.target;

    setProjectData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = event => {

    event.preventDefault();

    const projectId = uuidv4();
    const newProjectData = { ...projectData, id: projectId };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userToUpdate = users.find((user) => user.id === userId);

    if (userToUpdate) {

      userToUpdate.projects.push(newProjectData);

      const updatedUsers = users.map((user) => {

        if (user.id === userId) {
          return userToUpdate;
        }
        return user;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } 
      else {

        console.error('Помилка при додаванні проекту.');
      }

    setProjectData({
      title: '',
      description: ''
    });

    onUpdate();
  };

  return (
    <div className='item sidebar'>
      <h3>Додати проєкт</h3>
      <form name="add-project" onSubmit={handleSubmit} className="col">
      <div className='col'>
          <label htmlFor='projecttitle'>Назва:</label>
          <input 
            id="projecttitle" 
            type="text" 
            name="title" 
            value={projectData.title} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className='col'>
          <label htmlFor='projectdescription'>Опис:</label>
          <textarea 
            id="projectdescription" 
            name="description" 
            value={projectData.description} 
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Зберегти проєкт</button>
      </form>
    </div>
  );
};

export default AddProject;