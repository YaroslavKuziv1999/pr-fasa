<template>
  <div
    class="text-center text-6xl text-body-color"
    :class="margins && 'mt-5 mb-10'"
  >
    {{ text }}
    <span v-if="counter">[{{ counter.number }}/{{ counter.total }}]</span>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  margins: {
    type: Boolean,
    required: false,
    default: true,
  },
  counter: {
    type: Object,
    required: false,
  },
});
</script>
