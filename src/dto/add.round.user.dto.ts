import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoundUserDTO {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    roundId: number;
}