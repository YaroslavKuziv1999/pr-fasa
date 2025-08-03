<template>
  <div class="flex items-center">
    <UIcon
      v-if="arrows"
      :name="reversedArrows ? 'i-ion-arrow-right-b' : 'i-ion-arrow-left-b'"
      class="text-3xl w-7 basis-4/12 lg:basis-1/12"
      dynamic
    />

    <hr class="dots my-auto" :class="arrows && 'mx-3'" />
    <slot></slot>
    <hr v-if="slots._" class="dots my-auto" :class="arrows && 'mx-3'" />

    <UIcon
      v-if="arrows"
      :name="reversedArrows ? 'i-ion-arrow-left-b' : 'i-ion-arrow-right-b'"
      class="text-3xl w-7 basis-4/12 lg:basis-1/12"
      dynamic
    />
  </div>
</template>

<script setup>
const props = defineProps({
  arrows: {
    type: Boolean,
    required: false,
    default: false,
  },
  reversedArrows: {
    type: Boolean,
    required: false,
    default: false,
  },
  color: {
    type: String,
    required: false,
    default: "#88ab8e",
  },
});

const slots = useSlots();
</script>

<style scoped>
.dots {
  border: none;
  border-top: 5px dotted v-bind(color);
  color: #fff;
  background-color: transparent;
  height: 1px;
  width: 100%;
}
</style>
