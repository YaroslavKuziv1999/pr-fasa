<template>
  <div class="flex justify-center items-center flex-col">
    <div class="flex w-full justify-center items-center mb-10">
      <UITextHeading
        text="Uslugi"
        :counter="{
          number: pageStore.getPages,
          total: allServices.length / count,
        }"
        :centered="false"
        margins="0px"
      />

      <UIDots class="w-full pl-5 pr-10" />

      <UIPulse
        :count="1"
        :scale="2"
        :duration="3"
        :centered="false"
        :opacity="pageStore.getPages === 1 ? 0 : 0.4"
        class="mr-3"
      >
        <UIcon
          @click="pageStore.subtractPage()"
          name="i-heroicons-arrow-left-circle-16-solid"
          class="text-[50px] text-[#88ab8e]"
          :class="
            pageStore.getPages === 1
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer '
          "
        />
      </UIPulse>
      <UIPulse
        :count="1"
        :scale="2"
        :duration="3"
        :centered="false"
        :opacity="pageStore.getPages === allServices.length / count ? 0 : 0.4"
        class="ml-3"
      >
        <UIcon
          @click="pageStore.addPage(allServices.length, count)"
          name="i-heroicons-arrow-right-circle-16-solid"
          class="text-[50px] text-[#88ab8e]"
          :class="
            pageStore.getPages === allServices.length / count
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer'
          "
        />
      </UIPulse>
    </div>
    <Services class="flex-1 w-full" :services="services" />
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
