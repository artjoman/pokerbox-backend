import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from 'src/entities/Rooms';
import { RoomUsers } from 'src/entities/RoomUsers';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms]), TypeOrmModule.forFeature([RoomUsers])],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
