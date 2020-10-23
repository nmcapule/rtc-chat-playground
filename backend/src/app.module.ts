import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [HelloModule, EventsModule],
})
export class AppModule {}
