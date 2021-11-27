<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <router-link
          class="btn btn-outline-primary flex-grow-1 mx-1"
          exact-active-class="btn-primary text-white"
          :to="{ name: 'Account' }"
        >
          Account
        </router-link>
        <template v-if="user && user.is_employer === true">
          <router-link
            class="btn btn-outline-primary flex-grow-1 mx-1"
            exact-active-class="btn-primary text-white"
            :to="{ name: 'Account.Company' }"
          >
            Company Details
          </router-link>
          <router-link
            class="btn btn-outline-primary flex-grow-1 mx-1"
            exact-active-class="btn-primary text-white"
            :to="{ name: 'Account.Jobs' }"
          >
            Jobs
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import UserState from "@/store/user/types";

export default defineComponent({
  computed: {
    user(): UserState {
      return this.$store.getters["user/user"];
    },
  },
});
</script>

<style>
</style>