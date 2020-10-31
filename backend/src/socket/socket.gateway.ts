import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';

@WebSocketGateway(null, { transports: ['websocket'] })
export class SocketGateway implements OnGatewayConnection<Client>, OnGatewayDisconnect<Client> {
  users = {};

  @WebSocketServer()
  server: Server;

  handleConnection(client: Client) {
    console.log('connected', client.id, client.conn.remoteAddress);

    this.users[client.id] = client.conn.remoteAddress;
  }

  handleDisconnect(client: Client) {
    delete this.users[client.id];
  }

  @SubscribeMessage('users')
  findUsers(@MessageBody() data: any) {
    console.log('got users', data);
    // Wrong typing :P
    const connected = Object.values(this.server.clients().connected);
    // this.server.emit('users', this.users);
    this.server.emit(
      'users',
      connected.map((socket) => ({
        id: socket.id,
        ip: socket.conn.remoteAddress,
      })),
    );
    // return of({ event: 'users', data });
  }
}
