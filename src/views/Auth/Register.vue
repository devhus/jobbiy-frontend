<template>
  <div class="text-center mb-2">
    <h4 class="fw-bold">Sign Up</h4>
    <h6>Create a new account for free.</h6>
  </div>
  <Form @submit="formSubmit">
    <div class="mb-3">
      <label class="form-label" for="registerName">Full Name</label>
      <Field
        type="text"
        ref="inputName"
        name="registerName"
        label="Full Name"
        class="form-control"
        v-model="form.name"
        id="registerName"
        rules="required|min:3|max:56"
      />
      <ErrorMessage name="registerName" class="text-danger" />
    </div>
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
    <div class="row">
      <div class="col-6">
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
      </div>
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label" for="registerPassword"
            >Password Confirmation</label
          >
          <Field
            type="password"
            name="registerPasswordConfirmed"
            label="Password Confirmation"
            class="form-control"
            id="registerPasswordConfirmed"
            rules="required|confirmed:registerPassword"
            autocomplete="password"
          />
          <ErrorMessage name="registerPasswordConfirmed" class="text-danger" />
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          id="registerIsEmployer"
          v-model="form.is_employer"
          :value="form.is_employer"
        />
        <label class="form-check-label" for="registerIsEmployer">
          I am hiring as employer
        </label>
      </div>
    </div>

    <div class="mb-3">
      <form-recaptcha
        @verified="setRecaptcha"
        ref="formRecaptcha"
      ></form-recaptcha>
    </div>

    <button class="btn btn-primary d-block w-100" :disabled="loading">
      Create My Account!
    </button>
  </Form>
</template>
<script lang="ts">
import httpClient, { ApiResponse } from "@/helpers/http-client";
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
        name: "",
        email: "",
        password: "",
        is_employer: false,
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
      if (this.loading) return;
      this.setLoading(true);

      //this is a bad example, it's better to add it to vuex store actions
      //but since this is a test sample it's not very important to follow the best practice for small detail like that
      httpClient
        .post<ApiResponse>("/auth/register", {
          ...this.form,
          recaptcha: this.recaptcha,
        })
        .then((res) => {
          if (res.data.status !== "success") return;
          this.$store.commit("alerts/add", {
            type: "success",
            title: "Account has been created!",
            message: "Your account has been successfully created!",
          });
          this.$router.push({ name: "Auth.Login" });
        })
        .finally(() => {
          (this.$refs.formRecaptcha as any).reset();
          this.setLoading(false);
        });
    },
  },
});
</script>