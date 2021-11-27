<template>
  <div class="job-view mt-5">
    <h3 class="mb-4">
      <router-link :to="{ name: 'Jobs' }">Jobs list</router-link>
      <span v-if="job"> / {{ job.title }}</span>
    </h3>
    <div v-if="loading">
      Loading...
      <!-- 
        here we should put a loader component to show a spinner while loading the job data instead of showing this simple text
       -->
    </div>
    <div v-if="job">
      <div class="card">
        <div class="card-body p-5">
          <div class="row">
            <div class="col-md-4 col-6 mb-3">
              <h6 class="x-small fw-bold text-uppercase text-muted">Title</h6>
              <h6>{{ job.title }}</h6>
            </div>
            <div class="col-md-4 col-6 mb-3">
              <h6 class="x-small fw-bold text-uppercase text-muted">
                Publisher
              </h6>
              <h6>{{ job.company?.name }}</h6>
            </div>
            <div class="col-md-4 col-6 mb-3">
              <h6 class="x-small fw-bold text-uppercase text-muted">
                Location
              </h6>
              <h6>{{ job.location }}</h6>
            </div>
            <div class="col-md-4 col-6 mb-3">
              <h6 class="x-small fw-bold text-uppercase text-muted">
                Created Since
              </h6>
              <h6>{{ formatDateAgo(job.created_at) }}</h6>
            </div>
            <div class="col-12 mb-4">
              {{ job.description }}
            </div>
            <div class="col-12">
              <button
                class="btn btn-primary disabled"
                v-if="!job.enabled"
                disabled
              >
                Not applicable at the moment
              </button>
              <button
                class="btn btn-primary"
                v-if="job.enabled"
                @click="apply"
                :disabled="loading || applying || job.has_applied"
              >
                {{ job.has_applied ? "Applied" : "Apply Now!" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import dateFormats from "@/helpers/mixins/string/date-format.mix";
import AlertState from "@/store/alerts/types";
import JobState from "@/store/jobs/types";
import { defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    return {
      job: undefined as JobState | undefined,
      loading: ref(false),
      applying: ref(false),
    };
  },
  mixins: [dateFormats],
  created() {
    if (this.loading === true) return;
    this.loading = true;
    const id = this.$route.params["jobId"];
    this.$store
      .dispatch("jobs/find", id)
      .then((job: JobState) => {
        this.job = job;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    apply() {
      if (!this.job || this.applying === true) return;
      this.applying = true;
      this.$store
        .dispatch("jobs/apply", this.job.id)
        .then(() => {
          if (this.job) {
            this.job.has_applied = true;
          }
          this.$store.commit("alerts/add", {
            title: "Application Sent",
            message:
              "Your application were successfully sent, The employer will review it soon.",
            type: "success",
            displaySeconds: 3,
          } as AlertState);
        })
        .finally(() => (this.applying = false));
    },
  },
});
</script>
