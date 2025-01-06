<template>
  <div>
    <div
      class="flex items-center mb-10 justify-between"
      :class="!recordsStore.getRecords.length && 'justify-center'"
    >
      <!-- <UFormGroup
        class="flex gap-3 justify-center items-center"
        label="All Notifications"
        v-if="recordsStore.getRecords.length"
      >
        <UToggle
          @change="handleAllNotifications"
          v-model="notifications"
          size="2xl"
        />
      </UFormGroup> -->
      <UITextHeading
        :text="
          recordsStore.getRecords.length
            ? 'Informacje o zapisie'
            : 'You have no records'
        "
        :centered="false"
        margins="0px"
      />

      <UIDots class="px-10 basis-1/2" arrows />

      <UIButton
        v-if="recordsStore.getRecords.length"
        @click="() => deleteAll()"
        text="Delete Records"
        type="danger"
        rounded="md"
        icon="i-heroicons-trash-solid"
      />
    </div>
    <Records />
  </div>
</template>

<script setup>
definePageMeta({ middleware: "auth" });
const recordsStore = useRecordsStore();

await recordsStore.refreshRecords();

// const notifications = ref(
//   Object.values(toRaw(recordsStore.getRecords)).every(
//     (rec) => rec.notifications
//   )
// );

const deleteAll = async () => {
  await recordsStore.deleteAllUserRecords();
  await recordsStore.initRecords();
  if (!recordsStore.getRecords.length) navigateTo("/account");
};

// const handleAllNotifications = async (e) => {
//   let body = {
//     id: Object.values(toRaw(recordsStore.getRecords)).map((rec) => rec.id),
//     data: {
//       notifications: notifications.value,
//     },
//     many: true,
//   };

//   await recordsStore.updateRecord(body);
//   await recordsStore.initRecords();
// };
</script>
