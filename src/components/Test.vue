<template>
  <div>{{ dataSet }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Test",
  props: ["dataSet"],
});
</script>

<style scoped></style>
