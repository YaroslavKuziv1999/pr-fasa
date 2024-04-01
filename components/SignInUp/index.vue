<script setup lang="ts">
const isOpen = ref(false);
</script>

<template>
  <div>
    <div @click="isOpen = true">
      <button class="bg-[#eee7da] text-[#afc8ad] py-2 px-4 rounded-full">
        Zalogować się
      </button>
    </div>

    <UModal v-model="isOpen" :transition="false">
      <div class="p-4">Hey!</div>
    </UModal>
  </div>
</template>
