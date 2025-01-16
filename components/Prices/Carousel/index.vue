<template>
  <div>
    <UICarousel :data="tablePrices">
      <template #data="{ name, price, time, unitsOfTime }">
        <div
          class="carousel__item min-h-72 xl:min-h-[400px] flex flex-col gap-3 p-16 2xl:p-20 xl:p-24"
        >
          <div class="text-xl xl:text-4xl text-[green]">
            {{ name }}
          </div>
          <div
            class="xl:text-5xl font-bold pb-3 w-full flex justify-center items-center"
          >
            {{ price }} zł /
            <span class="xl:text-xl opacity-50 text-body-color"
              >{{ time }} {{ unitsOfTime }}</span
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
      </template>
    </UICarousel>
  </div>
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
