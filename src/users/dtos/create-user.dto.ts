import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class UserCreateDto {

    @IsString({ message: 'Username must be a string' })
    @IsNotEmpty({ message: 'Username is required' })
    @Length(2, 50, { message: 'Username must be between 2 and 50 characters' })
    username: string;
    
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @Length(8, 150, { message: 'Password must be at least 8 characters long' })
    password: string;

    @IsString({ message: 'Phone number must be a string' })
    @IsNotEmpty({ message: 'Phone number is required' })
    @Matches(/^01[0125][0-9]{8}$/, { message: 'Invalid Egyptian phone number format' })
    phone: string;


}