import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import './main.css';

const ProjectList = ({ userId, userProjects, userTasks, onUpdate }) => {

  const [tasks, setTasks] = useState(userTasks || []);
  const [projects, setProjects] = useState(userProjects || []);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addNewTask, setAddNewTask] = useState(false);

  useEffect(() => {

    setTasks(userTasks);
    setProjects(userProjects);
  }, [userProjects, userTasks]);

  
  const closeModal = () => {

    setIsModalOpen(false);
  };

  const handleDeleteProject = (projectId) => {

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userToUpdate = users.find((user) => user.id === userId);

    if (userToUpdate) {

      userToUpdate.tasks = userToUpdate.tasks.filter(task => task.projectId !== projectId);
      userToUpdate.projects = userToUpdate.projects.filter(project => project.id !== projectId);

      const updatedUsers = users.map((user) => {

        if (user.id === userId) {
          return userToUpdate;
        };

        return user;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));

      console.log('Проект видалено.');
      closeModal();
    } 
      else {
        console.error('Помилка при видалені проекту.');
      };

    onUpdate();
  };

  const handleProjectClick = (project) => {

    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className='item taskbar'>
      <h2>Проєкти</h2>
      <ul className='row'>
        {projects.map((project) => (
          <li key={project.id}>
            <h2 onClick={() => handleProjectClick(project)}><span>{project.title}</span></h2>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedProject && (
        <div className="modal">
          <h2>{selectedProject.title}</h2>
          <p>{selectedProject.description}</p>
          <button type='button' onClick={() => setAddNewTask(!addNewTask)}>{!addNewTask ? 'Додати завдання' : 'Відмінити'}</button>
          {addNewTask && (
            <div className='row center'>
              <AddTask userId={userId} project={selectedProject}onUpdate={onUpdate} />
            </div>
          )}
          <TaskList userId={userId} userTasks={tasks} project={selectedProject}onUpdate={onUpdate} />
          <div className='row center'>
            <button type='button' onClick={() => handleDeleteProject(selectedProject.id)}>Видалити проєкт</button>
          </div>
          <button type="button" onClick={closeModal}>Закрити</button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;