<template>
  <button type="submit" :class="classProp">
    <slot> Submit </slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    classProp: {
      type: String,
      required: true,
    },
  },
};
</script>
