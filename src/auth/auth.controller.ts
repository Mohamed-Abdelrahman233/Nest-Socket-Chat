import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UserCreateDto } from "../users/dtos/create-user.dto";
import { LoginDto } from "../users/dtos/login-user.dto";
import {authService} from "../auth/auth.service"

@Controller("/auth")
    export class authController {
    constructor (private readonly authService :authService){}

       @Post("/createuser")
       public async createUser(@Body() dto : UserCreateDto){
        return this.authService.creatUser(dto)
       }

       @Post("/login")
       public async login(@Body() LoginDto : LoginDto ){
       return this.authService.login(LoginDto)
  }

   
@Get("verify-email/:id/:verificationToken")
public verifyEmail(
  @Param("id", ParseIntPipe) id : number ,
  @Param('verificationToken') verificationToken : string
){
   return this.authService.verifyEmail(id ,verificationToken  )
}

    }
