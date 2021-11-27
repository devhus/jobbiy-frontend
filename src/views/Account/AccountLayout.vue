<template>
  <div class="container mt-4">
    <account-navbar></account-navbar>
    <div class="card mt-4">
      <div class="card-body">
        <div class="mx-2">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountNavbar from "@/components/Account/AccountNavbar.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: { AccountNavbar },
});
</script>

<style>
</style>