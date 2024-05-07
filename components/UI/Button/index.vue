<template>
  <div :class="{ 'cursor-not-allowed': disabled }">
    <button
      :type="action.type"
      class="flex justify-center items-center gap-2"
      :class="[
        getTypeStyle(),
        { 'w-full': wfull },
        { 'h-full': hfull },
        { disabled: disabled },
        { 'flex-row-reverse': reverse },
      ]"
    >
      <UIcon v-if="icon && !loading" :name="icon" />
      <UIcon v-if="loading" name="line-md:loading-loop" dynamic />
      {{ text }}
    </button>
  </div>
</template>

<style scoped>
.disabled {
  pointer-events: none;
  opacity: 0.4;
}
</style>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  wfull: {
    type: Boolean,
    required: false,
    default: false,
  },
  hfull: {
    type: Boolean,
    required: false,
    default: false,
  },
  reverse: {
    type: Boolean,
    required: false,
    default: false,
  },
  rounded: {
    type: String,
    required: false,
    default: "full",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  action: {
    type: String,
    required: false,
    default() {
      return "button";
    },
    validator(value) {
      return ["button", "submit", "reset"].includes(value);
    },
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const getTypeStyle = () => {
  switch (props.type) {
    case "danger":
      return `bg-[white] text-[red] p-2 px-3 rounded-${props.rounded} border-2 border-[#eee7da]`;
    case "solid-sh":
      return `bg-[white] text-[#afc8ad] rounded-${props.rounded} border-2 border-[#eee7da]`;
    case "solid":
      return `bg-[white] text-[#afc8ad] p-2 px-3 rounded-${props.rounded} border-2 border-[#eee7da]`;
    default:
      return `bg-[#eee7da] text-[#afc8ad] p-3 rounded-${props.rounded}`;
  }
};
</script>
