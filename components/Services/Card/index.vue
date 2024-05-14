<template>
  <div
    class="flex bg-gradient-to-r from-[#eee7da] to-[white] hover:bg-none hover:bg-white hover:scale-95 border hover:border-[#88ab8e] gap-3 p-12 rounded-md transition duration-500 cursor-pointer"
  >
    <div class="text-4xl text-[#88ab8e] flex items-center">
      {{ service.name }}
    </div>
    <div class="ml-auto">
      <div class="text-5xl font-bold pb-3 w-full flex justify-center">
        {{ service.price }} zł /
        <span class="text-xl opacity-50 text-body-color flex items-center">
          {{ service.time }} {{ service.unitsOfTime }}
        </span>
      </div>
    </div>
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
  index: { type: Number, required: true },
});
</script>
