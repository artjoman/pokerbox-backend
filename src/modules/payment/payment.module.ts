import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentController } from './payment.controller';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';
import { PaymentGateway } from './payment.gateway';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { TopicModule } from '../topic/topic.module';
import { Topic } from '../topic/topic.entity';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { PaymentException } from './payment.exception';

@Module({
  imports: [
    MappedExceptionModule.forFeature(PaymentException),
    TypeOrmModule.forFeature([Payment, Topic]),
    AuthModule,
    TopicModule,
  ],
  providers: [PaymentService, AuthService, PaymentGateway],
  controllers: [PaymentController],
})
export class PaymentModule {}
