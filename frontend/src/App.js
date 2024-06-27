import React, { useState } from 'react';
import './App.css';
import CoachLog from './CoachLog.js';
import ChessPlayerLog from './ChessPlayerLog.js';
import LoginForm from './LoginForm.js';
import { useParams } from 'react-router-dom';

const App = () => {
  const {getrole} = useParams();
  const [Role, setRole] = useState(getrole || '');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  if (Role === '') {
    return (
      <div>
        <LoginForm onRoleChange={handleRoleChange} />
      </div>
    );
  } else if (Role === 'Chess Player') {
    return (
      <div className='active'>
        <ChessPlayerLog />
      </div>
    );
  } else if (Role === 'Coach') {
    return (
      <div className='active'>
        <CoachLog />
      </div>
    );
  }
};

export default App;