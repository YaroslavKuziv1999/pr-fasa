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
  />
</template>

<script setup>
import "v-calendar/style.css";
import { DatePicker as VDatePicker } from "v-calendar";

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

const rules = ref({
  hours: (hour, { weekday }) => {
    if ([7].includes(weekday)) return hour >= 9 && hour <= 16;
    else return hour >= 9 && hour <= 21;
  },
  minutes: { interval: 5 },
});

const disabledDates = ref([
  {
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
