<template>
  <div>
    <section>
      <div class="custom-shape-divider-top-1711316342 z-[-1]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
    <header class="flex justify-between items-center py-5 mb-5">
      <div class="flex justify-center items-center gap-3">
        <NuxtLink to="/" class="w-[100px]">
          <img src="@/assets/img/logo.png" alt="logo" />
        </NuxtLink>

        <HeaderSocials
          name="ion:social-facebook"
          href="https://m.facebook.com/groups/520791202989492/?ref=share"
        />
        <HeaderSocials
          name="mdi:instagram"
          href="https://www.instagram.com/poznan_masaz?igsh=MWc0cWpwazQ2NTN6NA=="
        />
      </div>
      <div class="flex justify-center items-center gap-3">
        <SignInUp />
        <NuxtLink
          class="bg-[#eee7da] text-[#afc8ad] py-2 px-4 rounded-full flex justify-center items-center gap-2"
          :class="{ active: active.services }"
          to="/services"
          v-if="loggedIn"
        >
          <UIcon name="i-heroicons-fire-20-solid" />
          Usługi
        </NuxtLink>
        <NuxtLink
          class="bg-[#eee7da] text-[#afc8ad] py-2 px-4 rounded-full flex justify-center items-center gap-2"
          to="/records"
          :class="{ active: active.records }"
          v-if="loggedIn"
        >
          <UIcon name="i-heroicons-clipboard-20-solid" />
          Informacje o zapisie
        </NuxtLink>
        <NuxtLink
          class="bg-[#eee7da] text-[#afc8ad] p-3 rounded-full flex justify-center items-center"
          :class="{ active: active.account }"
          to="/account"
          v-if="loggedIn"
        >
          <UIcon name="i-heroicons-user-solid" />
        </NuxtLink>
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.active {
  color: $belge;
  background-color: $sage;
}
</style>

<script setup>
const PAGES = {
  account: "account",
  services: "services",
  records: "records",
  index: "index",
};

const { status } = useAuth();
const route = useRoute();

const active = ref({
  account: true,
  services: false,
  records: false,
});

const loggedIn = computed(() => status.value === "authenticated");

watch(
  () => route.name,
  (routeName) => {
    if (loggedIn.value) {
      switch (routeName) {
        case PAGES.account:
          active.value = { account: true, services: false, records: false };
          break;
        case PAGES.services:
          active.value = { account: false, services: true, records: false };
          break;
        case PAGES.records:
          active.value = { account: false, services: false, records: true };
          break;
        case PAGES.index:
          active.value = { account: false, services: false, records: false };
          break;
        default:
          active.value = { account: true, services: false, records: false };
          break;
      }
    }
  },
  { deep: true, immediate: true }
);
</script>
