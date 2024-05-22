<template>
  <UTooltip
    :text="text"
    :popper="{ arrow: arrow, placement: placementTransformer() }"
    :ui="{
      base: 'h-auto',
      width: 'max-w-md',
    }"
  >
    <UIcon
      :name="icon"
      :class="[`text-[${color}]`, `text-${size}`, `opacity-${opacity}`]"
      v-if="(!isButton && !slots._) || (!isButton && slots._ && slots.text)"
    />
    <UButton v-if="isButton && !slots._" :icon="icon" color="gray" />
    <slot></slot>
    <template v-if="slots.text" #text>
      <slot name="text"></slot>
    </template>
  </UTooltip>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: { type: String, required: false },
  color: {
    type: String,
    required: false,
    default: "black",
  },
  opacity: {
    type: String,
    required: false,
    default: "100",
  },
  isButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  arrow: {
    type: Boolean,
    required: false,
    default: false,
  },
  placement: {
    type: String,
    required: false,
    default: "b",
    validator(value: string) {
      return ["t", "b", "l", "r"].includes(value);
    },
  },
  size: {
    type: String,
    required: false,
    default: "base",
    validator(value: string) {
      return ["sm", "base", "lg", "xl", "2xl", "3xl"].includes(value);
    },
  },
  icon: {
    type: String,
    required: false,
    default: "i-heroicons-information-circle-16-solid",
  },
});

const slots = useSlots();

const placementTransformer = () => {
  switch (props.placement) {
    case "t":
      return "top";
    case "b":
      return "bottom";
    case "l":
      return "left";
    case "r":
      return "right";
    default:
      return "bottom";
  }
};
</script>
