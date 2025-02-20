import logo from './logo.svg';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [buttonText, setButtonText] = useState('Click to get response');
  const [responseData, setResponseData] = useState(null);
  const [secondResponseData, setSecondResponseData] = useState(null);

  const handleClick = async () => {
    try {
      const [response1] = await Promise.all([
        axios.get('https://matkuv-api.devbstaging.com/api')
      ]);
      setResponseData(response1.data);
      setButtonText('Response Received!');
    } catch (error) {
      console.error(error);
      setButtonText('Error fetching response');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Sourcery Academy for Full-Stack 2024 (Spring)
        </p>
        <button onClick={handleClick}>{buttonText}</button>
        {responseData && <p>Response from first API: <code>{responseData}</code></p>}
        {secondResponseData && <p>Response from second API: <code>{secondResponseData}</code></p>}
        <p>TEST1</p>
      </header>
    </div>
  );
}

export default App;
