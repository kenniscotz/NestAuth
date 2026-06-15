import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateauthDto {
    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    password!: string;

}