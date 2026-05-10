import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {

    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @Length(8, 150, { message: 'Password must be at least 8 characters long' }) // يفضل توحيد الطول مع الـ Register
    password: string;

}
