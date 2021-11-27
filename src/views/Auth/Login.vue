<template>
  <div class="text-center mb-2">
    <h4 class="fw-bold">Sign In</h4>
    <h6>Login to your account</h6>
  </div>
  <Form @submit="formSubmit">
    <div class="mb-3">
      <label class="form-label" for="registerEmail">Email Address</label>
      <Field
        type="email"
        name="registerEmail"
        label="Email"
        class="form-control"
        v-model="form.email"
        id="registerEmail"
        rules="required|email"
      />
      <ErrorMessage name="registerEmail" class="text-danger" />
    </div>
    <div class="mb-3">
      <label class="form-label" for="registerPassword">Password</label>
      <Field
        type="password"
        name="registerPassword"
        label="Password"
        class="form-control"
        id="registerPassword"
        rules="required|min:3|max:56"
        autocomplete="password"
        v-model="form.password"
      />
      <ErrorMessage name="registerPassword" class="text-danger" />
    </div>

    <div class="mb-3">
      <form-recaptcha
        @verified="setRecaptcha"
        ref="formRecaptcha"
      ></form-recaptcha>
    </div>

    <button class="btn btn-primary d-block w-100" :disabled="loading">
      Sign in
    </button>
  </Form>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import FormRecaptcha from "@/components/Forms/FormRecaptcha.vue";
import { Field, Form, ErrorMessage } from "vee-validate";

export default defineComponent({
  components: {
    FormRecaptcha,
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      loading: false,
      recaptcha: "",
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    setRecaptcha(response: string) {
      this.recaptcha = response;
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    formSubmit() {
      //e.preventDefault();
      if (this.loading) return;
      this.setLoading(true);
      this.$store
        .dispatch("user/login", { ...this.form, recaptcha: this.recaptcha })
        .then(() => {
          this.$store.commit("alerts/add", {
            type: "success",
            title: "You have logged in.",
          });
          this.$router.push({ name: "Home" });
        })
        .finally(() => {
          (this.$refs.formRecaptcha as any).reset();
          this.setLoading(false);
        });
    },
  },
});
</script>