<template>
  <div
    :class="[{ 'cursor-not-allowed': disabled }, { 'w-full': $props['wFull'] }]"
  >
    <button
      :type="action.type"
      class="flex justify-center items-center gap-2"
      :class="[
        getTypeStyle() + 'rounded-' + rounded,
        { 'w-full': $props['wFull'] },
        { 'h-full': $props['hFull'] },
        { 'w-full': block },
        { 'h-full': block },
        { disabled: disabled },
        { 'flex-row-reverse': reverse },
      ]"
    >
      <UIcon v-if="icon && !loading" :name="icon" />
      <UIcon v-if="loading" name="line-md:loading-loop" dynamic />
      {{ getText() }}
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
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  "w-full": {
    type: Boolean,
    required: false,
    default: false,
  },
  "h-full": {
    type: Boolean,
    required: false,
    default: false,
  },
  block: {
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
  const base = function (bg, color, border) {
    return `bg-[${bg}] text-[${color}] ${
      props.rounded && "rounded-" + props.rounded
    } ${border && "border-2 border-[#eee7da]"} ${
      [...arguments].splice(3).length > 0 && [...arguments].splice(3).join(" ")
    }`;
  };
  switch (props.type) {
    case "danger":
      return base("white", "red", true, "p-2 px-3");
    case "solid-sh":
      return base("white", "#afc8ad", true);
    case "solid":
      return base("white", "#afc8ad", true, "p-2 px-3");
    case "order":
      return base(
        "white",
        "#637381",
        true,
        "p-4 hover:bg-[#637381] hover:text-[white] "
      );
    default:
      return base("#eee7da", "#afc8ad", false, "p-3");
  }
};

const getText = () => {
  if (props.type === "order") {
    return "Zamów teraz";
  }
  return props.text;
};
</script>
