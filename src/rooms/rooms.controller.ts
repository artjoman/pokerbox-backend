import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AddRoomUserDTO } from 'src/dto/add.room.user.dto';
import { CreateRoomDTO } from 'src/dto/create.room.dto';
import { Rooms } from 'src/entities/Rooms';
import { RoomUsers } from 'src/entities/RoomUsers';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(
        private roomsService: RoomsService,
    ) { }

    @Post()
    async createRoom(@Body() createRoomDTO: CreateRoomDTO) {
        try {
            var randomstring = require("randomstring");
            let clientCode: string = randomstring.generate(10);
            let createRoom: Rooms = {
                code: clientCode,
                userId: createRoomDTO.userId,
                name: createRoomDTO.name,
                public: createRoomDTO.public
            }
            let roomId = await this.roomsService.createRoom(createRoom);
            let joinRoom: RoomUsers = {
                roomId: roomId,
                userId: createRoomDTO.userId,
                round: false
            }
            await this.roomsService.joinRoom(joinRoom);
            return { roomId: roomId}
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Post('join')
    async joinRoom(@Body() addUserDTO: AddRoomUserDTO) {
        try {
            let room = await this.roomsService.findByCode(addUserDTO.code);
            let joinRoom: RoomUsers = {
                roomId: room.id,
                userId: addUserDTO.userId,
                round: false
            }
            await this.roomsService.joinRoom(joinRoom);
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Get()
    async getRooms(@Req() request: Request) {
        try {
            await this.roomsService.getRooms();
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getUser(@Req() request: Request, @Param('id') id) {
        try {
            return this.roomsService.getRoom(id);
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
