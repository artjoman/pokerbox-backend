import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { UserAuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/entities/Users';

@Injectable()
export class AuthService {
    
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  @UseGuards(UserAuthGuard)
  async validateUser(user: any) {
    const userData: Users = await this.usersService.getUser(user.email);
    if (userData) {
        const payload = {
          room: userData.id
        };
        return {
          token: this.jwtService.sign(payload)
        }
    } else {
      console.log("User")
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
  
}
