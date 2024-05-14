<template>
  <div>
    <UITextHeading text="Uslugi" />
    <div class="flex justify-center items-center">
      <UIcon
        @click="pageLeft"
        name="i-heroicons-arrow-left-circle-16-solid"
        class="text-[50px] mx-5"
        :class="page === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
      />
      <Services class="flex-1 w-full" :services="services" />
      <UIcon
        @click="pageRight"
        name="i-heroicons-arrow-right-circle-16-solid"
        class="text-[50px] mx-5"
        :class="
          page === allServices.length / count
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer'
        "
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: "auth" });
import { onKeyStroke } from "@vueuse/core";

onKeyStroke(["a", "A", "ArrowLeft"], (e) => {
  e.preventDefault();
  pageLeft();
});

onKeyStroke(["d", "D", "ArrowRight"], (e) => {
  e.preventDefault();
  pageRight();
});

const page = ref(1);
const count = 4;

const allServices = await $fetch(`/api/services/all`, {
  method: "GET",
});

const services = ref([]);

const pageLeft = () => {
  page.value === 1 ? page.value : --page.value;
};

const pageRight = () => {
  page.value === allServices.length / count ? page.value : ++page.value;
};

const getServicesPagination = async () => {
  return await $fetch(`/api/services/all`, {
    method: "GET",
    query: { page: page.value, count },
  });
};

services.value = await getServicesPagination();
watch(page, async () => {
  services.value = await getServicesPagination();
});
</script>
