import { eventSocketService } from "../services/EventSocketService";
import EventData from "@/interfaces/EventData";
import { ref } from "vue";

function useEventsSocketHandlers() {
  const events = ref<EventData[]>([]);

  const loadEvents = () => {
    eventSocketService.handleAllEvents((allEvents: EventData[]) => {
      events.value = allEvents;
    });
  };

  const addeEvent = () => {
    eventSocketService.handleAddedEvent((getAddedEvent: EventData) => {
      events.value = [...events.value, getAddedEvent];
    });
  };

  const removeEvent = () => {
    eventSocketService.handleRemovedEvent((removedEventId: number) => {
      events.value = events.value.filter(
        (event) => event.id !== removedEventId
      );
    });
  };

  const updateEvent = () => {
    eventSocketService.handleUpdatedEvent((updatedEvent: EventData) => {
      const index = events.value.findIndex(
        (event) => event.id === updatedEvent.id
      );
      if (index !== -1) {
        events.value[index] = updatedEvent;
      }
    });
  };

  const initializeEventHandlers = () => {
    loadEvents();
    addeEvent();
    removeEvent();
    updateEvent();
  };

  return {
    events,
    initializeEventHandlers,
  };
}

export default useEventsSocketHandlers;
