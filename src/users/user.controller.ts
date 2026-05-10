import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, UseGuards } from "@nestjs/common";
import { userService } from "./user.service";
import { UpdateUserDto } from "./dtos/updateUserDto";
import { authguard } from "src/auth/guards/auth.guard";
import type {Jwtpayloadtype} from "../auth/Jwtpayload"
import { currrentuser } from "src/auth/decorators/get-user.decorator";

@UseGuards(authguard)
@Controller('/users')
export class userController {
  constructor(private readonly userService: userService) {}
  
  @Get("/get")
  public  getMe(@currrentuser() payload : Jwtpayloadtype ){
    return this.userService.getMe(payload.id)
  }

  
  @Patch('/update')
   public  updateUser(@currrentuser() payload : Jwtpayloadtype, @Body() updateDto: UpdateUserDto) {
    return  this.userService.updateUser(payload.id,updateDto)
  }
  
  @Delete("/delete")
    public deleteMe(@currrentuser() payload : Jwtpayloadtype ){
    return this.userService.deleteUser(payload.id)
 }

  
}