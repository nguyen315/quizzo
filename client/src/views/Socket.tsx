import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socketClient, { io } from 'socket.io-client';
import { RootState } from '../store/store';
import MyNavbar from '../components/layouts/MyNavbar';
import { apiUrl } from '../store/types';
import ListMessages from '../components/socket/ListMessages';
import { Container } from 'react-bootstrap';

const socketUrl = `${apiUrl}/socket`;

const Socket = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const [socket, setSocket] = useState<any>();
  const [messages, setMessages] = useState<String[]>([]);

  const configureSocket = () => {
    const clientSocket = io('http://localhost:5000', {
      path: '/api/socket',
      transports: ['websocket']
    });

    clientSocket.on('connect', () => {
      console.log('connected');
    });
    clientSocket.on('message', (message: String) => {
      setMessages((prevState) => prevState.concat(message));
    });

    setSocket(clientSocket);
  };

  const handleSendMessage = () => {
    const message = `Hello from ${auth.user?.username}`;
    setMessages((prevState) => prevState.concat(message));
    socket.emit('send-message', message);
  };

  useEffect(() => {
    configureSocket();
  }, []);

  return (
    <Container fluid>
      <MyNavbar />
      <div>Socket demo </div>
      <button onClick={handleSendMessage}> Send Hello Message</button>
      <ListMessages messages={[...messages].reverse()} />
    </Container>
  );
};

export default Socket;
