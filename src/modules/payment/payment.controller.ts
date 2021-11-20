import {
  Controller,
  Get,
  Body,
  HttpStatus,
  Put,
  Param,
  Delete,
  Post,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiBasicAuth, ApiTags } from '@nestjs/swagger';

import { PaymentService } from './payment.service';
import { GetAllPaymentResponseDto } from './dto/response/getAllPaymentResponse.dto';
import { GetAllPaymentDto } from './dto/request/getAllPayment.dto';
import { GetOnePaymentResponseDto } from './dto/response/getOnePaymentResponse.dto';
import { CreatePaymentResponseDto } from './dto/response/createPaymentResponse.dto';
import { CreatePaymentDto } from './dto/request/createPayment.dto';
import { UpdatePaymentResponseDto } from './dto/response/updatePaymentResponse.dto';
import { UpdatePaymentDto } from './dto/request/updatePayment.dto';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @ApiResponse({
    type: GetAllPaymentResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() filter: GetAllPaymentDto): Promise<GetAllPaymentResponseDto> {
    return await this.paymentService.getAll(filter);
  }

  @Get(':id')
  @ApiResponse({
    type: GetOnePaymentResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<GetOnePaymentResponseDto> {
    return await this.paymentService.getOne(id);
  }

  @Post()
  @ApiResponse({
    type: CreatePaymentResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreatePaymentDto): Promise<CreatePaymentResponseDto> {
    return await this.paymentService.create(data);
  }

  @Put(':id')
  @ApiResponse({
    type: UpdatePaymentResponseDto,
  })
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() data: UpdatePaymentDto) {
    return await this.paymentService.update(id, data);
  }

  @Delete(':id')
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.paymentService.delete(id);
  }
}
