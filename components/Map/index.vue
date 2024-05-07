<template>
  <div>
    <UITextHeading text="Poznań i okolice" />
    <div class="circle-shape">
      <img
        class="rounded-full w-[28rem] h-[28rem] object-cover"
        src="@/assets/img/map.png"
        alt="map"
      />

      <p class="text-body-color" v-for="region in regions">{{ region }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const regions = ref([
  "Grunwald",
  "Łazarz, Jeżyce",
  "Nowe Miasto Południe, Rataje, Starołęka, Krzesiny, Głuszyna",
  "Nowe Miasto Północ, Naramowice, Umultowo, Morasko, Radojewo",
  "Piątkowo, Podolany, Strzeszyn",
  "Wilda, Stare Miasto",
  "Winogrady, Sołacz, Winiary",
  "gmina Czerwonak",
  "gmina Dopiewo",
  "gmina Komorniki",
  "gmina Kórnik",
  "gmina Luboń",
  "gmina Mosina",
  "gmina Puszczykowo",
  "gmina Rokietnica",
  "gmina Suchy Las",
  "gmina Swarzędz",
  "gmina Tarnowo Podgórne",
]);
</script>

<style scoped>
.circle-shape img {
  float: left;
  margin-right: 2rem;
  -webkit-shape-outside: circle();
  shape-outside: circle();
}
</style>
