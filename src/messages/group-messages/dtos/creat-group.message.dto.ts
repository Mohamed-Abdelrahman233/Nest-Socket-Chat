
import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateGroupDto {
  @IsString({ message: 'Group name must be a string' })
  @IsNotEmpty({ message: 'Group name is required' })
  @MinLength(3, { message: 'Group name is too short (minimum is 3 characters)' })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;
}