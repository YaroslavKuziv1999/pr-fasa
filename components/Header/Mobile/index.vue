<template>
  <div>
    <UModal
      class="block lg:hidden"
      v-if="loggedIn"
      v-model="menu.isOpen"
      fullscreen
      prevent-close
    >
      <UCard class="bg-none divide-none shadow-none border-none ring-0">
        <template #header>
          <UIcon
            name="i-heroicons-x-mark-20-solid"
            class="w-[35px] h-[35px] cursor-pointer text-gray-400"
            @click="menu.isOpen = false"
          />
        </template>

        <div
          class="flex justify-center flex-col-reverse items-center gap-3 w-full links"
        >
          <slot />

          <div class="flex my-3 justify-center items-center">
            <UIDots arrows>
              <HeaderSocials
                mobile
                name="ion:social-facebook"
                href="https://m.facebook.com/groups/520791202989492/?ref=share"
                class="text-xl"
              />
              <HeaderSocials
                mobile
                name="mdi:instagram"
                href="https://www.instagram.com/poznan_masaz?igsh=MWc0cWpwazQ2NTN6NA=="
                class="text-xl"
              />
            </UIDots>
          </div>

          <slot :onClick="() => (menu.isOpen = false)" name="activator" />
        </div>
      </UCard>
    </UModal>

    <div
      v-if="loggedIn"
      class="block lg:hidden"
      @click="() => (menu.isOpen = true)"
    >
      <UIcon
        name="i-heroicons-bars-4"
        class="w-[35px] h-[35px] cursor-pointer"
      />
    </div>

    <div
      class="justify-center items-center gap-3 lg:flex"
      :class="loggedIn && 'hidden'"
    >
      <slot />
      <slot name="activator" />
    </div>
  </div>
</template>

<style>
.links div {
  width: 100%;
}
</style>

<script setup>
const menu = reactive({ isOpen: false });

const route = useRoute();
const { status } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");

watch(
  () => route.fullPath,
  () => {
    menu.isOpen = false;
  }
);
</script>
