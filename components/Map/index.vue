<template>
  <div>
    <UITextHeading text="Poznań i okolice" fullCenter />
    <div>
      <div>
        <div
          class="flex text-center flex-wrap items-center justify-center h-full"
        >
          <div v-for="(region, i) in data.cloudinary.resources">
            <div
              class="basis-full"
              v-if="i < (showedAll ? data.cloudinary.total_count : showedMax)"
            >
              <img
                @click="() => search(region.filename)"
                class="rounded-3xl sm:w-[14rem] sm:h-[14rem] md:w-[12rem] md:h-[12rem] w-[8rem] h-[8rem] object-cover mx-3 lg:hover:scale-105 lg:transform transition duration-500 scale-100 cursor-pointer"
                :src="region.secure_url"
                :alt="region.filename"
              />
              <div
                class="md:text-2xl text-[1rem] text-center h-[4rem] flex justify-center items-center text-body-color"
              >
                {{ region.filename.split("_").slice(0, -1)[0] }}<br />
                {{ region.filename.split("_").slice(0, -1)[1] }}
              </div>
            </div>
          </div>

          <button
            class="flex gap-3 justify-center text-body-color animate-pulse w-full items-center z-50 cursor-pointer mt-5"
            @click="show()"
          >
            <UIDots
              ref="dots"
              class="w-full"
              color="#637381"
              arrows
              :reversedArrows="showedAll"
            >
              <div class="md:text-3xl text-[1rem] w-full">
                {{ showedAll ? "Collapse all" : "Show all" }}
              </div>
            </UIDots>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const dots = ref();

const showedAll = ref(false);
const showedMax = ref(0);

function updateShowedMax() {
  const width = window.innerWidth;

  if (width >= 1280) {
    showedMax.value = 6;
  } else if (width >= 1024) {
    showedMax.value = 3;
  } else if (width >= 768) {
    showedMax.value = 5;
  } else {
    showedMax.value = 2;
  }
}

onMounted(() => {
  updateShowedMax();
  window.addEventListener("resize", updateShowedMax);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateShowedMax);
});

const data = await $fetch(`/api/mapLocations/all`, {
  method: "GET",
});

function search(name) {
  window.open(
    "https://www.google.com/search?q=" + name.split("_").slice(0, -1).join(" "),
    "_blank"
  );
}

function show() {
  showedAll.value = !showedAll.value;
  setTimeout(() => dots.value.$el.scrollIntoView({ behavior: "smooth" }), 100);
}
</script>
