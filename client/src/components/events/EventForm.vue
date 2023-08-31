<template>
  <div>
    <h3>Add new event</h3>
    <form @submit.prevent="handleSubmit">
      <BaseInput v-model="eventTitle" label="Name" type="text" />
      <TextareaInput
        v-model="eventDescription"
        label="Description"
        type="text"
      />
      <BaseInput
        v-model="eventStartDate"
        label="Start Date"
        type="datetime-local"
      />
      <BaseInput
        v-model="eventEndDate"
        label="End Date"
        type="datetime-local"
      />
      <SelectInput v-model="eventLocationId" :options="locations" />
      <div class="d-grid gap-2 col-6 mx-auto">
        <BaseButton classProp="btn btn-primary">Create</BaseButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, reactive, toRefs } from "vue";
import useEventMutation from "../../hooks/useEventMutation";
import useLocationSocketHandlers from "../../hooks/useLocationSocketHandlers";
import EventFormData from "../../interfaces/EventFormData";
import BaseInput from "../shared/BaseInput.vue";
import SelectInput from "../shared/SelectInput.vue";
import BaseButton from "../shared/BaseButton.vue";
import TextareaInput from "../shared/TextareaInput.vue";

export default {
  components: { BaseInput, SelectInput, BaseButton, TextareaInput },

  setup() {
    const { locations, initializeLocationHandlers } =
      useLocationSocketHandlers();

    onBeforeMount(() => {
      initializeLocationHandlers();
    });

    const formData = reactive<EventFormData>({
      eventTitle: "",
      eventDescription: "",
      eventStartDate: "",
      eventEndDate: "",
      eventLocationId: "",
    });

    const { createEvent } = useEventMutation();

    const handleSubmit = async () => {
      try {
        const createEventInput = prepareCreateEventInput(formData);
        await createEvent({ createEventInput });
        clearForm();
      } catch (e) {
        console.error("Error creating event:", e);
      }
    };

    const prepareCreateEventInput = (formData: EventFormData) => {
      const locationId =
        formData.eventLocationId !== null
          ? parseInt(formData.eventLocationId, 10)
          : null;

      return {
        name: formData.eventTitle,
        description: formData.eventDescription,
        startDate: new Date(formData.eventStartDate).toISOString(),
        endDate: new Date(formData.eventEndDate).toISOString(),
        locationId: locationId,
      };
    };

    const clearForm = () => {
      for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
          formData[key as keyof EventFormData] = "";
        }
      }
    };

    return {
      locations,
      ...toRefs(formData),
      handleSubmit,
    };
  },
};
</script>
