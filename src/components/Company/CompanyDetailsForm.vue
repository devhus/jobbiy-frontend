<template>
  <Form @submit="formSubmit">
    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label" for="companyName">Company Name</label>
          <Field
            type="text"
            name="companyName"
            label="Company Name"
            class="form-control"
            v-model="form.name"
            id="companyName"
            rules="required|min:3|max:56"
          />
          <ErrorMessage name="companyName" class="text-danger" />
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label" for="companyLocation">Located At</label>
          <Field
            type="text"
            name="companyLocation"
            label="Location"
            class="form-control"
            v-model="form.location"
            id="companyLocation"
            rules="required|min:3|max:56"
          />
          <ErrorMessage name="companyLocation" class="text-danger" />
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

    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label" for="companyIndustry">industry</label>
          <Field
            type="text"
            name="companyIndustry"
            label="Industry"
            class="form-control"
            v-model="form.industry"
            id="companyIndustry"
            rules="required|min:3|max:56"
          />
          <ErrorMessage name="companyIndustry" class="text-danger" />
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label" for="companyType">Type</label>
          <Field
            type="text"
            name="companyType"
            label="Type"
            class="form-control"
            v-model="form.type"
            id="companyType"
            rules="required|min:3|max:56"
          />
          <ErrorMessage name="companyType" class="text-danger" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label" for="companyWebsite">Website Url</label>
          <Field
            type="text"
            name="companyWebsite"
            label="Website"
            class="form-control"
            v-model="form.website"
            id="companyWebsite"
            rules="required|min:3|max:56"
          />
          <ErrorMessage name="companyWebsite" class="text-danger" />
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label" for="companyFoundedAt"
            >Foundation Date</label
          >
          <Field
            type="date"
            name="companyFoundedAt"
            label="Type"
            class="form-control"
            v-model="form.founded_at"
            id="companyFoundedAt"
            rules="required|min:3|max:56"
          />
          <ErrorMessage name="companyFoundedAt" class="text-danger" />
        </div>
      </div>
    </div>

    <button class="btn btn-primary d-block w-100" :disabled="loading">
      Update My Company
    </button>
  </Form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { CompanyState } from "@/store/jobs/types";
import moment from "moment";

export default defineComponent({
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
    const company: CompanyState | undefined =
      this.$store.getters["user/user"].company;
    return {
      loading: false,
      form: {
        name: company?.name,
        description: company?.description,
        location: company?.location,
        industry: company?.industry,
        website: company?.website,
        type: company?.type,
        founded_at: company?.founded_at
          ? moment(new Date(company.founded_at)).format("YYYY-MM-DD")
          : "",
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
        .dispatch("user/updateCompany", this.form)
        .then(() => {
          this.$store.commit("alerts/add", {
            type: "success",
            title: "Company updated",
            message: "Your company details has been successfully updated!",
          });
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
  },
});
</script>
