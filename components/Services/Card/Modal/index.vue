<template>
  <UModal>
    <UForm
      :state="state"
      @submit="recordId ? editRecord($event) : createVisitRecord($event)"
    >
      <UCard
        :ui="{
          footer: {
            padding: 'pt-0',
          },
        }"
        class="divide-none rounded-lg"
      >
        <template #header>
          <div class="text-3xl text-center">
            {{ service.name }}
          </div>
        </template>

        <div>
          <UIDatePicker v-model="state.date" />
        </div>

        <template #footer>
          <div>
            <div class="flex justify-between items-center mb-5">
              <div
                v-if="!recordId"
                class="flex justify-center items-center gap-1"
              >
                <UCheckbox
                  v-model="state.notifications"
                  name="notifications"
                  label="Notifications"
                />
                <UIToolTip opacity="50" placement="t" arrow>
                  <template #text>{{ toolTip }}</template>
                </UIToolTip>
              </div>
              <div v-if="!recordId" class="flex justify-center items-center">
                <div class="text-3xl font-bold w-full flex justify-center">
                  {{ service.price }} zł /
                  <span
                    class="text-xl opacity-50 text-body-color flex items-center"
                  >
                    {{ service.time }} {{ service.unitsOfTime }}
                  </span>
                </div>
              </div>
            </div>

            <UIButton
              text="Apply"
              rounded="md"
              action="submit"
              type="order"
              w-full
            />
          </div>
        </template>
      </UCard>
    </UForm>
  </UModal>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import addDay from "date-fns/addDays";
import getDay from "date-fns/getDay";

interface Service {
  id: string;
  name: string;
  price: number;
  time: number;
  unitsOfTime: string;
}

interface Record {
  id: string;
  notifications: boolean;
  dateOfVisit: string;
  service: Service;
}

const props = defineProps({
  service: { type: Object as PropType<Service>, required: true },
  recordId: { type: String, required: false },
});

const { id } = useUserStore().getUser as any;
const recordsStore = useRecordsStore() as any;

const modal = useModal();

const getDateState = () =>
  getDay(new Date()) === 0 ? addDay(new Date(), 1) : new Date();

const state = reactive({
  date: !props.recordId
    ? getDateState()
    : new Date(
        recordsStore.getRecords.find(
          (rec: any) => rec.id === props.recordId
        ).dateOfVisit
      ),
  notifications: true,
});

const toolTip =
  "This will turn off/on notifications(sms/email) before the visit";

const createVisitRecord = async (e: any) => {
  await $fetch(`/api/records/create`, {
    method: "POST",
    body: {
      notifications: state.notifications,
      dateOfVisit: new Date(state.date).toISOString(),
      userId: id,
      serviceId: props.service.id,
    },
  });

  modal.close();
  await navigateTo("/records");
};

const editRecord = async (e: any) => {
  let body = {
    id: props.recordId,
    data: {
      dateOfVisit: new Date(state.date).toISOString(),
      userId: id,
      serviceId: props.service.id,
    },
  };

  await recordsStore.updateRecord(body);

  await recordsStore.initRecords();
  await recordsStore.initAllRecords();

  modal.close();
};
</script>
