import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterEventInput {
  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  locationId?: number;
}
