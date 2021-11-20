import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoomUserDTO {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    code: string;
}