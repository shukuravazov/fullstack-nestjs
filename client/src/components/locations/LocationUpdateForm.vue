<template>
  <h2>Update Location:</h2>
  <form @submit.prevent="handleUpdateLocation">
    <BaseInput v-model="updatedLocation.name" label="Name" type="text" />
    <BaseInput v-model="updatedLocation.address" label="Address" type="text" />
    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
      <ActionButton
        :onClick="() => closeUpdateComponent()"
        classProp="btn btn-secondary"
        >Close</ActionButton
      >
      <button class="btn btn-primary" type="submit">Save changes</button>
    </div>
  </form>
</template>

<script lang="ts">
import { PropType, ref, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import GET_ONE_LOCATION_QUERY from "@/api/queries/GET_ONE_LOCATION_QUERY";
import useLocationMutation from "../../hooks/useLocationMutation";
import LocationData from "../../interfaces/LocationData";
import BaseInput from "../shared/BaseInput.vue";
import LocationUpdateProps from "@/interfaces/LocationUpdateProps";
import ActionButton from "../shared/ActionButton.vue";

export default {
  components: { BaseInput, ActionButton },
  props: {
    locationId: {
      type: Number,
      required: true,
    },
    closeUpdateComponent: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props: LocationUpdateProps) {
    const locationId = ref(props.locationId);
    const { updateLocation } = useLocationMutation();
    const { result } = useQuery(GET_ONE_LOCATION_QUERY, {
      id: locationId,
    });

    const updatedLocation = ref<LocationData>({
      id: locationId.value,
      name: "",
      address: "",
    });

    watchEffect(() => {
      if (result.value) {
        const fetchedLocation = result.value.getOneLocation;
        updatedLocation.value.id = parseInt(fetchedLocation.id, 10);
        updatedLocation.value.name = fetchedLocation.name;
        updatedLocation.value.address = fetchedLocation.address;
      }
    });

    const handleUpdateLocation = async () => {
      try {
        await updateLocation({
          location: {
            id: updatedLocation.value.id,
            name: updatedLocation.value.name,
            address: updatedLocation.value.address,
          },
        });
        props.closeUpdateComponent();
      } catch (e) {
        console.error("Error updating location:", e);
      }
    };
    return { updatedLocation, handleUpdateLocation };
  },
};
</script>
