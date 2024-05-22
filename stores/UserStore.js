import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    user: {},
    images: [],
  }),

  getters: {
    getUser: (state) => ({
      ...state.user,
      image: {
        src: state.user.image,
        size: state.images.length ? state.images.map((e) => e.bytes) : [],
        id: state.images.length ? state.images.map((e) => e.id) : [],
      },
    }),
  },

  actions: {
    async initUserId() {
      const { data } = useAuth();
      this.user.id = data.value.uid;
    },
    async initUser() {
      const { data } = useAuth();

      this.user = await $fetch(`/api/users/${data.value.uid}`);
      this.images = await $fetch(`/api/media/${this.user.id}`, {
        method: "GET",
      });
    },
    async updateUser(data) {
      await $fetch(`/api/users/update`, {
        method: "POST",
        body: { id: this.user.id, ...data },
      });
    },
    async deleteUser() {
      await $fetch(`/api/users/${this.user.id}`, {
        method: "DELETE",
      });
    },
    async passwordChange() {
      await this.initUser();

      let response = await $fetch("/api/password/reset", {
        method: "POST",
        body: {
          to: this.user.email,
          subject: "Password Reset",
        },
      });

      sessionStorage.setItem("code", response);
    },
  },
});
