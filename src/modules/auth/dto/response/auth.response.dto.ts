import { AuthType } from '../../interfaces/types.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'user identifier', nullable: false })
  clientId: string;

  @ApiProperty({ description: 'access token', nullable: false })
  token: string;

  @ApiProperty({ description: 'name of user', nullable: false })
  username: string;

  @ApiProperty({
    enum: AuthType,
    description: 'allowed types of access ( basic )',
    default: AuthType.DEFAULT,
    nullable: false,
  })
  type: AuthType;
}
