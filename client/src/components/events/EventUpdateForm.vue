<template>
  <div>
    <h2>Update event</h2>
    <form @submit.prevent="handleUpdateEvent">
      <BaseInput v-model="updatedEvent.eventTitle" label="Name" type="text" />
      <TextareaInput
        v-model="updatedEvent.eventDescription"
        label="Description"
        type="text"
      />
      <BaseInput
        v-model="updatedEvent.eventStartDate"
        label="Start Date"
        type="datetime-local"
      />
      <BaseInput
        v-model="updatedEvent.eventEndDate"
        label="Start Date"
        type="datetime-local"
      />
      <SelectInput
        v-model="updatedEvent.eventLocationId"
        :options="locations"
      />
      <div class="d-grid gap-2 d-md-flex justify-content-md-center">
        <ActionButton
          :onClick="() => closeUpdateComponent()"
          classProp="btn btn-secondary"
          >Close</ActionButton
        >
        <button class="btn btn-primary" type="submit">Save changes</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { PropType, onBeforeMount, ref, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import useLocationSocketHandlers from "../../hooks/useLocationSocketHandlers";
import useEventMutation from "../../hooks/useEventMutation";
import GET_ONE_EVENT_QUERY from "../../api/queries/GET_ONE_EVENT_QUERY";
import EventInput from "../../interfaces/EventInput";
import BaseInput from "../../components/shared/BaseInput.vue";
import SelectInput from "../../components/shared/SelectInput.vue";
import TextareaInput from "../shared/TextareaInput.vue";
import EventUpdateProps from "@/interfaces/EventUpdateProps";
import ActionButton from "../shared/ActionButton.vue";

export default {
  components: {
    BaseInput,
    TextareaInput,
    SelectInput,
    ActionButton,
  },
  props: {
    eventId: {
      type: Number,
      required: true,
    },
    closeUpdateComponent: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },

  setup(props: EventUpdateProps) {
    const eventId = ref(props.eventId);
    const { updateEvent } = useEventMutation();
    const { result } = useQuery(GET_ONE_EVENT_QUERY, {
      id: eventId,
    });

    const { locations, initializeLocationHandlers } =
      useLocationSocketHandlers();

    onBeforeMount(() => {
      initializeLocationHandlers();
    });

    const updatedEvent = ref<EventInput>({
      eventId: eventId.value,
      eventTitle: "",
      eventStartDate: "",
      eventEndDate: "",
      eventDescription: "",
      eventLocationId: "",
    });

    watchEffect(() => {
      if (result.value) {
        const fetchedEvent = result.value.getOneEvent;
        updatedEvent.value.eventId = parseInt(fetchedEvent.id, 10);
        updatedEvent.value.eventTitle = fetchedEvent.name;
        updatedEvent.value.eventDescription = fetchedEvent.description;
        updatedEvent.value.eventStartDate = fetchedEvent.startDate;
        updatedEvent.value.eventEndDate = fetchedEvent.endDate;
        updatedEvent.value.eventLocationId = fetchedEvent.location?.id || "";
      }
    });

    const handleUpdateEvent = async () => {
      try {
        await updateEvent({
          event: {
            id: updatedEvent.value.eventId,
            name: updatedEvent.value.eventTitle,
            startDate: new Date(
              updatedEvent.value.eventStartDate
            ).toISOString(),
            endDate: new Date(updatedEvent.value.eventEndDate).toISOString(),
            description: updatedEvent.value.eventDescription,
            locationId: parseInt(updatedEvent.value.eventLocationId),
          },
        });
        props.closeUpdateComponent();
      } catch (e) {
        console.error("Error updating event:", e);
      }
    };
    return { updatedEvent, locations, handleUpdateEvent };
  },
};
</script>
