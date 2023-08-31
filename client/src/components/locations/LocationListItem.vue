<template>
  <tr>
    <th scope="row">{{ locationData.name }}</th>
    <td>{{ locationData.address }}</td>
    <td>
      <ActionButton
        :onClick="() => openUpdateComponent(locationData.id)"
        classProp="btn btn-primary btn-sm"
        >Update</ActionButton
      >
    </td>
    <td>
      <ActionButton
        :onClick="() => handleRemoveLocation(locationData.id)"
        classProp="btn btn-danger btn-sm"
        >Delete</ActionButton
      >
    </td>
  </tr>
</template>

<script lang="ts">
import ActionButton from "../shared/ActionButton.vue";

export default {
  props: {
    locationData: {
      type: Object,
      required: true,
    },
    handleRemoveLocation: {
      type: Function,
      required: true,
    },
    openUpdateComponent: {
      type: Function,
      required: true,
    },
  },
  components: { ActionButton },
};
</script>
