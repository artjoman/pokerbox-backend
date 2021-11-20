import { IsNotEmpty, IsBoolean, IsString, IsNumber } from 'class-validator';

export class CreateRoomDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsBoolean()
    public: boolean;
}