import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field()
  name: string;

  @Field()
  address: string;
}
