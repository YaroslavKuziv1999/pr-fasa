<template>
  <div>
    <UITextHeading
      text="Uslugi"
      :counter="{
        number: pageStore.getPages,
        total: allServices.length / count,
      }"
    />
    <div class="flex justify-center items-center">
      <UIPulse :centered="false" class="mx-5">
        <UIcon
          @click="pageStore.subtractPage()"
          name="i-heroicons-arrow-left-circle-16-solid"
          class="text-[50px] text-[white]"
          :class="
            pageStore.getPages === 1
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer '
          "
        />
      </UIPulse>

      <Services class="flex-1 w-full" :services="services" />

      <UIPulse :centered="false" class="mx-5">
        <UIcon
          @click="pageStore.addPage(allServices.length, count)"
          name="i-heroicons-arrow-right-circle-16-solid"
          class="text-[50px] text-[white]"
          :class="
            pageStore.getPages === allServices.length / count
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer'
          "
        />
      </UIPulse>
    </div>
  </div>
</template>

<script setup>
import { onKeyStroke } from "@vueuse/core";
import { usePageStore } from "@/stores/PageStore";

definePageMeta({ middleware: "auth" });

await useRecordsStore().initAllRecords();

const pageStore = usePageStore();
const { page } = storeToRefs(usePageStore());
const count = 4;

onKeyStroke(["a", "A", "ArrowLeft"], (e) => {
  e.preventDefault();
  pageStore.subtractPage();
});

onKeyStroke(["d", "D", "ArrowRight"], (e) => {
  e.preventDefault();
  pageStore.addPage(allServices.length, count);
});

const allServices = await $fetch(`/api/services/all`, {
  method: "GET",
});

const services = ref([]);

const getServicesPagination = async () => {
  return await $fetch(`/api/services/all`, {
    method: "GET",
    query: { page: pageStore.getPages, count },
  });
};

services.value = await getServicesPagination();
watch(page, async () => {
  services.value = await getServicesPagination();
});
</script>
