import { Args, Mutation, Resolver, Query, Float } from '@nestjs/graphql';
import { LocationEntity } from 'src/modules/locations/entities/location.entity';
import { CreateLocationInput } from 'src/modules/locations/dto/create-location.input';
import { UpdateLocationInput } from 'src/modules/locations/dto/update-location.entity';
import { LocationService } from 'src/modules/locations/services/location.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HttpException, HttpStatus } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Resolver('Location')
export class LocationResolver {
  @WebSocketServer()
  server: Server;
  constructor(private readonly locationService: LocationService) {}

  @SubscribeMessage('createLocation')
  @Mutation(() => LocationEntity)
  async createLocation(
    @Args('createLocation') createLocationInput: CreateLocationInput,
  ): Promise<LocationEntity> {
    try {
      const newLocation =
        await this.locationService.createLocation(createLocationInput);

      this.server.emit('getAddedLocation', newLocation);
      return newLocation;
    } catch (error) {
      throw new HttpException(
        'An error occurred while creating the location',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @SubscribeMessage('findAllLocations')
  @Query(() => [LocationEntity])
  async getLocations(): Promise<LocationEntity[]> {
    try {
      const allLocations = await this.locationService.getAllLocations();
      this.server.emit('allLocations', allLocations);
      return allLocations;
    } catch (error) {
      throw new HttpException(
        'An error occurred while fetching locations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query(() => LocationEntity)
  async getOneLocation(@Args('id') id: number): Promise<LocationEntity> {
    try {
      return await this.locationService.getOneLocation(id);
    } catch (error) {
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    }
  }

  @SubscribeMessage('getUpdatedLocation')
  @Mutation(() => LocationEntity)
  async updateLocation(
    @Args('updateLocation') updateLocationInput: UpdateLocationInput,
  ): Promise<LocationEntity> {
    try {
      const updatedLocation =
        await this.locationService.updateLocation(updateLocationInput);
      this.server.emit('updatedLocation', updatedLocation);
      return updatedLocation;
    } catch (error) {
      throw new HttpException(
        'An error occurred while updating the location',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @SubscribeMessage('getRemovedLocation')
  @Mutation(() => Float)
  async removeLocation(@Args('id') id: number): Promise<number> {
    try {
      const removedLocationId = id;
      this.server.emit('getRemovedLocation', removedLocationId);
      return await this.locationService.removeLocation(removedLocationId);
    } catch (error) {
      throw new HttpException(
        'An error occurred while removing the location',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
