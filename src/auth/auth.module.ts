import { Module } from "@nestjs/common";
import {authController } from "./auth.controller";
import { authService} from "./auth.service";
import { userModule } from "src/users/user.module";
import { MailModule } from "src/mail/mail.module";

@Module({
    imports : [userModule,MailModule],
    controllers:[authController],
    providers:[authService]
})



export class authModule {}