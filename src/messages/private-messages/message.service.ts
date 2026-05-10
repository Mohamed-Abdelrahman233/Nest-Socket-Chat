import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "../message.entity";
import { Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { CreatePrivateMessageDto } from "./dtos/create-private-message.dto";
import { PaginationDto } from "./dtos/pagination.dto";

@Injectable()
export class messageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository : Repository<Message>,
         @InjectRepository(User)
        private readonly userRepository : Repository<User>
    ) {}
  
  async createPrivateMessage(senderId: number, dto: CreatePrivateMessageDto) {
    const receiver = await this.userRepository.findOneBy({ id: dto.receiverId})
    if (!receiver)  throw new NotFoundException();
     const newMessage =  this.messageRepository.create({
      content: dto.content,
      receiverId: dto.receiverId,
      senderId: senderId,
    });

    return await this.messageRepository.save(newMessage);
  }


async getPrivateMessages(senderId: number, receiverId: number, take: number, skip: number) {
  const messages = await this.messageRepository.find({
    where: [
      { sender: { id: senderId }, receiver: { id: receiverId } },
      { sender: { id: receiverId }, receiver: { id: senderId } }
    ],
    order: { createdAt: 'DESC' },
    take: take, // الرقم اللي جاي من الكويري
    skip: skip, // الرقم اللي جاي من الكويري
    relations: ['sender', 'receiver'] // عشان يرجعلك بيانات الراسل والمستقبل مع الرسالة
  });

  return messages; // أهم سطر عشان الداتا ترجعلك في البوست مان
}

async ReadeMessages(senderId: number, receiverId: number){

  await this.messageRepository.update(
    { 
      sender: { id: receiverId },
      receiver: { id: senderId }, 
      isRead: false 
    }, 
    { isRead: true }
  );

  }

async socketPrivateMessage(data: { content: string, receiverId: number, senderId: number }) {
   
  const newMessage = this.messageRepository.create({
    content: data.content,
    receiverId: data.receiverId,
    senderId: data.senderId,
  });

  return await this.messageRepository.save(newMessage);
}

}

