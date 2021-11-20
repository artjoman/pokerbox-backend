import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AddEventDTO } from 'src/dto/add.event.dto';
import { AddRoundDTO } from 'src/dto/add.round.dto';
import { AddStakeDTO } from 'src/dto/add.stake.dto';
import { AddRoundUserDTO } from 'src/dto/add.round.user.dto';
import { RoundCards } from 'src/entities/RoundCards';
import { Rounds } from 'src/entities/Rounds';
import { RoundsService } from './rounds.service';

@Controller('rounds')
export class RoundsController {

    constructor(
        private roundsService: RoundsService,
    ) { }

    @Post()
    async addRound(@Req() request: Request, @Body() addRoundDTO: AddRoundDTO) {
        try {
            let roundId = await this.roundsService.addRound(addRoundDTO);
            let joinRound: AddRoundUserDTO = {
                roundId: roundId,
                userId: addRoundDTO.rootUserId
            }
            await this.roundsService.joinRound(joinRound);
            return { roundId: roundId}
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('join')
    async joinRound(@Req() request: Request, @Body() payload: AddRoundUserDTO): Promise<any> {
        try {
            await this.roundsService.joinRound(payload);
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
  
    @Post('stake')
    async addStake(@Req() request: Request, @Body() payload: AddStakeDTO): Promise<any> {
        try {
            await this.roundsService.addStake(payload);
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getRound(@Req() request: Request, @Param('id') id): Promise<Rounds> {
        try {
            return await this.roundsService.getRound(id);
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id/users/:userId')
    async getUserRound(@Req() request: Request, @Param('id') id, @Param('userId') userId): Promise<Rounds> {
        try {
            return await this.roundsService.getUserRound(id, userId);
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post(':id/users/:userId')
    async addUserEvent(@Req() request: Request, @Param('id') id, @Param('userId') userId, @Body() payload: AddEventDTO): Promise<any> {
        try {
            if (payload.eventType === 'CARD') {
                let addCard: RoundCards = {
                    userId: userId,
                    roundId: id,
                    cardValue: payload.value
                }
                await this.roundsService.addCard(addCard);
            }
        } catch {
            throw new HttpException('Internal Server Error Exception', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
