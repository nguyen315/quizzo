import { io } from 'socket.io-client';

const url =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://quizzo-service.herokuapp.com/';

export function SockerInit() {
  const socker = io(url, {
    path: '/api/socket',
    transports: ['websocket']
  });
  return socker;
}
