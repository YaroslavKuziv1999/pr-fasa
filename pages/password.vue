<template>
  <AccountPasswordReset :userId="user.id" />
</template>

<script setup>
definePageMeta({ middleware: "auth" });
const { data } = useAuth();

const user = await $fetch(`/api/users/${data.value.uid}`);
</script>
