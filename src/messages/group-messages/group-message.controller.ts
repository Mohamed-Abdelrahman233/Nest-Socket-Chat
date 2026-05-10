import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
import {GroupService}from"../group-messages/group-message.service"
import { CreateGroupDto } from "./dtos/creat-group.message.dto";
import { currrentuser } from "src/auth/decorators/get-user.decorator";
import type { Jwtpayloadtype } from "src/auth/Jwtpayload";
import { GroupAdminGuard } from "src/auth/guards/auth.guad-roles";
import { authguard } from "src/auth/guards/auth.guard";

@UseGuards(authguard)
@Controller("/group")
    export class GroupController {
      constructor(private readonly GroupService: GroupService ){}

      // 1. إنشاء جروب جديد
  @Post('create')
  async createGroup(
    @currrentuser() payload : Jwtpayloadtype,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    return await this.GroupService.createGroup(payload.id, createGroupDto);
  }
  // 2. إضافة عضو للجروب
  @Post(':groupId/add-member')
  async addMember(
    @Param('groupId', ParseIntPipe) groupId: number,
    @currrentuser() payload : Jwtpayloadtype,
  ) {
    return await this.GroupService.addMember(groupId, payload.id);
  }
  // 3. إرسال رسالة (الفانكشن اللي دوختنا!)
  @Post(':groupId/send')
  async sendMessage(
    @Param('groupId', ParseIntPipe) groupId: number,
    @currrentuser() payload : Jwtpayloadtype,
    @Body('content') content: string,
  ) {
    return await this.GroupService.sendMessage(groupId, payload.id, content);
  }

  // 4. عرض رسائل جروب معين
  @Get(':groupId/messages')
  async getGroupMessages(@Param('groupId', ParseIntPipe) groupId: number) {
    return await this.GroupService.getGroupMessages(groupId);
  }

  // 5. عرض الجروبات اللي اليوزر مشترك فيها
  
  @Get('user')
  async getUserGroups(@currrentuser() payload : Jwtpayloadtype) {
    return await this.GroupService.getUserGroups(payload.id);
  }
  
  
  @Delete(':groupId/remove-user/:userId')
  @UseGuards(GroupAdminGuard)
  async removeMember(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId', ParseIntPipe) targetUserId: number,
  ) {
    return await this.GroupService.removeUserFromGroup(groupId, targetUserId);
  }

  }
  