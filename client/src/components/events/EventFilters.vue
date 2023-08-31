<template>
  <div class="filter-elments">
    <BaseInput
      v-model="filters.startDateFilter.value"
      label="from"
      type="date"
    />
    <BaseInput v-model="filters.endDateFilter.value" label="to" type="date" />
    <SelectInput
      v-model="filters.locationIdFilter.value"
      :options="locations"
    />
    <ActionButton :onClick="applyFilters" classProp="btn btn-outline-primary"
      >Filter</ActionButton
    >
    <ActionButton :onClick="clearFilters" classProp="btn btn-outline-secondary"
      >Clear</ActionButton
    >
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { io } from "socket.io-client";
import OptionItem from "@/interfaces/OptionItem";
import SelectInput from "../shared/SelectInput.vue";
import ActionButton from "../shared/ActionButton.vue";
import BaseInput from "../shared/BaseInput.vue";

export default {
  components: {
    BaseInput,
    SelectInput,
    ActionButton,
  },

  props: {
    locations: {
      type: Array as () => OptionItem[],
      default: () => [],
    },
  },

  setup() {
    const socket = io("http://localhost:8000");

    const filters = {
      startDateFilter: ref<string>(""),
      endDateFilter: ref<string>(""),
      locationIdFilter: ref<string>(""),
    };

    const applyFilters = () => {
      socket.emit("getEventsFilter", {
        startDate: filters.startDateFilter.value,
        endDate: filters.endDateFilter.value,
        locationId: filters.locationIdFilter.value,
      });
    };

    const clearFilters = () => {
      filters.startDateFilter.value = "";
      filters.endDateFilter.value = "";
      filters.locationIdFilter.value = "";
      socket.emit("getEventsFilter", {});
    };

    return {
      filters,
      applyFilters,
      clearFilters,
    };
  },
};
</script>

<style>
.filter-elments {
  display: flex;
  align-items: flex-start;
  width: 600px;
}
</style>
