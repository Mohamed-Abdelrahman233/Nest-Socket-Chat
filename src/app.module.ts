import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userModule } from './users/user.module';
import { messageModule } from './messages/private-messages/message.module';
import { groupModule } from './messages/group-messages/group-message.module';
import { authModule } from './auth/auth.module';
import { UploadModule } from './uploads/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { chatModule } from './chat/socket.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [messageModule ,userModule,authModule,chatModule ,groupModule,UploadModule,MailModule,TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get<string>("DB_HOST"),
    port: config.get<number>("DB_PORT"), 
    username: config.get<string>("DB_USERNAME"),    
    password: config.get<string>("DB_PASSWORD"), 
    database: config.get<string>("DB_DATABASE"), 
    autoLoadEntities: true,
    synchronize:false,
})
  }),ConfigModule.forRoot({ isGlobal: true ,envFilePath: '.env.development'}),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    })
 ],
  controllers: [],
  providers: [],
})
export class AppModule {}
