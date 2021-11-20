import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDTO } from 'src/dto/create.room.dto';
import { Rooms } from 'src/entities/Rooms';
import { RoomUsers } from 'src/entities/RoomUsers';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
    constructor(
      @InjectRepository(Rooms)
      private readonly rooms: Repository<Rooms>,
      @InjectRepository(RoomUsers)
      private readonly roomUsers: Repository<RoomUsers>
    ) { }
  
    async createRoom(payload: CreateRoomDTO): Promise<any> {
        let room =  await this.rooms
            .insert(payload);
        return room.raw.insertId;
    }

    async joinRoom(payload: RoomUsers): Promise<any> {
        await this.roomUsers.insert(payload);
    }

    async findByCode(code: string): Promise<Rooms> {
        return await this.rooms
          .createQueryBuilder('rooms')
          .where('rooms.code = :code', { code: code })
          .getOne();
    }
  
    async getRooms(): Promise<Rooms[]> {
      return await this.rooms
        .createQueryBuilder('rooms')
        .getMany();
    }
  
    async getRoom(id: number): Promise<Rooms> {
        return await this.rooms
          .createQueryBuilder('rooms')
          .where('rooms.id = :id', { id: id })
          .getOne();
    }}
