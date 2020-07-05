import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MediaModule,TypeOrmModule.forRoot(),],
  controllers: [],
  providers: [],
})
export class AppModule {}
