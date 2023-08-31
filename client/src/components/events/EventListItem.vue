<template>
  <tr>
    <th scope="row">{{ eventData.name }}</th>
    <td>{{ eventData.description }}</td>
    <td>{{ formatDate(eventData.startDate) }}</td>
    <td>{{ formatDate(eventData.endDate) }}</td>
    <td>{{ eventData.location?.name || "No location" }}</td>
    <td>
      <ActionButton
        :onClick="() => openUpdateComponent(eventData.id)"
        classProp="btn btn-primary btn-sm"
        >Update</ActionButton
      >
    </td>
    <td>
      <ActionButton
        :onClick="() => handleRemoveEvent(eventData.id)"
        classProp="btn btn-danger btn-sm"
        >Delete</ActionButton
      >
    </td>
  </tr>
</template>

<script lang="ts">
import formatDate from "../../utils/dateUtils";
import ActionButton from "../shared/ActionButton.vue";

export default {
  components: { ActionButton },
  props: {
    eventData: {
      type: Object,
      required: true,
    },
    handleRemoveEvent: {
      type: Function,
      required: true,
    },
    openUpdateComponent: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return { formatDate };
  },
};
</script>
