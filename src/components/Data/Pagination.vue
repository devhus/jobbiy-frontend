<template>
  <div class="card" v-if="pagination !== undefined && pagination.last_page > 1">
    <div class="card-body">
      <nav aria-label="Page navigation example">
        <ul class="pagination mb-0" :class="{ disabled: loading }">
          <li
            class="page-item"
            :class="{ disabled: pagination.current_page === 1 }"
          >
            <button
              :class="{ disabled: loading }"
              :disabled="loading"
              class="page-link"
              @click="pagination && changePage(1)"
            >
              First
            </button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: pagination.current_page === 1 }"
          >
            <button
              :class="{ disabled: loading }"
              :disabled="loading"
              class="page-link"
              @click="pagination && changePage(pagination.current_page - 1)"
            >
              Previous
            </button>
          </li>
          <li
            class="page-item"
            v-for="page in pages"
            :key="page"
            :class="{
              active: pagination && page === pagination.current_page,
            }"
          >
            <button
              :class="{
                disabled: loading,
              }"
              :disabled="loading"
              class="page-link"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </li>
          <li
            class="page-item"
            :class="{
              disabled: pagination.current_page === pagination.last_page,
            }"
          >
            <button
              :class="{ disabled: loading }"
              :disabled="loading"
              class="page-link"
              @click="pagination && changePage(pagination.current_page + 1)"
            >
              Next
            </button>
          </li>

          <li
            class="page-item"
            :class="{
              disabled: pagination.current_page === pagination.last_page,
            }"
          >
            <button
              :class="{ disabled: loading }"
              :disabled="loading"
              class="page-link"
              @click="pagination && changePage(pagination.last_page)"
            >
              Last
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
import { LaravelPaginationResponse } from "@/store/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    pagination: {
      type: Object as PropType<LaravelPaginationResponse>,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    pagesStart(): number {
      if (this.pagination?.current_page) {
        const current = this.pagination?.current_page - 2;
        const start = current < 1 ? 1 : current;
        return start;
      }
      return 1;
    },
    pagesEnd(): number {
      if (this.pagination?.last_page && this.pagination?.current_page) {
        const last = this.pagination?.current_page + 2;
        const end =
          last > this.pagination?.last_page ? this.pagination?.last_page : last;
        return end;
      }
      return 1;
    },
    pages() {
      return Array.apply(null, Array(this.pagesEnd - this.pagesStart + 1)).map(
        (_, n) => {
          return n + this.pagesStart;
        }
      );
    },
  },
  emits: {
    pageChanged(page: number) {
      return page < 1;
    },
  },
  methods: {
    changePage(page: number) {
      if (
        !this.pagination ||
        page === this.pagination.current_page ||
        page > this.pagination.last_page
      )
        return;
      this.$emit("pageChanged", page);
    },
  },
});
</script>
