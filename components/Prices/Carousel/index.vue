<template>
  <Carousel ref="car" :itemsToShow="3" :wrapAround="true" :transition="500">
    <Slide v-for="(slide, i) in tablePrices" :key="slide">
      <div class="carousel__item flex flex-col gap-3 p-24">
        <div class="text-2xl">{{ slide.name }}</div>
        <div class="text-5xl font-bold">
          {{ slide.price }} zł /
          <span class="text-xl opacity-50">{{ slide.time }} min</span>
        </div>
        <OrderButton id="order" class="w-full mt-3" />
      </div>
    </Slide>
  </Carousel>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "Autoplay",
  components: {
    Carousel,
    Slide,
    Pagination,
  },

  data: () => ({
    tablePrices: [
      { name: "Masaż karku i ramion, rąk", price: 40, time: 30 },
      { name: "Masaż pleców, rąk", price: 50, time: 40 },
      { name: "Masaż klatki piersiowej, limfatyczny", price: 60, time: 40 },
      { name: "Klasyczny masaż leczniczy", price: 80, time: 50 },
      { name: "Masaż próżniowy / drenaż limfatyczny", price: 80, time: 50 },
      { name: "Bańką Chińską", price: 60, time: 40 },
      { name: "Masaż nóg", price: 40, time: 30 },
      { name: "Masaż calego ciała", price: 100, time: 60 },
      { name: "Sportowy masaż", price: 100, time: 60 },
      { name: "Masaż Kobido", price: 100, time: 60 },
      { name: "Masaż twarzy Limfatyczny", price: 80, time: 40 },
      { name: "Masaż logopedyczny", price: 50, time: 30 },
    ],
  }),
});
</script>

<style scoped>
#order {
  display: none;
}

.carousel__item {
  min-height: 400px;
  width: 100%;
  color: green;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .carousel__slide {
  padding: 5px;
} */

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
  display: block;
}

.carousel__slide--prev {
  opacity: 0.5;
  transform: scale(0.85);
}

.carousel__slide--next {
  opacity: 0.5;
  transform: scale(0.85);
}

.carousel__slide--active {
  border: 1px solid green;
  background-color: white;
  border-radius: 10px;
  opacity: 1;
}
</style>
