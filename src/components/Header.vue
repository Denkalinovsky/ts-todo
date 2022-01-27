<template>
  <el-header>
    <nav>
      <router-link class="router-link" to="/" exact>List Of Notes</router-link>
    </nav>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>

<style scoped></style>
