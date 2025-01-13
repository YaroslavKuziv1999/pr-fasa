<template>
  <Carousel
    ref="servicesCarousel"
    :autoplay="3000"
    :pauseAutoplayOnHover="true"
    :itemsToShow="1"
    :wrapAround="true"
    :transition="900"
    :breakpoints="{ 1280: { itemsToShow: 3 }, 770: { itemsToShow: 2 } }"
  >
    <Slide v-for="(slide, i) in tablePrices" :key="slide">
      <div
        class="carousel__item min-h-72 xl:min-h-[400px] flex flex-col gap-3 p-16 2xl:p-20 xl:p-24"
      >
        <div class="text-xl xl:text-4xl text-[green]">{{ slide.name }}</div>
        <div
          class="xl:text-5xl font-bold pb-3 w-full flex justify-center items-center"
        >
          {{ slide.price }} zł /
          <span class="xl:text-xl opacity-50 text-body-color"
            >{{ slide.time }} {{ slide.unitsOfTime }}</span
          >
        </div>
        <UIButton
          id="order"
          type="order"
          rounded="md"
          action="signInUp"
          w-full
        />

        <PricesCarouselDecoration />
      </div>
    </Slide>

    <template #addons>
      <div class="lg:hidden block">
        <Navigation>
          <template #prev>
            <UIcon
              name="i-material-symbols-light-keyboard-double-arrow-left"
              class="text-[45px] text-[#88ab8e] cursor-pointer opacity-50"
              dynamic
            />
          </template>
          <template #next>
            <UIcon
              name="i-material-symbols-light-keyboard-double-arrow-right"
              class="text-[45px] text-[#88ab8e] cursor-pointer opacity-50"
              dynamic
            />
          </template>
        </Navigation>
      </div>
    </template>
  </Carousel>
</template>

<script>
const services = await $fetch(`/api/services/all`, { method: "GET" });

export default defineComponent({
  name: "Autoplay",
  data: () => ({
    tablePrices: services,
  }),
});
</script>

<script setup>
import { onKeyStroke } from "@vueuse/core";
import { ref } from "vue";

const servicesCarousel = ref(null);

onKeyStroke(["a", "A", "ArrowLeft"], (e) => {
  e.preventDefault();
  servicesCarousel.value.prev();
});

onKeyStroke(["d", "D", "ArrowRight"], (e) => {
  e.preventDefault();
  servicesCarousel.value.next();
});
</script>

<style>
.carousel__prev {
  width: 50px;
  height: 100%;
  left: -55px;
}

.carousel__next {
  width: 50px;
  height: 100%;
  right: -55px;
}
</style>

<style scoped>
#order {
  visibility: hidden;
}

.carousel__item {
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide--active ~ .carousel__slide {
  transform: scale(0.85);
}

.carousel__slide--active #order {
  visibility: visible;
}

.carousel__slide--prev {
  opacity: 0.5;
  transform: scale(0.85);
}

.carousel__slide--prev .dis {
  display: none;
}

.carousel__slide--next {
  opacity: 0.5;
  transform: scale(0.85);
}

.carousel__slide--next .dis {
  display: none;
}

.carousel__slide--active {
  border: 1px solid green;
  background-color: white;
  border-radius: 10px;
  opacity: 1;
}
</style>
