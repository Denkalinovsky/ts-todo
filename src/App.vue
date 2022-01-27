<template>
  <div id="app">
    <nav>
      <router-link class="router-link" to="/" exact>List Of Notes</router-link>
      <router-link class="router-link" to="/note" exact
        >Create Note
      </router-link>
    </nav>
    <hr />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
