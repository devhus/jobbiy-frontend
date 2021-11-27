<template>
  <h5 class="mb-3">Account Settings</h5>
  <account-settings-form></account-settings-form>
</template>

<script>
import AccountSettingsForm from "@/components/Account/AccountSettingsForm.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: { AccountSettingsForm },});
</script>

<style>
</style>