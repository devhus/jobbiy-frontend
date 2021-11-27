<template>
  <Header></Header>
  <router-view />

  <AppAlerts></AppAlerts>
</template>
<script lang="ts">
import Header from "@/components/Header.vue";
import AppAlerts from "@/components/AppAlerts.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: {
    Header,
    AppAlerts,
  },
});
</script>
<style lang="scss">
@import url("./assets/scss/style.scss");

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
