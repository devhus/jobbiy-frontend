<template>
  <div class="row" v-if="jobs">
    <div class="col-3 mb-3" v-for="job in jobs" :key="job.id">
      <job-card :job="job" :editable="editable"></job-card>
    </div>
  </div>
  <pagination
    :pagination="pagination"
    @pageChanged="changePage($event)"
  ></pagination>
</template>
<script lang="ts">
import Pagination from "@/components/Data/Pagination.vue";
import JobCard from "@/components/Jobs/JobCard.vue";
import JobState from "@/store/jobs/types";
import { LaravelPaginationResponse } from "@/store/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    jobs: {
      type: Array as PropType<JobState[]>,
    },
    pagination: {
      type: Object as PropType<LaravelPaginationResponse>,
    },
    editable: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: {
    pageChanged(page: number) {
      return page > 0;
    },
  },
  components: { JobCard, Pagination },
  methods: {
    changePage(page: number) {
      this.$emit("pageChanged", page);
    },
  },
});
</script>