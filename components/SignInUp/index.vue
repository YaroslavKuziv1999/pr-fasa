<template>
  <div>
    <div @click="isOpen = true">
      <button class="bg-[#eee7da] text-[#afc8ad] py-2 px-4 rounded-full">
        Zalogować się
      </button>
    </div>

    <UModal v-model="isOpen" :transition="false">
      <UTabs
        :items="items"
        class="w-full"
        :ui="{
          strategy: 'override',
          list: {
            rounded: 'rounded-t-lg',
          },
        }"
      >
        <template #item="{ item }">
          <UForm
            :state="item.key === 'login' ? login : register"
            :validate="validate"
            @submit="onSubmit"
          >
            <UCard
              class="divide-none rounded-lg text-[black]"
              :ui="{
                strategy: 'override',
                rounded: '',
                ring: '',
                header: {
                  base: '',
                  background: '',
                  padding: 'px-4 pt-3 sm:px-6',
                },
              }"
            >
              <template #header>
                <div class="flex justify-center items-center">
                  {{ item.label }}
                </div>
              </template>

              <div v-if="item.key === 'login'" class="space-y-3">
                <UFormGroup label="Email" name="email">
                  <UInput
                    v-model="login.email"
                    placeholder="you@example.com"
                    icon="i-heroicons-envelope"
                  />
                </UFormGroup>
                <UFormGroup label="Hasło" name="password">
                  <UButtonGroup
                    :ui="{
                      wrapper: {
                        horizontal: 'flex -space-x-px',
                      },
                    }"
                    orientation="horizontal"
                  >
                    <UInput
                      placeholder="abc123.."
                      class="w-full"
                      :type="show.login ? 'text' : 'password'"
                      v-model="login.password"
                      icon="i-heroicons-lock-closed"
                    >
                    </UInput>
                    <UButton
                      @mousedown="() => (show.login = true)"
                      @mouseup="() => (show.login = false)"
                      icon="i-heroicons-eye-16-solid"
                      color="gray"
                    />
                  </UButtonGroup>
                </UFormGroup>
              </div>
              <div v-else-if="item.key === 'register'" class="space-y-3">
                <UFormGroup label="Email" name="email">
                  <UInput
                    v-model="register.email"
                    placeholder="you@example.com"
                    icon="i-heroicons-envelope"
                  />
                </UFormGroup>
                <UFormGroup label="Numer telefonu" name="phone">
                  <UInput
                    v-model="register.phone"
                    icon="i-heroicons-phone"
                    placeholder="+48 111 222 333"
                  />
                </UFormGroup>
                <UFormGroup label="Hasło" name="password">
                  <UButtonGroup
                    :ui="{
                      wrapper: {
                        horizontal: 'flex -space-x-px',
                      },
                    }"
                    orientation="horizontal"
                  >
                    <UInput
                      class="w-full"
                      placeholder="abc123.."
                      :type="show.register ? 'text' : 'password'"
                      v-model="register.password"
                      type="password"
                      icon="i-heroicons-lock-closed"
                    />
                    <UButton
                      @mousedown="() => (show.register = true)"
                      @mouseup="() => (show.register = false)"
                      icon="i-heroicons-eye-16-solid"
                      color="gray"
                    />
                  </UButtonGroup>
                </UFormGroup>
              </div>

              <template #footer>
                <UButton
                  type="submit"
                  block
                  class="p-3 text-main bg-main border border-color rounded-md text-center transition"
                  :label="item.label"
                />
              </template>
            </UCard>
          </UForm>
        </template>
      </UTabs>
    </UModal>
  </div>
</template>

<script setup>
const isOpen = ref(false);
const show = ref({ login: false, register: false });

const login = reactive({ email: "", password: "" });
const register = reactive({ email: "", password: "", phone: "" });

const items = [
  {
    key: "login",
    label: "Zaloguj się",
  },
  {
    key: "register",
    label: "Zarejestruj się",
  },
];

const validate = (state) => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Email jest wymagany!" });
  if (
    !state.email.match(/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/gm)
  )
    errors.push({
      path: "email",
      message: "Musisz podać prawidłowy adres email",
    });
  if (!state.phone)
    errors.push({ path: "phone", message: "Wymagany jest telefon!" });
  if (!state.password) {
    errors.push({ path: "password", message: "Wymagane jest hasło!" });
  }
  return errors;
};

async function onSubmit(form) {
  console.log("Submitted form:", form);
}
</script>

<style lang="scss" scoped>
.text-main {
  color: $gray;
}

.bg-main:hover {
  color: white;
  background-color: $gray;
}

.bg-main {
  background-color: white;
}

.focus\:border-color:focus,
.border-color {
  border-color: $gray;
}
</style>
