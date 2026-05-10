import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {Request} from'express'
import { Jwtpayloadtype } from "../Jwtpayload";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class authguard implements CanActivate{
   constructor(  private readonly jwtservice :JwtService,
                private readonly config : ConfigService
             
   ){}

   async canActivate(context: ExecutionContext){
   const request : Request = context.switchToHttp().getRequest()
  const [ type , token]  = request.headers.authorization?.split(" ")??[]
  if(token && type === "Bearer"){
         try{
          const peyload : Jwtpayloadtype = await this.jwtservice.verifyAsync(token , {
            secret : this.config.get<string>("JWT_SECRET")
          })
          request["user"] = peyload
         }catch(error)
         {
          return false
         }
  }else{
    return false
  }
  
  return true ;
    }

}