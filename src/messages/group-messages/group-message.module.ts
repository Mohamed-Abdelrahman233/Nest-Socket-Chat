import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupMember } from './entities/groupmember.entity';
import { GroupService } from './group-message.service';
import { GroupController } from './group-message.controller';
import { messageModule } from '../private-messages/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupMember]),messageModule],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [TypeOrmModule, GroupService] 
})
export class groupModule {}