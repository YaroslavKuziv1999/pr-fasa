<template>
  <Carousel ref="car" :itemsToShow="3" :wrapAround="true" :transition="500">
    <Slide v-for="(slide, i) in tablePrices" :key="slide">
      <div class="carousel__item flex flex-col gap-3 p-24">
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
