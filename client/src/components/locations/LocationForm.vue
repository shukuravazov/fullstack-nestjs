<template>
  <h2>Location Form</h2>
  <form @submit.prevent="handleCreateLocation">
    <BaseInput v-model="title" label="Name" type="text" />
    <BaseInput v-model="address" label="Address" type="text" />
    <div class="d-grid gap-2 col-6 mx-auto">
      <BaseButton classProp="btn btn-primary">Create</BaseButton>
    </div>
  </form>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import LocationFormData from "../../interfaces/LocationFormData";
import useLocationMutation from "../../hooks/useLocationMutation";
import BaseInput from "../shared/BaseInput.vue";
import BaseButton from "../shared/BaseButton.vue";

export default {
  components: { BaseInput, BaseButton },
  setup() {
    const formData = reactive<LocationFormData>({
      title: "",
      address: "",
    });

    const { createLocation } = useLocationMutation();

    const handleCreateLocation = async () => {
      try {
        await createLocation({
          location: {
            name: formData.title,
            address: formData.address,
          },
        });
        clearForm();
      } catch (e) {
        console.error("Error creating location:", e);
      }
    };

    const clearForm = () => {
      for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
          formData[key as keyof LocationFormData] = "";
        }
      }
    };

    return {
      ...toRefs(formData),
      handleCreateLocation,
    };
  },
};
</script>
