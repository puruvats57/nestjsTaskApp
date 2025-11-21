import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { LoginDto } from './dto/login.dto';

dotenv.config();

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const userEnv = process.env.AUTH_USER;
    const passEnv = process.env.AUTH_PASS;
    if (dto.username !== userEnv || dto.password !== passEnv) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: dto.username };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
