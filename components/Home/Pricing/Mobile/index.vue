<template>
  <UICarousel :data="data">
    <template #data="{ title, description }">
      <div
        class="carousel__item text-left min-h-72 xl:min-h-[400px] flex flex-col gap-3 p-16 2xl:p-20 xl:p-24 justify-between"
      >
        <div class="text-main font-semibold text-lg block mb-4">
          {{ title }}
        </div>
        <div class="text-base text-body-color pb-8 mb-8 border-b">
          {{ description }}
        </div>
        <UIButton type="order" rounded="md" action="signInUp" w-full />

        <PricesCarouselDecoration />
      </div>
    </template>
  </UICarousel>
</template>

<script setup>
import data from "../Data/index.json";
</script>
