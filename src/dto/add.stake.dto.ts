import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddStakeDTO {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    roundId: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    ccy: string;
}