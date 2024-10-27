<template>
  <div>
    <section>
      <div class="custom-shape-divider-top-1711316342 hidden 2xl:block z-[-1]">
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

        <div class="lg:flex hidden">
          <HeaderSocials
            name="ion:social-facebook"
            href="https://m.facebook.com/groups/520791202989492/?ref=share"
          />
          <HeaderSocials
            name="mdi:instagram"
            href="https://www.instagram.com/poznan_masaz?igsh=MWc0cWpwazQ2NTN6NA=="
          />
        </div>
      </div>

      <HeaderMobile>
        <SignInUp />
        <template v-slot:activator="{ onClick }">
          <NuxtLink
            @click="onClick"
            class="py-2 px-4 gap-2 header-buttons"
            to="/services"
            activeClass="active-header-link"
            v-if="loggedIn"
          >
            <UIcon name="i-heroicons-fire-20-solid" />
            <span>Usługi</span>
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
              @click="onClick"
              class="py-2 px-4 gap-2 header-buttons"
              to="/records"
              activeClass="active-header-link"
              :class="{
                ['disabled-header-link']: !recordsStore.getRecords.length,
              }"
            >
              <UIcon name="i-heroicons-clipboard-20-solid" />
              <span>Informacje o zapisie</span>
            </NuxtLink>
          </UIToolTip>
          <NuxtLink
            @click="onClick"
            class="header-buttons header-buttons-ava"
            :class="[userStore.getUser?.image.src ? 'p-1' : 'p-3']"
            to="/account"
            activeClass="active-header-link"
            v-if="loggedIn"
          >
            <div>
              <UIcon
                v-if="!userStore.getUser?.image.src"
                name="i-heroicons-user-solid"
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
            </div>
            <span class="inline-block lg:hidden">Account</span>
          </NuxtLink>
        </template>
      </HeaderMobile>
    </header>
  </div>
</template>

<style lang="scss" scoped>
@media (max-width: 1536px) {
  .active-header-link {
    background-color: $sage;
    color: $belge;
  }

  .disabled-header-link {
    border-color: gray;
  }
}

.disabled-header-link {
  pointer-events: none;
  color: gray;
}

@media (min-width: 1536px) {
  .active-header-link {
    color: $belge;
    background-color: $sage;
  }

  .header-buttons-ava {
    width: 48px;
    height: 48px;
  }
}
</style>

<script setup>
const { status } = useAuth();

const loggedIn = computed(() => status.value === "authenticated");

const userStore = useUserStore();
const recordsStore = useRecordsStore();

watch(status, async () => {
  if (status.value === "authenticated") {
    await recordsStore.initAllRecords();
    await recordsStore.refreshRecords();
    await userStore.initUser();
  }
});
</script>
