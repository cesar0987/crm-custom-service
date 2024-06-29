import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./register.css"

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post('/api/register', { username, email, password, confirmPassword });
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Error registering user');
    }
  };

  return (
    <div className="registerContainer">
      <h2> Register </h2>
      <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit"> Register </button>
      </form>
    </div>
  );
};