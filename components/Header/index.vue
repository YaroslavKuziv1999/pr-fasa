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
          to="/services"
          activeClass="active"
          v-if="loggedIn"
        >
          <UIcon name="i-heroicons-fire-20-solid" />
          Usługi
        </NuxtLink>
        <UIToolTip
          v-if="loggedIn"
          :text="recordsStore.getRecords.length ? '' : 'There are no records'"
          :class="
            !recordsStore.getRecords.length && loggedIn
              ? 'cursor-not-allowed opacity-50'
              : ''
          "
        >
          <NuxtLink
            class="bg-[#eee7da] text-[#afc8ad] py-2 px-4 rounded-full flex justify-center items-center gap-2"
            to="/records"
            activeClass="active"
            :class="{
              disabled: !recordsStore.getRecords.length,
            }"
          >
            <UIcon name="i-heroicons-clipboard-20-solid" />
            Informacje o zapisie
          </NuxtLink>
        </UIToolTip>
        <NuxtLink
          class="bg-[#eee7da] text-[#afc8ad] rounded-full flex justify-center items-center"
          :class="[userStore.getUser?.image.src ? 'p-1' : 'p-3']"
          to="/account"
          activeClass="active"
          v-if="loggedIn"
        >
          <UIcon
            v-if="!userStore.getUser?.image.src"
            name="i-heroicons-user-solid"
            class="w-full h-full"
            dynamic
          />
          <div
            :class="
              userStore.getUser.image.src &&
              'rounded-full overflow-hidden h-9 w-9'
            "
            v-else
          >
            <img
              class="w-full h-full object-cover"
              :src="userStore.getUser.image.src"
              alt="avatar"
            />
          </div>
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

.disabled {
  pointer-events: none;
  color: gray;
}
</style>

<script setup>
const { status } = useAuth();

const loggedIn = computed(() => status.value === "authenticated");

const userStore = useUserStore();
const recordsStore = useRecordsStore();

if (loggedIn.value) {
  await recordsStore.initAllRecords();
  await recordsStore.refreshRecords();
  await userStore.initUser();
}
</script>
