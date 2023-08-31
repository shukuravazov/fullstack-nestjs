<template>
  <select
    class="form-select mb-3"
    :value="modelValue"
    @input="$emit('update:modelValue', handleInputChange($event))"
  >
    <option value="" disabled>Select a location</option>
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OptionItem from "../../interfaces/OptionItem";

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    options: {
      type: Array as () => OptionItem[],
      default: () => [],
    },
  },

  setup: () => {
    const handleInputChange = (event: Event) =>
      (event.target as HTMLInputElement).value;

    return { handleInputChange };
  },
});
</script>
