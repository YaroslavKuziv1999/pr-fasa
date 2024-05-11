<template>
  <Account
    :user="{
      id: user.id,
      name: user.name || 'No name',
      password: user.hashedPassword,
      phone: user.phone,
      email: user.email,
      image: {
        src: user.image,
        size: images.length ? images.map((e) => e.bytes) : [],
        id: images.length ? images.map((e) => e.id) : [],
      },
    }"
  />
</template>

<script setup>
definePageMeta({ middleware: "auth" });
const { data } = useAuth();

const user = await $fetch(`/api/users/${data.value.uid}`);
const images = await $fetch(`/api/media/${user.id}`, { method: "GET" });
</script>
