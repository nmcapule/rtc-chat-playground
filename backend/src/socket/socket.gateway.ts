import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(null, { namespace: 'socket', transports: ['websocket'] })
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('users')
  users(@MessageBody() data: any) {
    return `users: ${data}`;
  }
}
