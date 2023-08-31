import { Field, ID, ObjectType } from '@nestjs/graphql';
import { EventEntity } from 'src/modules/event/entities/event.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity('locations')
export class LocationEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  address: string;

  @OneToMany(() => EventEntity, (event) => event.location, {
    onDelete: 'SET NULL',
  })
  @Field(() => [EventEntity], { nullable: true })
  events: EventEntity[];
}
