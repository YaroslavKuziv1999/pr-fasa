<template>
  <div>
    <UITextHeading text="Uslugi" />
    <Services :services="services" />
  </div>
</template>

<script setup>
definePageMeta({ middleware: "auth" });

const services = await $fetch(`/api/services/all`, { method: "GET" });
</script>
