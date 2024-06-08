<template>
  <div class="flex flex-col gap-4">
    <ServicesCard
      v-for="(service, inx) in services"
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
