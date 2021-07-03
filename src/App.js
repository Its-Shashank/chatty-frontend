import { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000')

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('chat', payload => {
      setChat([...chat, payload])
    })
  })
  
  const handleMessageChange = e => {
    setMessage(e.target.value);
  }

  const sendChat = e => {
    e.preventDefault();
    socket.emit('chat', { message })
    setMessage('');
  }
  
  return (
    <div className='App'>
      <header className="App-header">
        <h1>Chatty app</h1>
        {chat.map((payload, idx) => (
          <p key={idx}>{payload.message}</p>
        ))}
        <form onSubmit={sendChat}>
          <input
            type='text'
            placeholder='Send message'
            name='chat'
            value={message}
            onChange={handleMessageChange}
          />
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
