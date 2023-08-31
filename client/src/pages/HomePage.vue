<template>
  <div class="home-container">
    <div class="list-container">
      <EventList />
      <LocationList />
    </div>
    <div class="form-container">
      <EventForm />
      <LocationForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import EventForm from "@/components/events/EventForm.vue";
import EventList from "@/components/events/EventList.vue";
import LocationForm from "@/components/locations/LocationForm.vue";
import LocationList from "@/components/locations/LocationList.vue";
</script>

<style>
.home-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
}

.list-container {
  flex: 2;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.form-container {
  flex: 1;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
