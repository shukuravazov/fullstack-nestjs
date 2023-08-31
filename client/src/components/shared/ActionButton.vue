<template>
  <button @click="handleClick" :class="classProp">
    <slot>Submit</slot>
  </button>
</template>

<script lang="ts">
import { PropType } from "vue";
import ActionButtonProps from "@/interfaces/ActionButtonProps";

export default {
  props: {
    onClick: {
      type: Function as PropType<() => void>,
      required: true,
    },
    classProp: {
      type: String,
      required: true,
    },
  },

  setup(props: ActionButtonProps) {
    const handleClick = () => {
      props.onClick();
    };

    return {
      handleClick,
    };
  },
};
</script>
