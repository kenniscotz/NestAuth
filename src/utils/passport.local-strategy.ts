import {Strategy} from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { authService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: authService) {
    // Configure the Local strategy to use 'email' as the username field
    super(
        {usernameField: 'email'}
    );
    }

    // This method is called by Passport to validate the user credentials
    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password); 
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return user;
  } 

}