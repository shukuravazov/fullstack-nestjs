import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { EventEntity } from '../entities/event.entity';
import { EventService } from '../services/event.service';
import { CreateEventInput } from '../dto/create-event.input';
import { LocationService } from '../../locations/services/location.service';
import { UpdateEventInput } from '../dto/update-entity.input';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FilterEventInput } from '../dto/filter-event.inputs';
import { LocationEntity } from '../../locations/entities/location.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Resolver('Event')
export class EventResolver {
  @WebSocketServer()
  server: Server;
  constructor(
    private eventService: EventService,
    private readonly locationService: LocationService,
  ) {}

  @SubscribeMessage('createEvent')
  @Mutation(() => EventEntity)
  async createEvent(
    @Args('createEvent')
    createEventInput: CreateEventInput,
  ): Promise<EventEntity> {
    try {
      const locationId = createEventInput.locationId;
      let location: LocationEntity | null = null;

      if (locationId) {
        location = await this.locationService.getOneLocation(locationId);
      }

      const newEvent = await this.eventService.createEvent(
        createEventInput,
        location,
      );

      this.server.emit('getAddedEvent', newEvent);
      return newEvent;
    } catch (error) {
      throw new HttpException(
        'An error occurred while creating the event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @SubscribeMessage('getEventsFilter')
  @Query(() => [EventEntity])
  async getEvents(
    @MessageBody()
    @Args('filter', { nullable: true })
    filter?: FilterEventInput,
  ): Promise<EventEntity[]> {
    try {
      const events = await this.eventService.getEventsWithFilters(filter);

      await Promise.all(
        events.map(async (event) => {
          if (event.locationId) {
            event.location = await this.locationService.getOneLocation(
              event.locationId,
            );
          }
          return event;
        }),
      );

      this.server.emit('getEvents', events);
      return events;
    } catch (error) {
      throw new HttpException(
        'An error occurred while fetching events',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query(() => EventEntity)
  async getOneEvent(@Args('id') id: number): Promise<EventEntity> {
    try {
      return await this.eventService.getOneEvent(id);
    } catch (error) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
  }

  @SubscribeMessage('getUpdatedEvent')
  @Mutation(() => EventEntity)
  async updateEvent(
    @Args('updateEvent') updateEventInput: UpdateEventInput,
  ): Promise<EventEntity> {
    try {
      const updatedEvent =
        await this.eventService.updateEvent(updateEventInput);
      this.server.emit('updatedEvent', updatedEvent);
      return updatedEvent;
    } catch (error) {
      throw new HttpException(
        'An error occurred while updating the event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @SubscribeMessage('getRemovedEvent')
  @Mutation(() => Float)
  async removeEvent(@Args('id') id: number): Promise<number> {
    try {
      const removedEventId = id;
      this.server.emit('getRemovedEvent', removedEventId);
      return await this.eventService.removeEvent(removedEventId);
    } catch (error) {
      throw new HttpException(
        'An error occurred while removing the event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
