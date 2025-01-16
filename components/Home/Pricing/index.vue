<template>
  <div>
    <section class="pt-10 lg:pt-[120px] relative overflow-hidden">
      <div class="xl:block hidden container">
        <div class="flex flex-wrap justify-center items-stretch -mx-4">
          <div v-for="item in data" class="w-full md:w-1/2 lg:w-1/3 pr-4">
            <div
              class="flex flex-col justify-between bg-white h-full rounded-xl relative z-10 overflow-hidden border border-color border-opacity-20 shadow-pricing py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12 mb-10"
            >
              <span class="text-main font-semibold text-lg block mb-4">
                {{ item.title }}
              </span>
              <p class="text-base text-body-color pb-8 mb-8 border-b">
                {{ item.description }}
              </p>
              <UIButton type="order" rounded="md" action="signInUp" w-full />

              <PricesCarouselDecoration />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="block xl:hidden">
      <HomePricingMobile />
    </section>
  </div>
</template>

<script setup>
import data from "./Data/index.json";
</script>

<style lang="scss" scoped>
.text-main {
  color: $green;
}

.bg-main:hover {
  color: white;
  background-color: $green;
}

.bg-main {
  background-color: white;
}

.focus\:border-color:focus,
.border-color {
  border-color: $green;
}
</style>
