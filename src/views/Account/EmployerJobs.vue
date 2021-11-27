<template>
  <div class="jobs" v-if="company">
    <div class="d-flex mb-3 justify-content-between align-items-center">
      <h5 class="mb-0">{{ company.name }} s' Jobs</h5>
      <button class="btn btn-outline-primary btn-sm" @click="modal.show()">
        New Job
      </button>
    </div>
    <jobs-list
      :jobs="jobs"
      :editable="true"
      :pagination="pagination"
      @pageChanged="fetch($event)"
    ></jobs-list>

    <modal
      title="Add new job"
      ref="newJobModal"
      size="lg"
      :options="{ backdrop: 'static' }"
    >
      <template v-slot>
        <job-form @submitted="modal.hide()"></job-form>
      </template>
    </modal>
  </div>
  <template v-if="!company">
    <div class="text-center py-4">
      <h6 class="fw-bold">No company found!</h6>
      <p>
        Please setup your company first in
        <router-link :to="{ name: 'Account.Company' }">
          Company Details
        </router-link>
        tab.
      </p>
    </div>
  </template>
</template>
<script lang="ts">
import JobsList from "@/components/Jobs/JobsList.vue";
import JobState, { CompanyState } from "@/store/jobs/types";
import { defineComponent } from "vue";
import Modal, { IModal } from "@/components/Bootstrap/Modal.vue";
import JobForm from "@/components/Jobs/JobForm.vue";

export default defineComponent({
  components: { JobsList, Modal, JobForm },
  created() {
    this.fetch(1);
  },
  methods: {
    fetch(page: number) {
      this.$store.dispatch("jobs/employerFetch", page);
    },
  },
  computed: {
    modal(): IModal {
      return this.$refs.newJobModal as IModal;
    },
    company(): CompanyState {
      return this.$store.getters["user/user"].company;
    },
    pagination() {
      return this.$store.getters["jobs/pagination"];
    },
    jobs(): JobState[] {
      return this.$store.getters["jobs/all"];
    },
  },
});
</script>
