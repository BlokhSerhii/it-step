import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import './main.css';

const TaskList = ({ userId, userTasks, project, onUpdate }) => {

  const [tasks, setTasks] = useState(userTasks || []);
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {

    setTasks(userTasks);
  }, [userTasks]);

  useEffect(() => {

    const filteredTasksByPeriod = filterTasksByPeriod();
    const filteredTasksBySearch = filterTasksBySearch(searchTerm, filteredTasksByPeriod);
    const filteredTasksByPriority = filterTasksByPriority(filteredTasksBySearch);

    setTasks(filteredTasksByPriority);
  }, [selectedPeriod, searchTerm, priorityFilter]);

  const filterTasksBySearch = (searchTerm, tasks) => {

    return tasks.filter(task => {

      const taskTitle = task.title.toLowerCase();
      const taskDescription = task.description.toLowerCase();
      const taskTags = task.tags.toLowerCase();

      if (taskTitle.includes(searchTerm.toLowerCase())) {
        return true;
      };

      if (taskDescription.includes(searchTerm.toLowerCase())) {
        return true;
      };

      if (taskTags.includes(searchTerm.toLowerCase())) {
        return true;
      };

      return false;
    });
  };

  const filterTasksByPriority = (tasks) => {

    if (priorityFilter === '') {
      return tasks;
    };

    return tasks.filter(task => task.priority.toLowerCase() === priorityFilter.toLowerCase());
  };

  const filterTasksByPeriod = () => {

    const currentDate = new Date();

    const filteredTasks = userTasks.filter((task) => {

      const taskDate = new Date(task.dateTime);

      if (selectedPeriod === 'day') {

        return (
          taskDate.getDate() === currentDate.getDate() &&
          taskDate.getMonth() === currentDate.getMonth() &&
          taskDate.getFullYear() === currentDate.getFullYear()
        );
      } 
        else if (selectedPeriod === 'week') {

          const currentWeekStart = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - currentDate.getDay()
          );

          const currentWeekEnd = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + (6 - currentDate.getDay())
          );

          return (
            taskDate >= currentWeekStart && taskDate <= currentWeekEnd
          );
        }
          else if (selectedPeriod === 'month') {

            return (
              taskDate.getMonth() === currentDate.getMonth() &&
              taskDate.getFullYear() === currentDate.getFullYear()
            );
          };

      return true;
    });

    return filteredTasks;
  };

  const handleCloseModal = () => {

    setSelectedTask(null);
  };

  return (
    <div className='item taskbar'>
      <h2>Завдання</h2>
      <div className='row center'>
        <label>
          <input 
          type="radio" 
          name="period" 
          value="day" 
          checked={selectedPeriod === 'day'} 
          onChange={() => setSelectedPeriod('day')}
          />Day
        </label>
        <label>
          <input 
          type="radio" 
          name="period" 
          value="week" 
          checked={selectedPeriod === 'week'} 
          onChange={() => setSelectedPeriod('week')}
          />Week
        </label>
        <label>
          <input 
            type="radio" 
            name="period"
            value="month" 
            checked={selectedPeriod === 'month'} 
            onChange={() => setSelectedPeriod('month')}
          />Month
        </label>
      </div>
      <div className='row center'>
        <input 
          type="text" 
          name="findby"
          placeholder="Пошук..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='row center'>
        <label>
          <input 
          type="radio" 
          name="priority" 
          value="" 
          checked={priorityFilter === ''} 
          onChange={() => setPriorityFilter('')}
          />All
        </label>
        <label>
          <input 
          type="radio" 
          name="priority" 
          value="high" 
          checked={priorityFilter === 'high'} 
          onChange={() => setPriorityFilter('high')}
          />High
        </label>
        <label>
          <input 
          type="radio" 
          name="priority" 
          value="medium" 
          checked={priorityFilter === 'medium'} 
          onChange={() => setPriorityFilter('medium')}
          />Medium
        </label>
        <label>
          <input 
          type="radio" 
          name="priority"
          value="low" 
          checked={priorityFilter === 'low'} 
          onChange={() => setPriorityFilter('low')}
          />Low
        </label>
      </div>
        <ul>
        {tasks
          .filter(task => {
            if (project?.id) {
              return task.projectId === project.id;
            } else {
              return true;
            }
          })
          .map(task => (
            <li key={task.id} className='task'>
              <h3 onClick={() => setSelectedTask(task)}>
                {task.title} ({task.priority})
              </h3>
              <p>{new Date(task.dateTime).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              {selectedTask && selectedTask.id === task.id && (
                <div className='modal'>
                  <TaskItem task={task} userId={userId} onUpdate={onUpdate} />
                  <button type="button" onClick={handleCloseModal}>Закрити</button> 
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskList;