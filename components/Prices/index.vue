<template>
  <div>
    <div class="flex gap-2 flex-row justify-center items-center">
      <UITextHeading text="Usługi atrakcyjny ceny" fullCenter />
      <UIToolTip
        class="hidden xl:block"
        text="You can use 'a, d, arrow left, arrow right' (don't work on phones)"
        size="2xl"
        placement="t"
        color="gray"
        opacity="50"
        arrow
      />
    </div>
    <PricesCarousel />
  </div>
</template>
