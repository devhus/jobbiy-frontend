<template>
  <div class="card" v-if="job">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h5>{{ job.title }}</h5>
        <span class="text-muted small">
          {{ formatDateAgo(job.created_at) }}
        </span>
      </div>
      <div class="text-muted small">
        <span>{{ job.location }}</span>
      </div>
      <hr />
      <p v-if="job.description">{{ job.description.slice(0, 56) }}...</p>

      <div class="text-center">
        <div class="btn-group w-100" v-if="editable">
          <button
            class="btn btn-primary d-block w-100"
            @click="editModal && editModal.show()"
          >
            Edit
          </button>
          <button
            class="btn btn-warning d-block w-100"
            @click="applicationsModal && applicationsModal.show()"
          >
            Applications
          </button>
        </div>
        <router-link
          v-if="!editable"
          :to="`/jobs/${job.id}`"
          class="btn btn-primary d-block w-100"
        >
          View Job
        </router-link>
      </div>
    </div>
  </div>

  <modal
    v-if="editable && job"
    :title="`Edit ${job.title}`"
    ref="editJobModal"
    size="lg"
    :options="{ backdrop: 'static' }"
  >
    <template v-slot>
      <job-form @submitted="editModal.hide()" :job="job"></job-form>
    </template>
  </modal>
  <modal
    v-if="editable && job"
    :title="`${job.title}'s Applications`"
    ref="jobApplicationsModal"
    size="lg"
    :options="{ backdrop: 'static' }"
  >
    <template v-slot>
      <applications-list :job="job"></applications-list>
    </template>
  </modal>
</template>
<script lang="ts">
import JobState from "@/store/jobs/types";
import { defineComponent, PropType } from "vue";
import formatDate from "@/helpers/mixins/string/date-format.mix";
import Modal, { IModal } from "../Bootstrap/Modal.vue";
import JobForm from "./JobForm.vue";
import ApplicationsList from "./ApplicationsList.vue";

export default defineComponent({
  components: { JobForm, Modal, ApplicationsList },
  props: {
    job: {
      type: Object as PropType<JobState>,
    },
    editable: {
      type: Boolean,
      default: () => false,
    },
  },
  mixins: [formatDate],
  computed: {
    editModal(): IModal {
      return this.$refs.editJobModal as IModal;
    },
    applicationsModal(): IModal {
      return this.$refs.jobApplicationsModal as IModal;
    },
    user() {
      return this.$store.getters["user/user"];
    },
  },
});
</script>
