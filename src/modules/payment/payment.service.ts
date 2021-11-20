import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';

import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/request/createPayment.dto';
import { UpdatePaymentDto } from './dto/request/updatePayment.dto';
import { CreatePaymentResponseDto } from './dto/response/createPaymentResponse.dto';
import { UpdatePaymentResponseDto } from './dto/response/updatePaymentResponse.dto';
import { GetAllPaymentDto } from './dto/request/getAllPayment.dto';
import { PaymentException } from './payment.exception';
import { MappedException } from 'nestjs-mapped-exception';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
    private readonly exception: MappedException<PaymentException>,
  ) {}

  async getAll(
    filter: GetAllPaymentDto,
  ): Promise<{ data: Payment[]; count: number }> {
    const criteria = {
      take: filter.take,
      skip: filter.skip,
    } as any;

    if (filter.search) {
      criteria.where = { name: Raw(a => `${a} ILIKE '%${filter.search}%'`) };
    }

    const [data, count] = await this.repository.findAndCount({});
    return { data, count };
  }

  async getOne(id: string): Promise<Payment> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch (err) {
      this.exception.ERRORS.NOT_FOUND.throw();
    }
  }

  async create(paymentCreateDto: CreatePaymentDto): Promise<CreatePaymentResponseDto> {
    const { payment, name, topic, clientId } = paymentCreateDto;

    const entity = this.repository.create({
      payment,
      name,
      topic,
      clientId,
    });

    return await this.repository.save(entity);
  }

  async update(
    id: string,
    paymentDTO: UpdatePaymentDto,
  ): Promise<UpdatePaymentResponseDto> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      this.exception.ERRORS.NOT_FOUND.throw();
    }

    try {
      const entityUpdate = this.repository.merge(entity, paymentDTO);

      return await this.repository.save(entityUpdate);
    } catch (err) {
      this.exception.ERRORS.SAVE_ERROR.throw();
    }
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      this.exception.ERRORS.NOT_FOUND.throw();
    }

    try {
      await this.repository.delete(entity);
    } catch (err) {
      this.exception.ERRORS.DELETE_ERROR.throw();
    }
  }

  async payment(paymentDTO: CreatePaymentDto): Promise<Payment> {
    const { topic, clientId } = paymentDTO;
    const payment = await this.repository.findOne({ where: { topic, clientId } });

    if (payment) {
      return this.update(payment.id, paymentDTO);
    }

    return this.create(paymentDTO);
  }
}
