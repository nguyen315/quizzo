import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socketClient from 'socket.io-client';
import { RootState } from '../store/store';
import MyNavbar from '../components/layouts/MyNavbar';
import { apiUrl } from '../store/types';
import ListMessages from '../components/socket/ListMessages';
import { Container } from 'react-bootstrap';

const socketUrl = `${apiUrl}/socket`;

const Socket = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const [socket, setSocket] = useState<any>();
  const [messages, setMessages] = useState<String[]>([
    'test message 1',
    'Hello from user 1',
    'Hello from user 2'
  ]);

  const configureSocket = () => {
    const socket = socketClient(socketUrl);
    socket.on('connection', () => {});
    socket.on('message', (message: String) => {
      setMessages((prevState) => prevState.concat(message));
    });
    setSocket(socket);
  };

  const handleSendMessage = () => {
    const message = `Hello from ${auth.user?.username}`;
    setMessages((prevState) => prevState.concat(message));
    socket.emit('send-message', message);
  };

  // useEffect(() => {
  //   configureSocket();
  // });

  return (
    <Container fluid>
      <MyNavbar />
      <div>Socket demo </div>
      <button onClick={handleSendMessage}> Send Hello Message</button>
      <ListMessages messages={messages} />
    </Container>
  );
};

export default Socket;
