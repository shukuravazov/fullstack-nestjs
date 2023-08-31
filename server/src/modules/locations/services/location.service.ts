import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from '../entities/location.entity';
import { CreateLocationInput } from '../dto/create-location.input';
import { UpdateLocationInput } from '../dto/update-location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  async createLocation(
    locationInput: CreateLocationInput,
  ): Promise<LocationEntity> {
    return this.locationRepository.save({ ...locationInput });
  }

  async getOneLocation(id: number): Promise<LocationEntity> {
    return this.locationRepository.findOne({
      where: { id },
      relations: {
        events: true,
      },
    });
  }

  async getAllLocations(): Promise<LocationEntity[]> {
    return this.locationRepository.find();
  }

  async removeLocation(id: number): Promise<number> {
    await this.locationRepository.delete({ id });
    return id;
  }

  async updateLocation(
    updateLocationInput: UpdateLocationInput,
  ): Promise<LocationEntity> {
    await this.locationRepository.update(
      { id: updateLocationInput.id },
      { ...updateLocationInput },
    );
    return await this.getOneLocation(updateLocationInput.id);
  }
}
