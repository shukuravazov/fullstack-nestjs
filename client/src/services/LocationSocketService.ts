import { io, Socket } from "socket.io-client";
import LocationData from "@/interfaces/LocationData";

class LocationSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:8000");
  }

  handleAllLocations(callback: (locations: LocationData[]) => void) {
    this.socket.emit("findAllLocations");
    this.socket.on("allLocations", (allLocations: LocationData[]) => {
      callback(allLocations);
    });
  }

  handleAddedLocation(callback: (location: LocationData) => void) {
    this.socket.on("getAddedLocation", (getAddedLocation: LocationData) => {
      callback(getAddedLocation);
    });
  }

  handleRemovedLocation(callback: (removedLocationId: number) => void) {
    this.socket.on("getRemovedLocation", (removedLocationId: number) => {
      callback(removedLocationId);
    });
  }

  handleUpdatedLocation(callback: (updatedLocation: LocationData) => void) {
    this.socket.on("updatedLocation", (updatedLocation: LocationData) => {
      callback(updatedLocation);
    });
  }
}

export const locationSocketService = new LocationSocketService();
