import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from "../users/dtos/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/users/dtos/login-user.dto";
import { Jwtpayloadtype } from "./Jwtpayload";
import { MailService } from "src/mail/mail.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class authService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtservice : JwtService ,
        private readonly config : ConfigService ,
        private readonly mailService : MailService

    ) {}

public async creatUser(UserCreateDto:UserCreateDto){
    const {email , password , username , phone } = UserCreateDto
    const userfromDb = await this.userRepository.findOne({where:{email}})
    if(userfromDb) throw await new BadRequestException("user alrealy exist")
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const randomToken = Math.random().toString(36).substring(2, 15);
    
    let newUser = this.userRepository.create({
        email,
        username,
        phone,
        password : hashedPassword ,
        verificationToken: randomToken, 
        isVerified: false,
    })

     newUser = await this.userRepository.save(newUser)
    
    const link = `http://localhost:8000/auth/verify-email/${newUser.id}/${newUser.verificationToken}`
    await this.mailService.sendVerfiyEmialTemplate(newUser.email,link)

    return { message : 'verification token has been sent to your email , please verify you email address' }

    };
  

   public async login(loginDto : LoginDto ){
   const { email , password  } = loginDto
   const userfromDb= await this.userRepository.findOne({where : {email}})
   if(!userfromDb)throw new BadRequestException ("Invalid email or password");
   const compare_password = await bcrypt.compare(password , userfromDb.password) ;
   if(!compare_password)throw new BadRequestException ("user already exist");

     const payload : Jwtpayloadtype = {id :userfromDb.id  , email : userfromDb.email }
     const accesstoken = await this.jwtservice.signAsync(payload)
     return {
        message: "login successfully",
        user: { 
             id: userfromDb.id ,
             username: userfromDb.username,
              email : userfromDb.email 
            },
        accesstoken
    };

  }

  async getcurrentuser(id : number){
    const getId = await this.userRepository.findOne({where : {id }})
    if(!getId)throw new BadRequestException ("user not found ");
    return getId
}
  
public async verifyEmail(userId: number, verificationToken: string) {
  const user = await this.getcurrentuser(userId);
  if (!user.verificationToken) {
    throw new NotFoundException("This account is already verified or token expired");
  }

  if (user.verificationToken !== verificationToken) {
    throw new BadRequestException('invalid link');
  }
  user.isVerified = true;
  user.verificationToken = null; 

  await this.userRepository.save(user);

  return { message: "your email has been verified, please log in to your account" };
}

}

