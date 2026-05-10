import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dtos/updateUserDto";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class userService {
constructor(
     @InjectRepository(User)
    private readonly userRepository: Repository<User>, ){}
   
public async getMe( id :number){
       const getUser = await this.userRepository.findOne({where:{id}, 
        select : ["id" , "username" , "email", "phone"]})
       if(!getUser)throw new NotFoundException("user not exist")
        return getUser
    }

 public async updateUser( id :number ,updateUserDto: UpdateUserDto ){
    const User = await this.userRepository.findOne({where:{id}
       ,  select : ["id" , "username" , "email", "phone"]})
    if(!User)throw  new NotFoundException("user not exist")
    
    Object.assign(User,updateUserDto)  

    return this.userRepository.save(User)
}

    public async deleteUser( id :number){
       const getUser = await this.userRepository.findOne({where:{id}})
       if(!getUser)throw new NotFoundException("user not exist")
       await this.userRepository.remove(getUser)
       return { message : "user has been deleted" } 
    }

}

