import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBalanceDTO } from 'src/dto/add.balance.dto';
import { RoomUserBalance } from 'src/entities/RoomUserBalance';
import { Repository } from 'typeorm';
import { Users } from './../entities/Users'

@Injectable()
export class UsersService {
    
  constructor(
    @InjectRepository(Users)
    private readonly users: Repository<Users>,
    @InjectRepository(RoomUserBalance)
    private readonly userBalance: Repository<RoomUserBalance>
  ) { }

  async createUser(payload: Users): Promise<any> {
      await this.users.insert(payload);
  }

  async addBalance(payload: AddBalanceDTO): Promise<any> {
    let currentBalance = await this.userBalance
      .createQueryBuilder('balance')
      .where('user_id = :userId', { userId: payload.userId })
      .andWhere('room_id = :roomId', { userId: payload.roomId })
      .getOne();
    if (currentBalance) {
      await this.userBalance
        .createQueryBuilder()
        .update(RoomUserBalance)
        .set({ amount: (currentBalance.amount + payload.amount) })
        .where('user_id = :userId', { userId: payload.userId })
        .andWhere('room_id = :roomId', { userId: payload.roomId })
        .execute();
    } else {
      await this.userBalance.insert(payload);
    }
  }

  async addBid(payload: AddBalanceDTO): Promise<any> {
    let currentBalance = await this.userBalance
      .createQueryBuilder('balance')
      .where('user_id = :userId', { userId: payload.userId })
      .andWhere('room_id = :roomId', { userId: payload.roomId })
      .getOne();
    if (currentBalance) {
      await this.userBalance
        .createQueryBuilder()
        .update(RoomUserBalance)
        .set({ amount: (currentBalance.amount + payload.amount) })
        .where('user_id = :userId', { userId: payload.userId })
        .andWhere('room_id = :roomId', { userId: payload.roomId })
        .execute();
    } else {
      await this.userBalance.insert(payload);
    }
  }

  async getUsers(): Promise<Users[]> {
    return await this.users
      .createQueryBuilder('user')
      .getMany();
  }

  async getUser(id: number): Promise<Users> {
      return await this.users
        .createQueryBuilder('user')
        .where('user.id = :id', { id: id })
        .getOne();
  }
}
