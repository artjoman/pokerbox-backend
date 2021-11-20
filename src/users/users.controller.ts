import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Users } from 'src/entities/Users';
import { CreateUserDTO } from 'src/dto/create.user.dto';
import { AddBalanceDTO } from 'src/dto/add.balance.dto';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) { }

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        try {
            let user: Users = {
                nickname: createUserDTO.nickname
            }
            await this.usersService.createUser(user);
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('balance')
    async addBalance(@Body() adBalanceDTO: AddBalanceDTO) {
        try {
            await this.usersService.addBalance(adBalanceDTO);
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch()
    async updateUser(@Req() request: Request, @Body() createUserDTO: CreateUserDTO) {
        try {
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async getUsers(@Req() request: Request) {
        try {
            return this.usersService.getUsers();
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getUser(@Req() request: Request, @Param('id') id) {
        try {
            return this.usersService.getUser(id);
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
