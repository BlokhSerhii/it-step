import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './main.css';

const Registration = () => {

  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: '',
    tasks: [],
    projects: [],
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [responseMessage, setResponseMessage] = useState(null);

  const handleInputChange = event => {

    setValidationErrors({
      username: '',
      password: '',
      confirmPassword: ''
    });

    const { name, value } = event.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validatePassword = password => {

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const validateUsername = username => {

    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
  };

  const handleSubmit = event => {

    event.preventDefault();

    const errors = {};

    if (!validateUsername(formData.username)) {
      errors.username = 'Ім’я лише з літер і цифр.';
    };

    if (!validatePassword(formData.password)) {
      errors.password =
        'Пароль з 8 символів (а, А, 0-9).';
    };

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Недостатній пароль.';
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.username === formData.username)) {
      errors.username = 'Користувач вже існує!';
    };

    if (Object.keys(errors).length === 0) {

      const userId = uuidv4();

      const users = JSON.parse(localStorage.getItem('users')) || [];

      const newUser = { 
        id: userId, 
        username: formData.username, 
        password: formData.password, 
        tasks: formData.tasks, 
        projects: formData.projects 
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setResponseMessage('Реєстрація пройшла успішно! Авторизуйтесь будьласка!');

      setFormData({
        username: '',
        password: '',
        tasks: [],
        projects: [],
        confirmPassword: ''
      });
    } 
      else {
        setValidationErrors(errors);
      };
  };

  return (
    <div className='container col center'>
       <form name="registration" className="registration col" onSubmit={handleSubmit}>
        <h2>Реєстрація</h2>
        <div className="col">
          <label htmlFor="regname">Логін:</label>
          <input
            type="text"
            name="username"
            id="regname"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="ваше ім’я"
            autoComplete="username"
          />
          {validationErrors.username && <p className="error">{validationErrors.username}</p>}
        </div>
        <div className="col">
          <label htmlFor="regpassword">Пароль:</label>
          <input
            type="password"
            name="password"
            id="regpassword"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="ваш пароль"
            autoComplete="new-password"
          />
          {validationErrors.password && <p className="error">{validationErrors.password}</p>}
        </div>
        <div className="col">
          <label htmlFor="confirmPassword">Повторити:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="повторити пароль"
            autoComplete="new-password"
          />
          {validationErrors.confirmPassword && (
            <p className="error">{validationErrors.confirmPassword}</p>
          )}
        </div>
        <button type="submit">Зареєструватись</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Registration;