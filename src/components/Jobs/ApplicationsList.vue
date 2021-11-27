<template>
  <div class="responsive-table">
    <table
      class="table table-striped"
      v-if="applications && applications.length > 0"
    >
      <thead>
        <tr class="x-small text-uppercase">
          <th>Application Id</th>
          <th>Employee</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="application in applications" :key="application.id">
          <td>{{ application.id }}</td>
          <td>
            <div v-if="application.user">
              <span class="d-block">{{ application.user.name }}</span>
              <span class="d-block x-small text-muted fw-bold">
                {{ application.user.email }}
              </span>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-sm"
                :disabled="application.status !== 'pending'"
                :class="{
                  'btn-success': application.status === 'accepted',
                  'btn-outline-success': application.status !== 'accepted',
                }"
                @click="updateStatus(application, 'accepted')"
              >
                Accept
              </button>
              <button
                class="btn btn-sm"
                :class="{
                  'btn-danger': application.status === 'rejected',
                  'btn-outline-danger': application.status !== 'rejected',
                }"
                :disabled="application.status !== 'pending'"
                @click="updateStatus(application, 'rejected')"
              >
                Reject
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="py-4" v-if="!applications || applications.length === 0">
    <h6>No applications yet</h6>
    <p>This job did not receive any applications yet.</p>
  </div>
  <pagination
    :pagination="pagination"
    @pageChanged="fetch($event)"
  ></pagination>
</template>
<script lang="ts">
import Pagination from "@/components/Data/Pagination.vue";
import JobApplicationState, {
  JobApplicationStatus,
} from "@/store/job-applications/types";
import JobState from "@/store/jobs/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    job: {
      type: Object as PropType<JobState>,
    },
  },
  mounted() {
    this.$store.dispatch("applications/fetch", {
      jobId: this.job?.id,
      page: 1,
    });
  },
  computed: {
    pagination() {
      return this.$store.getters["applications/pagination"];
    },
    applications(): JobApplicationState[] {
      return this.$store.getters["applications/all"];
    },
  },
  components: { Pagination },
  methods: {
    fetch(page: number) {
      this.$store.dispatch("applications/fetch", {
        jobId: this.job?.id,
        page,
      });
    },
    updateStatus(app: JobApplicationState, newStatus: JobApplicationStatus) {
      this.$store.dispatch("applications/status", {
        jobId: this.job?.id,
        applicationId: app.id,
        status: newStatus,
      });
    },
  },
});
</script>