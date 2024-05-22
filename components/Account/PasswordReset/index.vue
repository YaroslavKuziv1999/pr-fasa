<template>
  <div>
    <!-- Code Checker -->
    <div v-if="!edit" class="flex justify-center items-center gap-10 mt-10">
      <div class="flex justify-end items-end gap-3">
        <UFormGroup
          required
          label="Enter the code"
          description="Check you email. (Look at the picture)"
        >
          <UInput
            name="Code"
            v-model="code"
            class="w-full"
            placeholder="XXXX"
            icon="i-heroicons-key-20-solid"
          />
        </UFormGroup>
        <UIButton
          @click="async () => await navigateTo('/account')"
          rounded="md"
          type="danger"
          text="Cancel"
          icon="i-heroicons-x-circle-16-solid"
        />
        <UIButton
          @click="() => checkCode()"
          rounded="md"
          type="solid"
          text="Continue"
          icon="i-heroicons-arrow-right-circle-solid"
          :loading="loading"
          reverse
        />
      </div>
      <div>
        <img
          src="../../../assets/img/example.jpg"
          alt="Example"
          class="rounded-2xl w-[400px]"
        />
      </div>
    </div>

    <!-- New Password -->
    <div class="flex flex-col gap-3" v-else>
      <UITextHeading text="Reset Password" />
      <UForm
        ref="form"
        :schema="ResetPasswordSchema"
        :state="state"
        @submit="savePassword"
        class="flex flex-col gap-3"
      >
        <UFormGroup class="flex-1" name="password" label="New password">
          <UButtonGroup
            :ui="{
              wrapper: {
                horizontal: 'flex -space-x-px',
              },
            }"
            orientation="horizontal"
          >
            <UInput
              v-model="state.password"
              name="Password"
              :type="show.password ? 'text' : 'password'"
              type="password"
              class="w-full"
            />
            <UButton
              @mousedown="() => (show.password = true)"
              @mouseup="() => (show.password = false)"
              icon="i-heroicons-eye-16-solid"
              color="gray"
            />
          </UButtonGroup>
        </UFormGroup>
        <UFormGroup
          class="flex-1"
          name="confirmPassword"
          label="Confirm new password"
        >
          <UButtonGroup
            :ui="{
              wrapper: {
                horizontal: 'flex -space-x-px',
              },
            }"
            orientation="horizontal"
          >
            <UInput
              v-model="state.confirmPassword"
              name="Repeat password"
              :type="show.confirmPassword ? 'text' : 'password'"
              type="password"
              class="w-full"
            />
            <UButton
              @mousedown="() => (show.confirmPassword = true)"
              @mouseup="() => (show.confirmPassword = false)"
              icon="i-heroicons-eye-16-solid"
              color="gray"
            />
          </UButtonGroup>
        </UFormGroup>
        <div class="flex flex-row w-full gap-3 mt-5">
          <UIButton
            class="flex-1"
            @click="async () => await handleCancel()"
            rounded="md"
            type="danger"
            text="Cancel"
            icon="i-heroicons-x-circle-16-solid"
            w-full
          />
          <UIButton
            class="flex-1"
            rounded="md"
            text="Save"
            type="solid"
            icon="i-heroicons-arrow-down-on-square-16-solid"
            :loading="loading"
            action="submit"
            :disabled="handleDisableStyle()"
            w-full
          />
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import { ResetPasswordSchema } from "../../../schemas/resetPasswordSchema";
const props = defineProps({
  userId: { type: String, required: true },
});
const { userId } = props;

const toast = useToast();

const form = ref();
const code = ref(null);
const edit = ref(false);
const loading = ref(false);
const show = ref({ password: false, confirmPassword: false });

const state = reactive({
  password: "",
  confirmPassword: "",
});

const handleDisableStyle = () => {
  return !state.password && !state.confirmPassword ? true : false;
};

const handleCancel = async () => {
  form.value.clear();
  await navigateTo("/account");
  state.password = "";
  state.confirmPassword = "";
};

const checkCode = async () => {
  if (!code.value) {
    toast.add({
      title: "Enter the code",
      description: "Try again",
      icon: "i-heroicons-exclamation-circle-16-solid",
      color: "red",
    });
    return;
  }

  loading.value = true;

  try {
    let isCodeValid = await $fetch("/api/password/check", {
      method: "POST",
      body: {
        code: code.value,
        storageCode: sessionStorage.getItem("code"),
      },
    });

    if (isCodeValid) {
      edit.value = true;
    } else {
      toast.add({
        title: "Your code is wrong",
        description: "Try again",
        icon: "i-heroicons-exclamation-circle-16-solid",
        color: "red",
      });
      return;
    }
  } catch (error) {
    toast.add({
      title: "Something went wrong with the code checking",
      description: "Try again",
      icon: "i-heroicons-exclamation-circle-16-solid",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
};

const savePassword = async (e) => {
  loading.value = true;
  try {
    if (state.password === state.confirmPassword) {
      await $fetch(`/api/password/update`, {
        method: "POST",
        body: { id: userId, password: state.password },
      });
      await navigateTo("/account");
    } else {
      toast.add({
        title: "Password do not match",
        description: "Try again",
        icon: "i-heroicons-exclamation-circle-16-solid",
        color: "red",
      });
      return;
    }
  } catch (error) {
    toast.add({
      title: "Something went wrong with Password Reset",
      description: "Try again",
      icon: "i-heroicons-exclamation-circle-16-solid",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
};
</script>
