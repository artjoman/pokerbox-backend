import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoundDTO {

    @IsNotEmpty()
    @IsNumber()
    roomId: number;

    @IsNotEmpty()
    @IsNumber()
    rootUserId: number;
    
}