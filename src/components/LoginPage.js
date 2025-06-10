import React, { useState } from 'react';
import './LoginPage.css'; // Custom styling for LoginPage

const LoginPage = ({ setIsLoggedIn, setUsername }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Retrieve user data from localStorage
  const getUserDatabase = () => {
    const data = localStorage.getItem('userDatabase');
    return data ? JSON.parse(data) : [];
  };

  // Save user data to localStorage
  const saveUserDatabase = (database) => {
    localStorage.setItem('userDatabase', JSON.stringify(database));
  };

  // Handle login logic
  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const userDatabase = getUserDatabase();
    const user = userDatabase.find(
      (user) => user.username.toLowerCase() === trimmedUsername.toLowerCase()
    );

    if (user && user.password === trimmedPassword) {
      setUsername(trimmedUsername);
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password. Please sign up.');
    }
  };

  // Handle signup logic
  const handleSignup = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const userDatabase = getUserDatabase();
    const existingUser = userDatabase.find(
      (user) => user.username.toLowerCase() === trimmedUsername.toLowerCase()
    );

    if (existingUser) {
      setError('Username already taken. Please choose a different one.');
    } else if (trimmedUsername && trimmedPassword) {
      userDatabase.push({ username: trimmedUsername, password: trimmedPassword });
      saveUserDatabase(userDatabase);
      setUsername(trimmedUsername);
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Both fields are required!');
    }
  };

  return (
    <div className="login-container">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={isLogin ? handleLogin : handleSignup} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsernameInput(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default LoginPage;
