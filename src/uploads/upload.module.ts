import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule,
    ConfigModule, 
    MulterModule.register({
      dest: './upload-file'
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}