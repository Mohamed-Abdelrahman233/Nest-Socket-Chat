

 import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePrivateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  receiverId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
