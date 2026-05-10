import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { userService } from './user.service';
import { userController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),JwtModule],

  controllers: [userController],
  providers: [userService],
  exports: [TypeOrmModule, userService], // ضيف السطر ده هنا بالظبط
})
export class userModule {}