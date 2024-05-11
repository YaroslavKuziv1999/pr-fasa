<template>
  <div
    class="flex flex-col gap-3 p-12 rounded-md bg-white border border-[green] min-h-[400px]"
  >
    <div class="text-4xl text-[green]">
      {{ service.name }}
    </div>
    <div class="mt-auto">
      <div class="text-5xl font-bold pb-3 w-full flex justify-center">
        {{ service.price }} zł /
        <span class="text-xl opacity-50 text-body-color flex items-center">
          {{ service.time }} {{ service.unitsOfTime }}
        </span>
      </div>
      <UIButton rounded="md" text="Zamów teraz" wfull />
    </div>
    <!-- <OrderButton id="order" class="w-full mt-auto" /> -->
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface Service {
  id: string;
  name: string;
  price: number;
  time: number;
  unitsOfTime: string;
}

defineProps({
  service: { type: Object as PropType<Service>, required: true },
});
</script>
