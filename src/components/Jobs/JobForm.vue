<template>
  <Form @submit="formSubmit">
    <div class="row">
      <div class="col-4">
        <div class="mb-3">
          <label class="form-label" for="jobTitle">Title</label>
          <Field
            type="text"
            name="jobTitle"
            label="Title"
            class="form-control"
            v-model="form.title"
            id="jobTitle"
            rules="required|min:3|max:56"
          />
          <ErrorMessage name="jobTitle" class="text-danger" />
        </div>
      </div>
      <div class="col-4">
        <div class="mb-3">
          <label class="form-label" for="jobLocation">Located At</label>
          <Field
            type="text"
            name="jobLocation"
            label="Location"
            class="form-control"
            v-model="form.location"
            id="jobLocation"
            rules="required|min:3|max:56"
          />
          <ErrorMessage name="jobLocation" class="text-danger" />
        </div>
      </div>

      <div class="col-4">
        <div class="mb-3">
          <label class="form-label" for="jobEnabled">Enabled</label>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="jobEnabled"
              v-model="form.enabled"
              :value="form.enabled"
            />
            <label class="form-check-label" for="jobEnabled">
              Allow applying to this job
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label" for="companyDescription">Description</label>
      <Field
        type="text"
        as="textarea"
        name="companyDescription"
        label="Description"
        class="form-control"
        v-model="form.description"
        id="companyDescription"
        rules="required|min:3|max:1000"
      />
      <ErrorMessage name="companyDescription" class="text-danger" />
    </div>

    <button class="btn btn-primary d-block w-100" :disabled="loading">
      Submit
    </button>
  </Form>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import JobState, { CompanyState } from "@/store/jobs/types";

export default defineComponent({
  props: {
    job: {
      type: Object as PropType<JobState>,
    },
  },
  emits: {
    submitted() {
      return true;
    },
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  computed: {
    company(): CompanyState | undefined {
      return this.$store.getters["user/user"].company;
    },
  },
  data() {
    return {
      loading: false,
      form: {
        title: this.job?.title,
        location: this.job?.location,
        description: this.job?.description,
        enabled: this.job?.enabled ?? true,
      },
    };
  },
  methods: {
    clearForm() {
      this.form = {
        title: "",
        location: "",
        description: "",
        enabled: true,
      };
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    formSubmit() {
      if (this.loading === true) return;
      this.setLoading(true);
      this.$store
        .dispatch(`jobs/${this.job ? "update" : "create"}`, {
          ...this.form,
          id: this.job?.id,
        })
        .then(() => {
          this.$store.commit("alerts/add", {
            type: "success",
            title: "Job Saved!",
            message: "The job has been successfully saved.",
          });
          this.$emit("submitted");

          if (!this.job) this.clearForm();
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
  },
});
</script>
