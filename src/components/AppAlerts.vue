<template>
  <div class="alerts" v-if="alerts && alerts.length > 0">
    <div
      class="toast show mb-2"
      :class="{
        'bg-primary': alert.type && alert.type === 'info',
        'bg-danger': alert.type && alert.type === 'error',
        'bg-success': alert.type && alert.type === 'success',
        'bg-warning': alert.type && alert.type === 'warning',
      }"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      v-for="alert in alerts"
      v-bind:alert="alert"
      v-bind:key="alert.id"
    >
      <div class="toast-header" v-if="alert.title && alert.message">
        <strong
          class="me-auto"
          v-if="alert"
          :class="{
            'text-primary': alert.type === 'info',
            'text-danger': alert.type === 'error',
            'text-success': alert.type === 'success',
            'text-warning': alert.type === 'warning',
          }"
          >{{ alert.title }}</strong
        >
      </div>
      <div
        v-if="alert"
        class="toast-body"
        :class="{
          'text-white': alert.type !== 'warning',
          'text-dark': alert.type === 'warning',
        }"
      >
        {{ alert.message ? alert.message : alert.title }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import AlertState from "@/store/alerts/types";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  computed: {
    alerts(): AlertState[] {
      return this.$store.getters['alerts/all'];
    },
  },
});
</script>
<style lang="scss" scoped>
.alerts {
  max-width: 256px;
  position: fixed;
  bottom: 25px;
  right: 25px;

  .toast-body {
    white-space: pre-wrap;
  }
}
</style>
