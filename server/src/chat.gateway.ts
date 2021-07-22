import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets';

@WebSocketGateway({ path: '/api/socket' })
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() message, @ConnectedSocket() client): void {
    client.broadcast.emit('message', message);
  }
}
