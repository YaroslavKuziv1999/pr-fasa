<template>
  <div class="flex flex-col gap-8">
    <HomeIntro />
    <Prices class="scrollAnim" />
    <div>
      <Business class="scrollAnim" />
      <HomePricing class="scrollAnim" />
    </div>
    <Map class="scrollAnim" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const scrollAnim = ref(null);

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
