<template>
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
      <label class="form-label" for="registerEmail">
        New Email Address
        <span class="x-small text-muted text-uppercase">(optional)</span>
      </label>
      <Field
        type="email"
        name="registerEmail"
        label="Email"
        class="form-control"
        v-model="form.email"
        id="registerEmail"
        rules="email"
      />
      <ErrorMessage name="registerEmail" class="text-danger" />
    </div>
    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label" for="registerPassword">
            New Password
            <span class="x-small text-muted text-uppercase">(optional)</span>
          </label>
          <Field
            type="password"
            name="registerPassword"
            label="Password"
            class="form-control"
            id="registerPassword"
            rules="min:3|max:56"
            autocomplete="password"
            v-model="form.password"
          />
          <ErrorMessage name="registerPassword" class="text-danger" />
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label" for="registerPassword">
            New Password Confirmation
          </label>
          <Field
            type="password"
            name="registerPasswordConfirmed"
            label="Password Confirmation"
            class="form-control"
            id="registerPasswordConfirmed"
            rules="confirmed:registerPassword"
            autocomplete="password"
          />
          <ErrorMessage name="registerPasswordConfirmed" class="text-danger" />
        </div>
      </div>
    </div>
    <!-- <div class="mb-3">
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
    </div> -->

    <button class="btn btn-primary d-block w-100" :disabled="loading">
      Update my account
    </button>
  </Form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import UserState from "@/store/user/types";

export default defineComponent({
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  computed: {
    user(): UserState {
      return this.$store.getters["user/user"];
    },
    // form() {
    //   return {
    //     name: this.user.name,
    //     email: "",
    //     password: "",
    //   };
    // },
  },
  data() {
    const user: UserState = this.$store.getters["user/user"];
    return {
      loading: false,
      form: {
        name: user.name,
        email: user.email,
        password: "",
      },
    };
  },
  methods: {
    setLoading(value: boolean) {
      this.loading = value;
    },
    formSubmit() {
      if (this.loading === true) return;
      this.setLoading(true);
      this.$store
        .dispatch("user/update", this.form)
        .then(() => {
          this.$store.commit("alerts/add", {
            type: "success",
            title: "Account has been update!",
            message: "Your account has been successfully updated!",
          });
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
  },
});
</script>
