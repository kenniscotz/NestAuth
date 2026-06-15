import { Controller, Post, Get , Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authService } from  './auth.service';
import {CreateauthDto as DTO}  from './AuthDTO/auth.DTO';

@Controller('auth')
export class authController {

    constructor(private readonly authService: authService) {}

    @Post('register')
    async register(@Body() dto: DTO) {
        return this.authService.register(dto);
    }


    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        // pass both the authenticated user (set by local strategy) and the request body
        return this.authService.validateUser(req.user, req.body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Request() req) {
        return  this.authService.getProfile(req.user) ;// Assuming the user information is attached to the request object after authentication
    }
}
