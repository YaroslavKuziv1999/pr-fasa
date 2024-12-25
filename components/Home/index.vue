<template>
  <div class="flex flex-col gap-8">
    <Transition>
      <button
        v-if="y <= 350"
        class="absolute right-10 bottom-10 animate-bounce hidden xl:block"
        @click="scrollToIntro()"
      >
        <UIcon class="text-5xl" name="i-heroicons-arrow-down-circle-16-solid" />
      </button>
    </Transition>
    <HomeIntro />
    <Prices class="scrollAnim" ref="prices" />
    <div>
      <Business class="scrollAnim" />
      <HomePricing class="scrollAnim" />
    </div>
    <Map class="scrollAnim" />
  </div>
</template>

<script setup>
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll({ behavior: "smooth" });

const prices = ref();

const scrollToIntro = () => {
  prices.value.$el.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => {
  let delay = 0.2;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${delay}s`;
          entry.target.classList.add("animate-delay");
          delay += 0.1; // increment the delay for each element
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  document.querySelectorAll(".scrollAnim").forEach((item) => {
    observer.observe(item);
  });
});
</script>

<style scoped>
.scrollAnim {
  opacity: 0;
  transform: translateY(10px);
  -webkit-transform: translateY(20px);
  -moz-transform: translateY(20px);
  -ms-transform: translateY(20px);
  -o-transform: translateY(20px);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.animate-delay {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: animate-delay;
}

@keyframes animate-delay {
  0% {
    opacity: 0;
    transform: translateY(10px);
    -webkit-transform: translateY(20px);
    -moz-transform: translateY(20px);
    -ms-transform: translateY(20px);
    -o-transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
  }
}
</style>
