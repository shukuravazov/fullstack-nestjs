import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';
import { CreateEventInput } from '../dto/create-event.input';
import { LocationEntity } from '../../locations/entities/location.entity';
import { UpdateEventInput } from '../dto/update-entity.input';
import { FilterEventInput } from '../dto/filter-event.inputs';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async createEvent(
    createEventInput: CreateEventInput,
    location: LocationEntity | null,
  ): Promise<EventEntity> {
    const event = this.eventRepository.create({
      ...createEventInput,
      location,
    });
    return this.eventRepository.save(event);
  }

  async updateEvent(updateEventInput: UpdateEventInput): Promise<EventEntity> {
    await this.eventRepository.update(
      { id: updateEventInput.id },
      { ...updateEventInput },
    );
    return await this.getOneEvent(updateEventInput.id);
  }

  async removeEvent(id: number): Promise<number> {
    await this.eventRepository.delete({ id });
    return id;
  }

  async getOneEvent(id: number): Promise<EventEntity> {
    return await this.eventRepository.findOne({
      where: { id },
      relations: {
        location: true,
      },
    });
  }

  async getEventsWithFilters(
    filter?: FilterEventInput,
  ): Promise<EventEntity[]> {
    const query = this.eventRepository.createQueryBuilder('event');

    if (filter) {
      if (filter.startDate) {
        const startDate = new Date(filter.startDate);
        startDate.setUTCHours(0, 0, 0, 0);
        query.andWhere('event.startDate >= :startDate', {
          startDate: startDate.toISOString(),
        });
      }

      if (filter.endDate) {
        const endDate = new Date(filter.endDate);
        endDate.setUTCHours(23, 59, 59, 999);
        query.andWhere('event.endDate <= :endDate', {
          endDate: endDate.toISOString(),
        });
      }

      if (filter.locationId) {
        query.andWhere('event.locationId = :locationId', {
          locationId: filter.locationId,
        });
      }
    }

    return query.getMany();
  }
}
