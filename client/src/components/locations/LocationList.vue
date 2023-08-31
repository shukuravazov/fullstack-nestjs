<template>
  <LocationUpdateForm
    v-if="isUpdateFormVisible"
    :locationId="selectedLocationId || 0"
    :closeUpdateComponent="closeUpdateComponent"
  />
  <h1>Locations</h1>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Location</th>
        <th scope="col">Addres</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <LocationListItem
        v-for="locationData in locations"
        :key="locationData.id"
        :locationData="locationData"
        :handleRemoveLocation="handleRemoveLocation"
        :openUpdateComponent="openUpdateComponent"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import useLocationSocketHandlers from "@/hooks/useLocationSocketHandlers";
import useLocationMutation from "@/hooks/useLocationMutation";
import LocationListItem from "./LocationListItem.vue";
import LocationUpdateForm from "./LocationUpdateForm.vue";

export default {
  components: {
    LocationListItem,
    LocationUpdateForm,
  },
  setup() {
    const { removeLocation } = useLocationMutation();
    const isUpdateComponentOpen = ref(false);
    const selectedLocationId = ref<number | null>(null);
    const { locations, initializeLocationHandlers } =
      useLocationSocketHandlers();

    onBeforeMount(() => {
      initializeLocationHandlers();
    });

    const isUpdateFormVisible = computed(
      () => isUpdateComponentOpen.value && selectedLocationId.value !== null
    );

    const openUpdateComponent = (locationId: number) => {
      isUpdateComponentOpen.value = true;
      selectedLocationId.value = locationId;
    };

    const closeUpdateComponent = () => {
      isUpdateComponentOpen.value = false;
    };

    const handleRemoveLocation = async (id: number) => {
      try {
        await removeLocation({
          id: id,
        });
      } catch (e) {
        console.error("Error removing event:", e);
      }
    };

    return {
      locations,
      isUpdateComponentOpen,
      selectedLocationId,
      isUpdateFormVisible,
      handleRemoveLocation,
      openUpdateComponent,
      closeUpdateComponent,
    };
  },
};
</script>
