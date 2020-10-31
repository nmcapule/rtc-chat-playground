import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { HelloModule } from './hello/hello.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [HelloModule, EventsModule, SocketModule],
})
export class AppModule {}
