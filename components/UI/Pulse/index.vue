<template>
  <div class="relative">
    <div class="z-[999]">
      <slot></slot>
    </div>

    <div
      class="absolute left-0 top-0 bottom-0 right-0 flex z-[-1]"
      :class="{ 'justify-center items-center': centered }"
    >
      <div class="pulse">
        <span
          v-for="value in count"
          :style="'--i: ' + value * timeMultiply"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  count: {
    type: Number,
    required: false,
    default: 3,
  },
  scale: {
    type: Number,
    required: false,
    default: 5,
  },
  delay: {
    type: Number,
    required: false,
    default: 0,
  },
  timeMultiply: {
    type: Number,
    required: false,
    default: -1,
  },
  background: {
    type: String,
    required: false,
    default: "#88ab8e",
  },
  width: {
    type: String,
    required: false,
    default: "50px",
  },
  height: {
    type: String,
    required: false,
    default: "50px",
  },
  rounded: {
    type: String,
    required: false,
    default: "50%",
  },
  centered: {
    type: Boolean,
    required: false,
    default: true,
  },
  opacity: {
    type: Number,
    required: false,
    default: 0.4,
  },
  duration: {
    type: Number,
    required: false,
    default: 3,
  },
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const animationTime = props.count + "s";
const animationDuration = props.duration + "s";
const animationDelay = props.delay + "s";
</script>

<style scoped>
.pulse {
  position: relative;
  width: v-bind(width);
  height: v-bind(height);
}

.pulse span {
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  background: v-bind(background);
  opacity: v-bind(opacity);
  border-radius: v-bind(rounded);
  animation: pulseAnimate v-bind(animationTime) ease-out infinite;
  animation-delay: calc(v-bind(animationDelay) * var(--i));
  animation-duration: v-bind(animationDuration);
}

@keyframes pulseAnimate {
  100% {
    opacity: 0;
    transform: scale(v-bind(scale));
  }
}
</style>
