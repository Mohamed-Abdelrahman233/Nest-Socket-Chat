import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import{ GroupService } from"../messages/group-messages/group-message.service"
import { messageService } from 'src/messages/private-messages/message.service';
import { groupModule } from 'src/messages/group-messages/group-message.module';
import { userModule } from 'src/users/user.module';
import { messageModule } from 'src/messages/private-messages/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/messages/group-messages/entities/group.entity';
import { GroupMember } from 'src/messages/group-messages/entities/groupmember.entity';
import { Message } from 'src/messages/message.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupMember,Message,User])],

  providers: [ChatGateway,GroupService,messageService],
})
export class chatModule {}