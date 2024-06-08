export const useRecordsStore = defineStore("RecordsStore", {
  state: () => ({
    records: [],
    allRecords: [],
  }),
  getters: {
    getRecords: (state) => state.records,
    getAllRecords: (state) => state.allRecords,
  },
  actions: {
    async initRecords() {
      const { data } = useAuth();

      this.records = await $fetch(`/api/records/${data.value.uid}`, {
        method: "GET",
      });
    },
    async deleteRecord(id) {
      let confirmation = confirm("Are you sure?");

      if (confirmation)
        await $fetch(`/api/records/${id}`, {
          method: "DELETE",
        });
    },
    async deleteAllUserRecords() {
      let confirmation = confirm("Are you sure?");
      const { data } = useAuth();

      if (confirmation)
        await $fetch(`/api/records/all`, {
          method: "DELETE",
          body: {
            userId: data.value.uid
          }
        });
    },
    async initAllRecords() {
      this.allRecords = await $fetch(`/api/records/all`, {
        method: "GET",
      });
    },
    async updateRecord(body){
      await $fetch(`/api/records/update`, {
        method: "POST",
        body
      });
    },
    async refreshRecords() {
      await this.initRecords();
      await this.initAllRecords();
    }
  },
});
