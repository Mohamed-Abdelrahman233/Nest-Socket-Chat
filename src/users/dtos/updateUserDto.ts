import { IsEmail , IsOptional, IsString, Length, Matches } from "class-validator";

export class UpdateUserDto {

    @IsString({ message: 'Username must be a string' })
    @Length(2, 50, { message: 'Username must be between 2 and 50 characters' })
    @IsOptional()
    username?: string;
    
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsOptional()
    email?: string;

    @IsString({ message: 'Phone number must be a string' })
    @IsOptional()
    @Matches(/^01[0125][0-9]{8}$/, { message: 'Invalid Egyptian phone number format' })
    phone?: string;
}