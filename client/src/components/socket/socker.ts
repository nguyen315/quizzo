import { io } from 'socket.io-client';

export function SockerInit() {
  const socker = io('http://localhost:5000', {
    path: '/api/socket',
    transports: ['websocket']
  });
  return socker;
}
