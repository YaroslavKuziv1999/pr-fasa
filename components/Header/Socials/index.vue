<template>
  <div class="hover:scale-125 transform transition duration-200 scale-100">
    <a :href="href" target="_blank"
      ><Icon :name="name" color="#88ab8e" size="1.7em"
    /></a>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
});
</script>
