<template>
  <Carousel ref="car" :itemsToShow="3" :wrapAround="true" :transition="500">
    <Slide v-for="(slide, i) in tablePrices" :key="slide">
      <div class="carousel__item flex flex-col gap-3 p-24">
        <div class="text-2xl text-[green]">{{ slide.name }}</div>
        <div class="text-5xl font-bold pb-3 w-full">
          {{ slide.price }} zł /
          <span class="text-xl opacity-50 text-body-color"
            >{{ slide.time }} min</span
          >
        </div>
        <OrderButton id="order" class="w-full mt-3" />
        <div>
          <span class="absolute right-0 top-7 z-[-1] dis">
            <svg
              width="77"
              height="172"
              viewBox="0 0 77 172"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="86"
                  y1="0"
                  x2="86"
                  y2="172"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#88ab8e" stop-opacity="0.09" />
                  <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span class="absolute right-4 top-4 z-[-1] dis">
            <svg
              width="41"
              height="89"
              viewBox="0 0 41 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="38.9138"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 38.9138 87.4849)"
                fill="#88ab8e"
              />
              <circle
                cx="38.9138"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 38.9138 74.9871)"
                fill="#88ab8e"
              />
              <circle
                cx="38.9138"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 38.9138 62.4892)"
                fill="#88ab8e"
              />
              <circle
                cx="38.9138"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 38.9138 38.3457)"
                fill="#88ab8e"
              />
              <circle
                cx="38.9138"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 38.9138 13.634)"
                fill="#88ab8e"
              />
              <circle
                cx="38.9138"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 38.9138 50.2754)"
                fill="#88ab8e"
              />
              <circle
                cx="38.9138"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 38.9138 26.1319)"
                fill="#88ab8e"
              />
              <circle
                cx="38.9138"
                cy="1.42021"
                r="1.42021"
                transform="rotate(180 38.9138 1.42021)"
                fill="#88ab8e"
              />
              <circle
                cx="26.4157"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 26.4157 87.4849)"
                fill="#88ab8e"
              />
              <circle
                cx="26.4157"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 26.4157 74.9871)"
                fill="#88ab8e"
              />
              <circle
                cx="26.4157"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 26.4157 62.4892)"
                fill="#88ab8e"
              />
              <circle
                cx="26.4157"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 26.4157 38.3457)"
                fill="#88ab8e"
              />
              <circle
                cx="26.4157"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 26.4157 13.634)"
                fill="#88ab8e"
              />
              <circle
                cx="26.4157"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 26.4157 50.2754)"
                fill="#88ab8e"
              />
              <circle
                cx="26.4157"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 26.4157 26.1319)"
                fill="#88ab8e"
              />
              <circle
                cx="26.4157"
                cy="1.4202"
                r="1.42021"
                transform="rotate(180 26.4157 1.4202)"
                fill="#88ab8e"
              />
              <circle
                cx="13.9177"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 13.9177 87.4849)"
                fill="#88ab8e"
              />
              <circle
                cx="13.9177"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 13.9177 74.9871)"
                fill="#88ab8e"
              />
              <circle
                cx="13.9177"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 13.9177 62.4892)"
                fill="#88ab8e"
              />
              <circle
                cx="13.9177"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 13.9177 38.3457)"
                fill="#88ab8e"
              />
              <circle
                cx="13.9177"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 13.9177 13.634)"
                fill="#88ab8e"
              />
              <circle
                cx="13.9177"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 13.9177 50.2754)"
                fill="#88ab8e"
              />
              <circle
                cx="13.9177"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 13.9177 26.1319)"
                fill="#88ab8e"
              />
              <circle
                cx="13.9177"
                cy="1.42019"
                r="1.42021"
                transform="rotate(180 13.9177 1.42019)"
                fill="#88ab8e"
              />
              <circle
                cx="1.41963"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 1.41963 87.4849)"
                fill="#88ab8e"
              />
              <circle
                cx="1.41963"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 1.41963 74.9871)"
                fill="#88ab8e"
              />
              <circle
                cx="1.41963"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 1.41963 62.4892)"
                fill="#88ab8e"
              />
              <circle
                cx="1.41963"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 1.41963 38.3457)"
                fill="#88ab8e"
              />
              <circle
                cx="1.41963"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 1.41963 13.634)"
                fill="#88ab8e"
              />
              <circle
                cx="1.41963"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 1.41963 50.2754)"
                fill="#88ab8e"
              />
              <circle
                cx="1.41963"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 1.41963 26.1319)"
                fill="#88ab8e"
              />
              <circle
                cx="1.41963"
                cy="1.4202"
                r="1.42021"
                transform="rotate(180 1.41963 1.4202)"
                fill="#88ab8e"
              />
            </svg>
          </span>
        </div>
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
  visibility: hidden;
}

.carousel__item {
  min-height: 400px;
  width: 100%;
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
