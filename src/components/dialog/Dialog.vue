<template>
  <div class="dialog-overlay">
    <div class="dialog" :class="type" ref="dialog">
      <div class="dialog-header">
        <div class="dialog-title">{{ title }}</div>
        <div class="icon icon-close" @click="toggleDialog"></div>
      </div>
      <div class="dialog-content">
        <div class="dialog-content--icon icon" :class="status"></div>
        <div class="dialog-content--text">{{ content }}</div>
      </div>
      <div class="dialog-buttons">
        <div
          class="dialog-button-close btn target-tooltip"
          :class="!type ? 'btn--main' : ''"
          @click="toggleDialog"
        >
          Đóng
          <div class="k-tooltip">F3</div>
        </div>
        <div class="confirm-buttons">
          <div class="btn" @click="handleNoConfirm">Không</div>
          <div class="btn btn--main" @click="handleConfirm">Có</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { dialogType, keyboardCodes } from "@/assets/js/constants/constants.js";
export default {
  inject: [
    "dialogShowing",
    "toggleDialog",
    "showLoadingTable",
    "showLoading",
    "recallApi",
    "toggleForm",
  ],
  props: ["title", "status", "content", "type", "handler"],
  name: "DialogComponent",
  mounted() {
    window.addEventListener("keydown", this.handleShortcut);
  },
  unmounted() {
    window.removeEventListener("keydown", this.handleShortcut);
  },
  methods: {
    /**
     * thêm các phím tắt
     * @param {e} event
     * Created By Khang
     */
    handleShortcut(e) {
      e.preventDefault();
      if (e.code === keyboardCodes.F3) {
        this.toggleDialog();
      }
    },
    /**
     * xác nhận action
     * Created By Khang
     */
    async handleConfirm() {
      // this.showLoading(true);
      await this.handler();
      // this.showLoading(false);
      this.recallApi();
      this.toggleDialog();
    },
    /**
     * không xác nhận action
     * Created By Khang
     */
    handleNoConfirm() {
      this.toggleDialog();
      this.toggleForm(false);
    },
  },
  data() {
    return {
      confirmType: dialogType.confirm,
      deepConfirmType: dialogType.deepConfirm,
    };
  },
};
</script>
<style scoped>
@import url(../../assets/css/base/dialog.css);
</style>