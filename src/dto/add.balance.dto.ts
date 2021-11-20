import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddBalanceDTO {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    roomId: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    ccy: string;
}