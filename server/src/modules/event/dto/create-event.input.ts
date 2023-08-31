import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => Int, { nullable: true })
  locationId?: number;
}
