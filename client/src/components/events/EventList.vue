<template>
  <EventUpdateForm
    v-if="isUpdateFormVisible"
    :eventId="selectedEventId || 0"
    :closeUpdateComponent="closeUpdateComponent"
  />
  <h1>Events</h1>
  <EventFilters :locations="locations" />
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Start Date</th>
        <th scope="col">End Date</th>
        <th scope="col">Lcation</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <EventListItem
        v-for="eventData in events"
        :key="eventData.id"
        :eventData="eventData"
        :handleRemoveEvent="handleRemoveEvent"
        :openUpdateComponent="openUpdateComponent"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import useEventMutation from "../../hooks/useEventMutation";
import useLocationSocketHandlers from "../../hooks/useLocationSocketHandlers";
import useEventsSocketHandlers from "../../hooks/useEventSocketHandlers";
import EventUpdateForm from "./EventUpdateForm.vue";
import EventFilters from "./EventFilters.vue";
import EventListItem from "./EventListItem.vue";

export default {
  components: {
    EventUpdateForm,
    EventFilters,
    EventListItem,
  },

  setup() {
    const { removeEvent } = useEventMutation();
    const isUpdateComponentOpen = ref(false);
    const selectedEventId = ref<number | null>(null);
    const { events, initializeEventHandlers } = useEventsSocketHandlers();
    const { locations, initializeLocationHandlers } =
      useLocationSocketHandlers();

    onBeforeMount(() => {
      initializeEventHandlers();
      initializeLocationHandlers();
    });

    const isUpdateFormVisible = computed(
      () => isUpdateComponentOpen.value && selectedEventId.value !== null
    );

    const openUpdateComponent = (eventId: number) => {
      isUpdateComponentOpen.value = true;
      selectedEventId.value = eventId;
    };

    const closeUpdateComponent = () => {
      isUpdateComponentOpen.value = false;
    };

    const handleRemoveEvent = async (eventId: number) => {
      try {
        removeEvent({
          id: eventId,
        });
      } catch (e) {
        console.error("Error removing event:", e);
      }
    };

    return {
      events,
      isUpdateComponentOpen,
      selectedEventId,
      locations,
      isUpdateFormVisible,
      handleRemoveEvent,
      openUpdateComponent,
      closeUpdateComponent,
    };
  },
};
</script>

<style></style>
