import { Module } from '@nestjs/common';
import { messageController } from './message.controller';
import { messageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../message.entity';
import { userModule } from 'src/users/user.module';


@Module({
  imports: [TypeOrmModule.forFeature([Message]),userModule],
  controllers: [messageController],
  providers: [messageService],
  exports: [TypeOrmModule ,messageService], // ضيف السطر ده عشان تفتح جدول الرسائل للكل
})
export class messageModule {}
