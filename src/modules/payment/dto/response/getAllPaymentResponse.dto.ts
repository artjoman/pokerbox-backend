import { Payment } from '../../payment.entity';
import { ApiProperty } from '@nestjs/swagger';

class GetAllPaymentResponseDataDto extends Payment {}

export class GetAllPaymentResponseDto {
  @ApiProperty({
    type: GetAllPaymentResponseDataDto,
    isArray: true,
  })
  data: GetAllPaymentResponseDataDto[];
  @ApiProperty({
    type: 'number',
  })
  count: number;
}
