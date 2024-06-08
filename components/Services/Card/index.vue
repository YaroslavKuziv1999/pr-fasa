<template>
  <div
    @click="openModal"
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

<script setup>
import ServicesCardModal from "@/components/Services/Card/Modal";

const props = defineProps({
  service: { type: Object, required: true },
});

const modal = useModal();

const openModal = () => {
  modal.open(ServicesCardModal, {
    service: props.service,
  });
};
</script>
