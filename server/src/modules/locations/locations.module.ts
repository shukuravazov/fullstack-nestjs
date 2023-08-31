import { Module } from '@nestjs/common';
import { LocationResolver } from './resolvers/location.resolver';
import { LocationService } from './services/location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './entities/location.entity';
import { EventEntity } from 'src/modules/event/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, EventEntity])],
  providers: [LocationResolver, LocationService],
})
export class LocationsModule {}
