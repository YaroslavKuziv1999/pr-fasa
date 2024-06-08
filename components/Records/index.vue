<template>
  <div v-if="useRecordsStore().getRecords.length" class="flex flex-col gap-3">
    <RecordsCard
      :record="record"
      v-for="record in useRecordsStore().getRecords"
      :key="record['id']"
    />
  </div>
</template>
