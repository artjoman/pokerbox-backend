import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoundCards } from 'src/entities/RoundCards';
import { Rounds } from 'src/entities/Rounds';
import { RoundStakes } from 'src/entities/RoundStakes';
import { RoundUsers } from 'src/entities/RoundUsers';
import { RoundsController } from './rounds.controller';
import { RoundsService } from './rounds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rounds]), TypeOrmModule.forFeature([RoundUsers]), TypeOrmModule.forFeature([RoundStakes]), TypeOrmModule.forFeature([RoundCards])],
  controllers: [RoundsController],
  providers: [RoundsService]
})
export class RoundsModule {}
