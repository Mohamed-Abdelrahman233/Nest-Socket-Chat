
import { OnModuleInit, UseGuards } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from 'socket.io'
import{ GroupService } from "../messages/group-messages/group-message.service"
import {messageService} from "../messages/private-messages/message.service"
import { WsAuthGuard } from './socket.guard';
 

@UseGuards(WsAuthGuard)
@WebSocketGateway() 
export class ChatGateway implements OnModuleInit{ 
    constructor( 
                 private readonly groupService: GroupService ,
                 private readonly messageService: messageService 
    ){}

 
    @WebSocketServer() 
      server : Server    
 
 onModuleInit() {
    this.server.on('connection', (client) => {
        const userId = client.handshake.query.userId;
        if (userId) {
            client.join(userId.toString());
            console.log(`User ${userId} connected and joined room: ${userId}`);
        }
        console.log(`client connection : ${client.id}`);
    });
}

@SubscribeMessage('SendSingleMessage')
async handleMessage(@MessageBody() data: any) {
  const actualData = Array.isArray(data) ? data[0] : data;

  const savedMessage = await this.messageService.socketPrivateMessage({
    content: actualData.content,
    receiverId: Number(actualData.receiverId),
    senderId: Number(actualData.senderId)
  });
  this.server.to(actualData.receiverId.toString()).emit('SendSingleMessage', savedMessage);

}

@SubscribeMessage('joinGroup')
handleJoinGroup(client: any, data: any) {
    const actualData = Array.isArray(data) ? data[1] : data;
    client.join(actualData.groupId.toString());
    console.log(`User joined group: ${actualData.groupId}`);
}


 @SubscribeMessage('newSentMessage')
async handleNewSentMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const actualData = Array.isArray(data) ? data[1] : data;
        const savedMessage = await this.groupService.socketGroupMessage({
            content: actualData.content,
            groupId: Number(actualData.groupId),
            senderId: Number(actualData.senderId)
        });
        this.server.to(actualData.groupId.toString()).emit('groupMessageReceived', savedMessage);

        return savedMessage;
  
   }

}




