import React, { useState, useEffect } from 'react';
import AddTask from './AddTask';
import AddProject from './AddProject'
import TaskList from './TaskList';
import ProjectList from './ProjectList';
import './main.css';

const Authorization = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [userTasks, setUserTasks] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [isUpdate, setUpdate] = useState(false);

  const handleInputChange = event => {

    const { name, value } = event.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLogin = event => {

    event.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === formData.username && u.password === formData.password);

    if (user) {

      setUserId(user.id);
      setUserName(user.username);
      setUserTasks(user.tasks);
      setUserProjects(user.projects);

      console.log('Авторизовано!');
    } 
      else {

        console.error('Error logging in: Помилка авторизації');
      }
  };

  const handleOnUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
      
    const updateUserData = () => {

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find((user) => user.id === userId);

      if (user) {
        setUserName(user.username);
        setUserTasks(user.tasks);
        setUserProjects(user.projects);
      } 
      else {
        console.error('Error logging in: Помилка оновлення даних!');
      }
    };

    if (isUpdate) {

      updateUserData();
      setUpdate(false);
    }
  }, [isUpdate]);

  const handleLogout = () => {

    setUserId(null);
    setUserName(null);
    setUserTasks([]);
    setUserProjects([]);
    setFormData({
      username: '',
      password: ''
    });
  };

  return (
    <div>
      {!userId && (
        <div className='container'>
          <form name="authorization" onSubmit={handleLogin} className="col">
            <h2>Авторизація</h2>
            <div className="col">
              <label htmlFor="username">Username:</label>
              <input 
                type="text" 
                name="username" 
                id="username"
                value={formData.username} 
                onChange={handleInputChange} 
                autoComplete="username" 
              />
            </div>
            <div className="col">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </div>
            <button type="submit">Увійти</button>
          </form>
        </div>
      )}
      {userId && (
        <div className="userLogin">
          <div className='row center'>
            <h2>{userName}</h2>
            <button type="button" onClick={handleLogout}>Вийти</button>
          </div>
          <div className="row">
            <div className="col">
            <AddTask 
              userId={userId} 
              onUpdate={handleOnUpdate}
            />
            <AddProject 
              userId={userId}
              onUpdate={handleOnUpdate} 
            />
          </div>
          <div className='col'>
            <ProjectList 
              userProjects={userProjects} 
              userTasks={userTasks} 
              userId={userId}
              onUpdate={handleOnUpdate}
            />
            <TaskList 
              userTasks={userTasks} 
              userId={userId}
              onUpdate={handleOnUpdate}
            />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authorization;