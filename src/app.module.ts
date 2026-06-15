import { Module } from '@nestjs/common';
import { authService } from './auth/auth.service';
import { authController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './utils/jwt-strategy';
import { LocalStrategy } from './utils/passport.local-strategy';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "example-secret-key", // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [authController],
  providers: [ authService,  JwtStrategy, LocalStrategy ],
})
export class AppModule {}
