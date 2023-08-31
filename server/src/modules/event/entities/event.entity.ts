import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LocationEntity } from 'src/modules/locations/entities/location.entity';

@ObjectType()
@Entity('events')
export class EventEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ type: 'timestamp' })
  startDate: Date;

  @Field()
  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ nullable: true })
  locationId: number;

  @ManyToOne(() => LocationEntity, (location) => location.events, {
    onDelete: 'SET NULL',
  })
  @Field(() => LocationEntity, { nullable: true })
  location: LocationEntity;
}
