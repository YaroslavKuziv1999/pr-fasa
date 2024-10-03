<template>
  <UModal :transition="false">
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
          :schema="item.key === 'login' ? LoginSchema : RegisterSchema"
        >
          <UCard
            class="divide-none rounded-lg text-[black]"
            @submit.prevent="
              () => onSubmit(item.key === 'login' ? login : register, item.key)
            "
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
                :loading="loading"
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
</template>

<script setup>
import {
  LoginSchema,
  RegisterSchema,
} from "../../../schemas/registerLoginSchema";

const props = defineProps({
  navigateToServices: { type: Boolean, required: false, default: false },
});

const modal = useModal();
const loading = ref(false);
const show = ref({ login: false, register: false });

const { signIn } = useAuth();
const toast = useToast();

const login = reactive({ email: "", password: "" });
const register = reactive({ email: "", password: "", phone: "" });

const items = [
  {
    key: "login",
    label: "Zaloguj się",
  },
  {
    key: "register",
    label: "Załóż konto",
  },
];

const onSubmit = async (form, type) => {
  const result = {
    login: LoginSchema.safeParse(form),
    register: RegisterSchema.safeParse(form),
  };

  if (type === "register" && result.register.success) {
    try {
      loading.value = true;

      const { data, error } = await useFetch("/api/auth/register", {
        method: "POST",
        body: {
          email: form.email,
          password: form.password,
          phone: form.phone,
        },
      });

      if (error.value) {
        toast.add({
          id: 1,
          title: `Something went wrong! \n Maybe you are already registered`,
          description: "Try again",
          icon: "i-heroicons-exclamation-circle-16-solid",
          color: "red",
        });
      }

      if (data.value) {
        const { ok, error } = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        });
        if (ok && !error) {
          modal.close();
          toast.remove(1);

          if (props.navigateToServices) await navigateTo("/services");
          else await navigateTo("/account");
        } else {
          await navigateTo("/");
        }
      }
    } catch (error) {
      console.log("Registretion Error", error);
    } finally {
      loading.value = false;
    }
  }

  if (type === "login" && result.login.success) {
    try {
      loading.value = true;

      const { ok, error } = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (ok && !error) {
        modal.close();
        toast.remove(0);

        if (props.navigateToServices) await navigateTo("/services");
        else await navigateTo("/account");
      } else {
        toast.add({
          id: 0,
          title: "Your email or password are wrong!",
          description: "Try again",
          icon: "i-heroicons-exclamation-circle-16-solid",
          color: "red",
        });
      }
    } catch (error) {
      console.log("Login Error", error);
    } finally {
      loading.value = false;
    }
  }
};
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
