<template>
  <h5 class="mb-3">Company Info</h5>
  <company-details-form></company-details-form>
</template>

<script>
import CompanyDetailsForm from "@/components/Company/CompanyDetailsForm.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: { CompanyDetailsForm },
});
</script>

<style>
</style>