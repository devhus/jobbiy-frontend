<template>
  <div
    class="modal fade"
    ref="bsModal"
    :id="`bs-modal-${modalId}`"
    tabindex="-1"
    aria-hidden="true"
  >
    <div
      class="modal-dialog"
      :class="{
        'modal-xl': size === 'lg',
        'modal-lg': size === 'lg',
        'modal-sm': size === 'sm',
      }"
    >
      <div class="modal-content">
        <div class="modal-header" v-if="title || hasClose">
          <h5 class="modal-title" v-if="title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            v-if="hasClose"
            @click="hide()"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot v-if="shown"></slot>
        </div>
        <div class="modal-footer" v-if="footerSlot">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { uuid } from "@/helpers/utilities";
import { Modal } from "bootstrap";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    hasClose: {
      type: Boolean,
      default: () => true,
    },
    size: {
      type: String,
    },
    options: {
      type: Object as PropType<Modal.Options>,
      default: () => undefined,
    },
  },
  mounted() {
    this.modalId = uuid();
    this.modal = new Modal(this.$refs.bsModal as Element, this.options);
  },
  computed: {
    footerSlot() {
      return this.$slots["footer"];
    },
  },
  data() {
    return {
      shown: false,
      modalId: "",
      modal: this.$refs.bsModal
        ? new Modal(this.$refs.bsModal as Element)
        : undefined,
    };
  },
  methods: {
    show() {
      this.shown = true;
      this.modal?.show();
    },
    hide() {
      this.modal?.hide();
      this.shown = false;
    },
    dispose() {
      this.modal?.dispose();
      this.shown = false;
    },
  },
});

export type IModalSizes = "sm" | "md" | "lg" | "xl";
export type IModal = {
  title: string;
  hasClose: boolean;
  size: IModalSizes;
  show: () => void;
  hide: () => void;
  dispose: () => void;
};
</script>
