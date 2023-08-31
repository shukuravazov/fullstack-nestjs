import { useMutation } from "@vue/apollo-composable";
import CREATE_LOCATION_MUTATION from "../api/mutations/CREATE_LOCATION_MUTATION";
import UPDATE_LOCATION_MUTATION from "../api/mutations/UPDATE_LOCATION_MUTATION";
import REMOVE_LOCATION_MUTATION from "../api/mutations/REMOVE_LOCATION_MUTATION";

function useLocationMutation() {
  const { mutate: createLocation } = useMutation(CREATE_LOCATION_MUTATION);
  const { mutate: updateLocation } = useMutation(UPDATE_LOCATION_MUTATION);
  const { mutate: removeLocation } = useMutation(REMOVE_LOCATION_MUTATION);

  return {
    createLocation,
    updateLocation,
    removeLocation,
  };
}

export default useLocationMutation;
