<template>
  <div class="text-center text-6xl my-5">{{ text }}</div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
