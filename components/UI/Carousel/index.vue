<template>
  <Carousel
    ref="carouselRef"
    :autoplay="5000"
    :pauseAutoplayOnHover="true"
    :itemsToShow="1"
    :wrapAround="true"
    :transition="1100"
    :breakpoints="{ 1280: { itemsToShow: 3 }, 770: { itemsToShow: 2 } }"
  >
    <Slide v-for="slide in data" :key="slide">
      <slot name="data" v-bind="slide"></slot>
    </Slide>

    <template #addons>
      <div class="block lg:hidden">
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

<script setup>
import { onKeyStroke } from "@vueuse/core";
import { ref } from "vue";

const carouselRef = ref(null);

onKeyStroke(["a", "A", "ArrowLeft"], (e) => {
  e.preventDefault();
  carouselRef.value.prev();
});

onKeyStroke(["d", "D", "ArrowRight"], (e) => {
  e.preventDefault();
  carouselRef.value.next();
});

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: [],
  },
  styling: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>

<style>
.carousel__prev {
  z-index: 100;
  width: 50px;
  height: 100%;
  left: -55px;
}

.carousel__next {
  z-index: 100;
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

.carousel__slide--active #order {
  visibility: visible;
}

.carousel__slide--prev {
  opacity: 0.5;
  transform: scale(0.85) translate(0, 10%);
  pointer-events: none;
}

.carousel__slide--prev .dis {
  display: none;
}

.carousel__slide--next {
  opacity: 0.5;
  transform: scale(0.85) translate(0, 10%);
  pointer-events: none;
}

.carousel__slide--next .dis {
  display: none;
}

.carousel__slide--active {
  transform: scale(1);
  border: 1px solid green;
  background-color: white;
  border-radius: 10px;
  opacity: 1;
}
</style>
