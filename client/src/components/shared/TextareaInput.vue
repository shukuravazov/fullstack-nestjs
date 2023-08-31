<template>
  <div class="form-floating mb-3">
    <textarea
      class="form-control"
      :placeholder="label"
      :value="modelValue"
      @input="$emit('update:modelValue', handleInputChange($event))"
      v-bind="$attrs"
    />
    <label class="col-form-label">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },

  setup: () => {
    const handleInputChange = (event: Event) =>
      (event.target as HTMLInputElement).value;

    return { handleInputChange };
  },
});
</script>
