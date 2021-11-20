import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddEventDTO {
    @IsNotEmpty()
    @IsString()
    eventType: string;

    @IsNotEmpty()
    @IsString()
    roomId: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    value: string;
}