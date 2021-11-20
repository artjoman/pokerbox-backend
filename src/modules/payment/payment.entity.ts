import { BaseEntity } from '../common/entities/base.entity';
import { Column, ManyToOne, JoinColumn, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Topic } from '../topic/topic.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Payment extends BaseEntity {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Column()
  payment: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({
    nullable: false,
    description:
      'Client ID',
  })
  @IsNotEmpty()
  @Column()
  clientId: string;

  @ApiProperty({ nullable: false, description: 'Topic Id' })
  @IsNotEmpty()
  @ManyToOne(
    () => Topic,
    topic => topic.payments,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  topic: string;
}
