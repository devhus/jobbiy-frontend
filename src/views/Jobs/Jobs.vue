<template>
  <div class="jobs mt-5">
    <h3>Jobs list</h3>
    <jobs-list
      :jobs="jobs"
      :pagination="pagination"
      @pageChanged="fetch($event)"
    ></jobs-list>
  </div>
</template>
<script lang="ts">
import JobsList from "@/components/Jobs/JobsList.vue";
import JobState from "@/store/jobs/types";
import { defineComponent } from "vue";

export default defineComponent({
  components: { JobsList },
  created() {
    this.fetch(1);
  },
  methods: {
    fetch(page: number) {
      this.$store.dispatch("jobs/fetch", page);
    },
  },
  computed: {
    pagination() {
      return this.$store.getters["jobs/pagination"];
    },
    jobs(): JobState[] {
      return this.$store.getters["jobs/all"];
    },
  },
});
</script>
