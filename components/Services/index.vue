<template>
  <div class="grid grid-cols-4 gap-4">
    <ServicesCard
      v-for="service in services"
      :service="service"
      :key="service.id"
    />
  </div>
</template>

<script setup lang="ts">
interface Service {
  id: string;
  name: string;
  price: number;
  time: number;
  unitsOfTime: string;
}

defineProps({
  services: Array<Service>,
});
</script>
