<template>
  <div
    class="flex bg-gradient-to-r from-[#eee7da] to-[white] gap-5 p-12 rounded-md"
  >
    <div class="flex items-center justify-center w-[50px]">
      <UIToolTip
        v-if="!notificationLoading"
        :text="'Notifications are ' + (record.notifications ? 'on' : 'off')"
      >
        <UToggle v-model="notifications" size="lg" />
      </UIToolTip>
      <UIcon v-else class="w-full" name="line-md:loading-loop" dynamic />
    </div>

    <div class="text-4xl text-[#88ab8e] flex flex-col">
      <div>{{ record.service.name }}</div>
      <div class="text-2xl opacity-50 text-body-color flex flex-col gap-1">
        <div class="flex gap-1 items-center">
          <UIcon name="i-heroicons-clock" />
          {{ record.service.time }}{{ record.service.unitsOfTime }}
        </div>
        <div class="flex gap-1 items-center">
          <UIcon name="i-heroicons-calendar-16-solid" />
          {{ getDateTime().date }} &#183
          {{ getDateTime().time }}
        </div>
      </div>
    </div>

    <div class="ml-auto flex gap-3 items-center justify-center">
      <UIButton
        @click="() => editRecord()"
        type="solid"
        icon="i-heroicons-pencil-square-solid"
      />
      <UIButton
        @click="() => deleteRecord()"
        type="danger"
        icon="i-heroicons-trash-solid"
      />
    </div>
  </div>
</template>

<script setup>
import { format } from "date-fns";
import ServicesCardModal from "@/components/Services/Card/Modal";

const props = defineProps({
  record: { type: Object, required: true },
});

const recordsStore = useRecordsStore();
const modal = useModal();
const notificationLoading = ref(false);
const notifications = computed({
  get() {
    return props.record.notifications;
  },
  async set(value) {
    let body = {
      id: props.record.id,
      data: {
        notifications: value,
      },
    };
    notificationLoading.value=true;
    
    await recordsStore.updateRecord(body);
    await recordsStore.initRecords();
    
    notificationLoading.value=false;
  },
});

const getDateTime = () => ({
  date: format(new Date(props.record.dateOfVisit), "yyyy-MM-dd"),
  time: format(new Date(props.record.dateOfVisit), "hh:mm a"),
});

const editRecord = async () => {
  modal.open(ServicesCardModal, {
    service: props.record.service,
    recordId: props.record.id,
  });
};

const deleteRecord = async () => {
  await recordsStore.deleteRecord(props.record.id);
  await recordsStore.initRecords();
  if(!recordsStore.getRecords.length) navigateTo('/account');
};
</script>
