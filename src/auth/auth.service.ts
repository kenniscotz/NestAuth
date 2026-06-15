import { Injectable } from '@nestjs/common';
import {CreateauthDto as DTO}  from './AuthDTO/auth.DTO';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { hashPassword, comparePasswords } from '../utils/bcrypt';


//Mock Database
const Users = [
    {name: 'John Doe', email: 'john.doe@example.com', password: 'hashed_password_1'},
    {name: 'Jane Smith', email: 'jane.smith@example.com', password: 'hashed_password_2'}
];


@Injectable()
export class authService {
    constructor(private readonly jwtService: JwtService) {}
  
    async register(dto: DTO) {
        // Extract user details from DTO
        const { name, email, password } = dto;

        // Check if user already exists
        const  existingUser = Users.find(user => user.email === email);
        if (existingUser) {
            throw new UnauthorizedException('Email already in exists');
        }

        //  Hashing password
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = { id: Date.now(), name, email, password: hashedPassword };
        Users.push(newUser);    

        //Remove password from response
        const { password: _, ...result } = newUser;
        return result;
        
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // This method is used by the LocalStrategy to validate user credentials
    async validateUser(email: string, password: string) {
        const user = Users.find(user => user.email === email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await comparePasswords(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Remove password from the returned user object
        const { password: _, ...result } = user;
        return result;
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // This method generates a JWT token for the authenticated user
    login(user: any) {
        const payload = { email: user.email, sub: user.id };
        console.log("Payload for JWT:", payload); // Debugging line to check the payload
        return {
            access_token: this.jwtService.sign(payload),
            user: user
        };
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
   getProfile(user: any) {
    //  Check if user exists at all
    if (!user) {
        throw new UnauthorizedException('No user profile found in request');
    }

    //  Safe to remove password now
    const { password, ...result } = user; 
    return result;
}

}