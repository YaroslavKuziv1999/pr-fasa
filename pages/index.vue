<template>
  <div>
    <Home />
  </div>
</template>

<script scoped>
const services = await $fetch(`/api/services/all`, { method: "GET" });
</script>
