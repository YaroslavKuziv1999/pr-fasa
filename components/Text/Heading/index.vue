<template>
  <div class="text-center text-6xl mt-5 mb-10">{{ text }}</div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
