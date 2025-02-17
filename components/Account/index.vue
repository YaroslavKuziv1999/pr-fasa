<template>
  <div>
    <UITextHeading
      :margins="edit ? 'mt-5 mb-10' : '0px'"
      :text="edit ? 'Update Account' : 'Account'"
    />
    <div class="flex gap-5">
      <!-- Avatar -->
      <div v-if="!edit" class="relative">
        <div class="rounded-full overflow-hidden h-72 w-72">
          <img
            v-if="userStore.getUser.image.src"
            :src="userStore.getUser.image.src"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
          <UIcon
            v-else
            class="w-full h-full bg-[white] p-10"
            name="i-heroicons-user-solid"
            dynamic
          />
        </div>
        <label for="upload">
          <div
            class="flex justify-center items-center p-2 bg-[white] rounded-full absolute bottom-0 right-3 border-[5px] border-[#f2f1eb] cursor-pointer"
          >
            <input
              v-if="!loadingImage"
              type="file"
              id="upload"
              hidden
              @change="onFileChange"
              accept="image/png, image/jpeg"
            />
            <UIcon
              class="w-[2vw] h-[2vw]"
              :name="
                loadingImage ? 'line-md:loading-loop' : 'ic:twotone-camera'
              "
              dynamic
            />
          </div>
        </label>
        <div
          v-if="userStore.getUser.image.src && !loadingImage"
          @click="() => deleteAvatar()"
          class="flex justify-center items-center p-1 bg-[white] rounded-full absolute bottom-3 right-14 border-[1px] border-[#f2f1eb] cursor-pointer"
        >
          <UIcon
            class="w-[1vw] h-[1vw] text-[red]"
            name="i-heroicons-x-mark-16-solid"
            dynamic
          />
        </div>
      </div>
      <div class="flex flex-col w-full gap-5 px-10 items-center justify-center">
        <!-- Inputs -->
        <UForm
          ref="form"
          class="w-full"
          :schema="UpdateUserSchema"
          :state="state"
        >
          <div
            class="flex gap-16 w-full justify-center items-center"
            :class="{ 'flex-col': edit, 'gap-5': edit }"
          >
            <div class="flex flex-col w-full gap-5">
              <UFormGroup description="Name" name="name">
                <UInput
                  name="Name"
                  :disabled="!edit"
                  class="w-full"
                  v-model="state.name"
                  :placeholder="edit ? user.name : ''"
                />
              </UFormGroup>
              <UFormGroup description="Phone" name="phone">
                <UInput
                  name="Phone"
                  :disabled="!edit"
                  class="w-full"
                  v-model="state.phone"
                  :placeholder="edit ? user.phone : ''"
                />
              </UFormGroup>
            </div>
            <div class="flex flex-col w-full gap-5">
              <div v-if="!edit" class="flex gap-3">
                <UFormGroup description="Password" class="w-full flex-1">
                  <UButtonGroup orientation="horizontal" class="w-full">
                    <UInput
                      class="w-full"
                      name="Password"
                      type="password"
                      disabled
                      v-model="user.hashedPassword"
                    />
                    <UIToolTip
                      text="It is just a placeholder (not the actual password)"
                      isButton
                    />
                  </UButtonGroup>
                </UFormGroup>
                <UIButton
                  @click="() => handlePasswordChange()"
                  text="Change Password"
                  class="text-sm basis-1/3"
                  rounded="md"
                  type="solid-sh"
                  icon="i-heroicons-key-20-solid"
                  :loading="loading"
                  block
                />
              </div>
              <UFormGroup description="Email" name="email">
                <UInput
                  name="Email"
                  :disabled="!edit"
                  class="w-full"
                  v-model="state.email"
                  :placeholder="edit ? user.email : ''"
                />
              </UFormGroup>
            </div>
          </div>
        </UForm>

        <!-- Buttons -->
        <div class="flex gap-5 w-full items-center">
          <UIButton
            v-if="!edit"
            @click="() => handleEdit()"
            text="Update account"
            type="solid"
            icon="i-heroicons-pencil-square-solid"
            rounded="md"
          />
          <UIButton
            v-if="!edit"
            @click="() => deleteUser()"
            text="Delete account"
            type="danger"
            icon="i-heroicons-trash-solid"
            rounded="md"
          />
          <div class="flex gap-3" v-else>
            <UIButton
              @click="() => updateUser()"
              :disabled="handleDisableStyle()"
              text="Save"
              type="solid"
              rounded="md"
              icon="i-heroicons-arrow-down-on-square-16-solid"
              :loading="loading"
            />
            <UIButton
              @click="() => handleCancel()"
              text="Cancel"
              type="danger"
              rounded="md"
              icon="i-heroicons-x-circle-16-solid"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UpdateUserSchema } from "../../schemas/updateSchema";

const userStore = useUserStore();

await userStore.initUser();

const user = userStore.getUser;

const state = reactive({
  email: user.email,
  name: user.name,
  phone: user.phone,
  image: user.image,
});

const edit = ref(false);
const form = ref();
const loading = ref(false);
const loadingImage = ref(false);

const toast = useToast();

const handlePasswordChange = async () => {
  loading.value = true;

  try {
    await userStore.passwordChange();

    await navigateTo({ path: "/password" });
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

const onFileChange = async (e) => {
  let files = e.target.files || e.dataTransfer.files;

  if (!files.length) return;

  if (files[0].type !== "image/png" && files[0].type !== "image/jpeg") {
    return toast.add({
      title: "Not the right type of image (only png or jpeg)",
      description: "Try again",
      icon: "i-heroicons-exclamation-circle-16-solid",
      color: "red",
    });
  }

  if (state.image.size.includes(files[0].size)) {
    return toast.add({
      title: "You are trying to upload the same image",
      description: "Try again",
      icon: "i-heroicons-exclamation-circle-16-solid",
      color: "red",
    });
  }

  loadingImage.value = true;

  const form = new FormData();

  form.append("media_file", files[0]);
  form.append("userId", user.id);

  try {
    if (state.image.id.length) {
      await $fetch(`/api/media/${state.image.id.pop()}`, {
        method: "DELETE",
      });
    }

    let image = await $fetch(`/api/media/upload`, {
      method: "POST",
      body: form,
    });

    state.image.src = image.url;
    state.image.id = [image.id];
    state.image.size = [image.size];

    await $fetch(`/api/users/update`, {
      method: "POST",
      body: { id: user.id, image: image.url },
    });
  } catch (error) {
    toast.add({
      title: "Something went wrong with Uploading Image",
      description: "Try again",
      icon: "i-heroicons-exclamation-circle-16-solid",
      color: "red",
    });
  } finally {
    await userStore.initUser();
    loadingImage.value = false;
  }
};

const deleteAvatar = async () => {
  try {
    loadingImage.value = true;

    if (state.image.id.length) {
      await $fetch(`/api/media/${state.image.id.pop()}`, {
        method: "DELETE",
      });

      state.image.size = "";

      await userStore.updateUser({ image: "" });
    }
  } catch (error) {
    toast.add({
      title: "Something went wrong with Deleting Image",
      description: "Try again",
      icon: "i-heroicons-exclamation-circle-16-solid",
      color: "red",
    });
  } finally {
    await userStore.initUser();
    loadingImage.value = false;
  }
};

const handleEdit = () => {
  state.email = "";
  state.name = "";
  state.phone = "";
  edit.value = true;
};

const handleCancel = () => {
  state.email = user.email;
  state.name = user.name;
  state.phone = user.phone;
  edit.value = false;
  form.value.clear();
};

const handleDisableStyle = () => {
  return !state.email && !state.name && !state.phone ? true : false;
};

const updateUser = async () => {
  if (handleDisableStyle()) return;

  loading.value = true;

  if (!state.email) {
    state.email = user.email;
  }

  if (!state.name) {
    state.name = user.name;
  }

  if (!state.phone) {
    state.phone = user.phone;
  }

  try {
    await userStore.updateUser({
      email: state.email,
      name: state.name,
      phone: state.phone,
    });
  } catch (error) {
    toast.add({
      title: "Something went wrong with Update User",
      description: "Try again",
      icon: "i-heroicons-exclamation-circle-16-solid",
      color: "red",
    });
  } finally {
    loading.value = false;
    edit.value = false;
    form.value.clear();
  }
};

const deleteUser = async () => {
  let answer = confirm("Are you sure?");

  try {
    if (answer) {
      await userStore.deleteUser();
      const { signOut } = useAuth();
      signOut();
    } else {
      return;
    }
  } catch (error) {
    toast.add({
      title: "Something went wrong with Deleting User",
      description: "Try again",
      icon: "i-heroicons-exclamation-circle-16-solid",
      color: "red",
    });
  }
};
</script>
