import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

@WebSocketGateway({ path: '/api/socket' })
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}
