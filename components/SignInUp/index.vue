<template>
  <div>
    <div v-if="!loggedIn" @click="openModal">
      <UIPulse :scale="10" :opacity="0.1" rounded="100px">
        <button
          class="bg-[#eee7da] text-[#afc8ad] py-2 px-4 rounded-full flex justify-center items-center gap-2"
        >
          <UIcon name="i-heroicons-user-solid" />
          Zaloguj się
        </button>
      </UIPulse>
    </div>
    <div v-else @click="handleSignOut">
      <button
        class="bg-[#eee7da] text-[#afc8ad] py-2 px-4 rounded-full flex justify-center items-center gap-2"
      >
        <UIcon name="i-heroicons-arrow-left-end-on-rectangle-16-solid" />
        Wyloguj
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
