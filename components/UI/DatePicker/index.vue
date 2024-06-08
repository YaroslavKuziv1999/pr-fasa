<template>
  <VDatePicker
    v-model="date"
    mode="dateTime"
    :color="color"
    :disabled-dates="disabledDates"
    :rules="rules"
    expanded
    borderless
    locale="pl"
    :first-day-of-week="2"
    is24hr
    :min-date="new Date()"
    :is-required="true"
    :attributes="attributes"
  />
</template>

<script setup>
import "v-calendar/style.css";
import { DatePicker as VDatePicker } from "v-calendar";
import { getDate, getHours, getMinutes } from "date-fns";

const props = defineProps({
  modelValue: {
    type: [Date, Object],
    default: null,
  },
  color: {
    type: String,
    default: "green",
  },
});

const emit = defineEmits(["update:model-value", "close"]);

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:model-value", value);
    emit("close");
  },
});

const recordsState = useRecordsStore();

const attributes = computed(() => [
  ...Object.keys(recordsState.getAllRecords).map((rec) => ({
    dates: rec,
    dot: {
      color: "red",
    },
    popover: {
      label: `This day already has ${
        recordsState.getAllRecords[rec].length > 1
          ? `${recordsState.getAllRecords[rec].length} visits`
          : `${recordsState.getAllRecords[rec].length} visit`
      } `,
    },
  })),
]);

const rules = ref({
  hours: (hour, { weekday, day }) => {
    const currentHour = getHours(new Date());
    const currentDay = getDate(new Date());

    if (day === currentDay && [7].includes(weekday))
      return hour >= 9 && hour <= 16 && hour >= currentHour;

    if (day === currentDay)
      return hour >= 9 && hour <= 21 && hour >= currentHour;

    if ([7].includes(weekday)) return hour >= 9 && hour <= 16;
    else return hour >= 9 && hour <= 21;
  },
  minutes: (minutes, { weekday, day }) => {
    const currentMinutes = getMinutes(new Date());
    const currentDay = getDate(new Date());
    const currentHour = getHours(new Date());

    if (day === currentDay && currentHour >= 9 && currentHour <= 21)
      return minutes >= currentMinutes && minutes % 5 === 0;

    if (
      day === currentDay &&
      [7].includes(weekday) &&
      currentHour >= 9 &&
      currentHour <= 16
    )
      return minutes >= currentMinutes && minutes % 5 === 0;

    return minutes % 5 === 0;
  },
});

const disabledDates = ref([
  {
    start: 1,
    repeat: {
      weekdays: [1],
    },
  },
]);
</script>

<style>
.vc-disabled {
  pointer-events: none;
  cursor: not-allowed;
}

.vc-light {
  --vc-focus-ring: none;
}
</style>
