import { IsString, IsEmail, IsNotEmpty, MinLength, IsDate } from 'class-validator';

export class CreateCustomerDto {
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