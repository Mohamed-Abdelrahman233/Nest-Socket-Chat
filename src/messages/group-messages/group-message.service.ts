import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "./entities/group.entity";
import { GroupMember } from "./entities/groupmember.entity";
import { GroupRole } from "./enums/enum";
import { Message } from "../message.entity";


@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository : Repository<Group>,
         @InjectRepository(GroupMember)
        private readonly groupMemberRepository : Repository<GroupMember>,
        @InjectRepository(Message)
        private readonly messageRepository : Repository<Message>,
      
    ) {}
  
     async createGroup(creatorId: number, CreateGroupDto) {
        const{ name , description} = CreateGroupDto
    const newGroup = this.groupRepository.create({
      name,
      description,
    });
    const savedGroup = await this.groupRepository.save(newGroup);
    const member = this.groupMemberRepository.create({
      user: { id: creatorId },     
      group: { id: savedGroup.id },
      role: GroupRole.ADMIN,       
    });
    await this.groupMemberRepository.save(member);
    return savedGroup;
}

async addMember(groupId: number, userId: number) {
  const newMember = this.groupMemberRepository.create({
    group: { id: groupId }, 
    user: { id: userId }, 
    role: GroupRole.MEMBER 
  });

  return await this.groupMemberRepository.save(newMember);
}

async sendMessage(groupId: number, userId: number, content: string) {
  const newMessage = this.messageRepository.create({
    content: content,
    sender: { id: userId } , 
    group: { id: groupId } ,
  } ); 

  return await this.messageRepository.save(newMessage);
}

async getGroupMessages(groupId: number) {
  return await this.messageRepository.find({
    where: { group: { id: groupId } },
    relations: ['sender'], 
    order: { createdAt: 'ASC' },
  });
}
async getUserGroups(userId: number) {
  const memberships = await this.groupMemberRepository.find({
    where: { user: { id: userId } },
    relations: ['group'], 
  });
  return memberships.map(membership => membership.group);
}

async removeUserFromGroup(groupId: number, targetUserId: number) {
  const member = await this.groupMemberRepository.findOne({
    where: { groupId : groupId , id: targetUserId }})
  if (!member) {
    throw new NotFoundException('note exist'); }

  await this.groupMemberRepository.delete({
    groupId : groupId,
    id : targetUserId
  });

  return { message: 'تم حذف العضو بنجاح' };
}



async checkIsAdmin(groupId: string, userId: string): Promise<boolean> {
  const group = await this.groupMemberRepository.findOne({ where: { id: parseInt (groupId) } });
  if (!group) return false;
  return group.creatorId  ===  parseInt (userId) ; 
}


async socketGroupMessage( data : {content: string , groupId: number, senderId: number } ) {
  const newMessage = await this.messageRepository.create({
    
      content: data.content,
      groupId: data.groupId,
      senderId: data.senderId,
    })
    const savedMessage = await this.messageRepository.save(newMessage)
  return savedMessage;
}

}
