<template>
  <vue-recaptcha
    theme="light"
    size="normal"
    :tabindex="0"
    @widgetId="recaptchaWidget = $event"
    @verify="callbackVerify($event)"
    @expired="callbackExpired()"
    @fail="callbackFail()"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { VueRecaptcha, useRecaptcha } from "vue3-recaptcha-v2";

export default defineComponent({
  components: { VueRecaptcha },
  data() {
    return {
      recaptchaResponse: "",
    };
  },
  // emits: {
  //   verified(payload: { response: string }) {
  //     return payload.response.length > 0;
  //   },
  // },
  methods: {
    callbackVerify(response: string) {
      this.$emit("verified", response);
    },
    reset() {
      this.actionReset();
    },
  },
  setup: () => {
    // Reset Recaptcha
    const { resetRecaptcha } = useRecaptcha();
    const recaptchaWidget = ref<number | undefined>(undefined);

    const callbackExpired = () => {
      if (!recaptchaWidget.value) return;
      resetRecaptcha(recaptchaWidget.value);
    };
    const callbackFail = () => {
      //console.log("fail");
    };
    // Reset Recaptcha action
    const actionReset = () => {
      if (!recaptchaWidget.value) return;
      resetRecaptcha(recaptchaWidget.value);
    };

    return {
      recaptchaWidget,
      callbackExpired,
      callbackFail,
      actionReset,
    };
  },
});
</script>
