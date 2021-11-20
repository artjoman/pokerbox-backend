import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddRoundDTO } from 'src/dto/add.round.dto';
import { AddRoundUserDTO } from 'src/dto/add.round.user.dto';
import { AddStakeDTO } from 'src/dto/add.stake.dto';
import { RoundCards } from 'src/entities/RoundCards';
import { Rounds } from 'src/entities/Rounds';
import { RoundStakes } from 'src/entities/RoundStakes';
import { RoundUsers } from 'src/entities/RoundUsers';
import { Repository } from 'typeorm';

@Injectable()
export class RoundsService {
    constructor(
      @InjectRepository(Rounds)
      private readonly rounds: Repository<Rounds>,
      @InjectRepository(RoundUsers)
      private readonly roundUsers: Repository<RoundUsers>,
      @InjectRepository(RoundStakes)
      private readonly roundStakes: Repository<RoundStakes>,
      @InjectRepository(RoundCards)
      private readonly roundcards: Repository<RoundCards>
    ) { }
  
    async addRound(payload: AddRoundDTO): Promise<any> {
        let round = await this.rounds.insert(payload);
        return round.raw.insertId;
    }

    async joinRound(payload: AddRoundUserDTO): Promise<any> {
        await this.roundUsers.insert(payload);
    }
  
    async addCard(payload: RoundCards): Promise<any> {
        await this.roundcards.insert(payload);
    }

    async addStake(payload: AddStakeDTO): Promise<any> {
        await this.roundStakes.insert(payload);
    }

    async getRound(id: number): Promise<Rounds> {
        return await this.rounds
          .createQueryBuilder('rounds')
          .leftJoinAndSelect('rounds.stakes', 'stakes')
          .where('rounds.id = :id', { id: id })
          .getOne();
    }

    async getUserRound(id: number, userId: number): Promise<Rounds> {
        return await this.rounds
          .createQueryBuilder('rounds')
          .where('rounds.id = :id', { id: id })
          .getOne();
    }
}
