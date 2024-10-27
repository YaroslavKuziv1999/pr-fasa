<template>
  <div>
    <div v-if="!loggedIn" @click="openModal">
      <button class="header-buttons py-2 px-4 gap-2">
        <UIcon name="i-lets-icons-sign-in-circle-duotone-line" dynamic />
        <span>Zaloguj się</span>
      </button>
    </div>
    <div v-else @click="handleSignOut">
      <button class="header-buttons py-2 px-4 gap-2">
        <UIcon name="i-heroicons-arrow-left-end-on-rectangle-16-solid" />
        <span>Wyloguj</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import SignInUpModal from "@/components/SignInUp/Modal";

const modal = useModal();
const { status, signOut } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");

const handleSignOut = async () => {
  await signOut();
};

const openModal = () => {
  modal.open(SignInUpModal);
};
</script>
