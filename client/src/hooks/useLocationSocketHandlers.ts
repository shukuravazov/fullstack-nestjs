import { locationSocketService } from "../services/LocationSocketService";
import LocationData from "@/interfaces/LocationData";
import { ref } from "vue";

function useLocationSocketHandlers() {
  const locations = ref<LocationData[]>([]);

  const loadLocations = () => {
    locationSocketService.handleAllLocations((allLocations: LocationData[]) => {
      locations.value = allLocations;
    });
  };

  const addLocation = () => {
    locationSocketService.handleAddedLocation(
      (getAddedLocation: LocationData) => {
        locations.value = [...locations.value, getAddedLocation];
      }
    );
  };

  const removeLocation = () => {
    locationSocketService.handleRemovedLocation((removedLocationId: number) => {
      locations.value = locations.value.filter(
        (location) => location.id !== removedLocationId
      );
    });
  };

  const updateLocation = () => {
    locationSocketService.handleUpdatedLocation(
      (updatedLocation: LocationData) => {
        const index = locations.value.findIndex(
          (location) => location.id === updatedLocation.id
        );
        if (index !== -1) {
          locations.value[index] = updatedLocation;
        }
      }
    );
  };

  const initializeLocationHandlers = () => {
    loadLocations();
    addLocation();
    removeLocation();
    updateLocation();
  };

  return {
    locations,
    initializeLocationHandlers,
  };
}

export default useLocationSocketHandlers;
