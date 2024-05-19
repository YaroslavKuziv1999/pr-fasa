import { defineStore } from "pinia";

export const usePageStore = defineStore("PageStore", {
  state: () => ({
    page: 1,
  }),

  getters: {
    getPages: (state) => state.page,
  },

  actions: {
    addPage(total, count) {
      this.page === total / count ? this.page : ++this.page;
    },
    subtractPage() {
      this.page === 1 ? this.page : --this.page;
    },
  },
});
