import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventResolver } from './resolvers/event.resolver';
import { EventService } from './services/event.service';
import { LocationEntity } from '../locations/entities/location.entity';
import { LocationService } from '../locations/services/location.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, LocationEntity])],
  providers: [EventResolver, EventService, LocationService],
})
export class ProductModule {}
