import {ExtractJwt, Strategy} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Configure the JWT strategy with options
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'example-secret-key',
    });
  }
  // This method is called by Passport to validate the JWT payload
    async validate(payload: any) {
        return {
            userId: payload.sub,
            email: payload.email,
            name: payload.name,
        }

    }
}