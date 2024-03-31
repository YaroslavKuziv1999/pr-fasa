<template>
  <div>
    <div>
      <a
        href="javascript:void(0)"
        class="w-full block text-base font-semibold text-main bg-main border border-color rounded-md text-center p-4 transition"
      >
        Zamów teraz
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-main {
  color: $green;
}

.bg-main:hover {
  color: white;
  background-color: $green;
}

.bg-main {
  background-color: white;
}

.focus\:border-color:focus,
.border-color {
  border-color: $green;
}
</style>
