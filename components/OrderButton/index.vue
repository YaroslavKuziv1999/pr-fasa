<template>
  <div>
    <div>
      <a
        href="javascript:void(0)"
        class="w-full block text-xl text-main font-semibold bg-main border border-color rounded-md text-center p-4 transition"
      >
        Zamów teraz
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-main {
  color: $gray;
}

.bg-main:hover {
  color: white;
  background-color: $gray;
}

.bg-main {
  background-color: white;
}

.focus\:border-color:focus,
.border-color {
  border-color: $gray;
}
</style>
