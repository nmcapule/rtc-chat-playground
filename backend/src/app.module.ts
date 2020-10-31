import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { HelloModule } from './hello/hello.module';
import { RtcChatModule } from './rtc-chat/rtc-chat.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [HelloModule, EventsModule, RtcChatModule, SocketModule],
})
export class AppModule {}
