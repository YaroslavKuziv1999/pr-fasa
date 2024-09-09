<template>
  <div
    class="text-6xl text-body-color"
    :class="[
      margins && 'mt-5 mb-10',
      centered ? 'text-center' : 'flex justify-between',
    ]"
  >
    {{ text }}
    <span v-if="counter" class="relative flex items-center justify-center ml-3">
      <UIcon name="i-heroicons-book-open" />
      <div class="absolute top-[25%] left-[27%] text-lg flex gap-3">
        <span>{{ counter.number }}</span>
        <span>{{ counter.total }}</span>
      </div>
    </span>
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
  centered: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>
