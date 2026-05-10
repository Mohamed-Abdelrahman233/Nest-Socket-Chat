import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
import{ messageService } from "../private-messages/message.service"
import { CreatePrivateMessageDto } from "./dtos/create-private-message.dto";
import type { Jwtpayloadtype } from "src/auth/Jwtpayload";
import { currrentuser } from "src/auth/decorators/get-user.decorator";
import { authguard } from "src/auth/guards/auth.guard";

@UseGuards(authguard)
@Controller("/message")
    export class messageController {
      constructor(private readonly messageService: messageService ){}


@Post("/createMessage") 
async createMessage(@currrentuser() payload : Jwtpayloadtype, @Body() createDto: CreatePrivateMessageDto) {
  return await this.messageService.createPrivateMessage(payload.id, createDto);
}


@Get(':senderId/:receiverId') 
async handlePrivateMessages(
  @currrentuser() payload : Jwtpayloadtype,
  @Param('receiverId', ParseIntPipe) receiverId: number,
  @Query('take', ParseIntPipe) take: number, // كويري نمبر
  @Query('skip', ParseIntPipe) skip: number  // كويري نمبر
) {
  await  this.messageService.ReadeMessages(payload.id , receiverId )
  return this.messageService.getPrivateMessages(payload.id, receiverId, take, skip);
}

  }

  