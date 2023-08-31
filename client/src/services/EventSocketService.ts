import { io, Socket } from "socket.io-client";
import EventData from "@/interfaces/EventData";

class EventSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:8000");
  }

  handleAllEvents(callback: (events: EventData[]) => void) {
    this.socket.emit("getEventsFilter", {});
    this.socket.on("getEvents", (allEvents: EventData[]) => {
      callback(allEvents);
    });
  }

  handleAddedEvent(callback: (event: EventData) => void) {
    this.socket.on("getAddedEvent", (getAddedEvent: EventData) => {
      callback(getAddedEvent);
    });
  }

  handleRemovedEvent(callback: (removedEventId: number) => void) {
    this.socket.on("getRemovedEvent", (removedEventId: number) => {
      callback(removedEventId);
    });
  }

  handleUpdatedEvent(callback: (updatedEvent: EventData) => void) {
    this.socket.on("updatedEvent", (updatedEvent: EventData) => {
      callback(updatedEvent);
    });
  }
}

export const eventSocketService = new EventSocketService();
