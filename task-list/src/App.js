import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registration from './components/Registration';
import Authorization from './components/Authorization';
import './App.css';

function Home() {
  return <div className='container'><h1>Список справ</h1></div>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className='row'>
            <li>
              <Link to="/">Домашня</Link>
            </li>
            <li>
              <Link to="/registration">Реєстрація</Link>
            </li>
            <li>
              <Link to="/authorization">Авторизація</Link>
            </li>
          </ul>
        </nav>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} /> {/* Використовуйте "element" */}
          <Route path="/authorization" element={<Authorization />} /> {/* Використовуйте "element" */}
          {/* Додайте інші маршрути за потребою */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;