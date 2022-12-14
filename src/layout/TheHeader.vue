<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left--menu">
        <div class="header-left--icon icon" @click="notDeveloped"></div>
      </div>
      <div class="header-left-dropdown" @click="notDeveloped">
        <div class="header-left--title target-tooltip">
          CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC
          <div class="k-tooltip">
            Công ty trách nhiệm hữu hạn Sản xuất - Thương mại - Dịch vụ Qui Phúc
          </div>
        </div>
        <div class="header-left--select icon icon-arrow-down"></div>
      </div>
    </div>
    <div class="header-right">
      <div class="header-right--noti icon" @click="notDeveloped"></div>
      <div class="header-right--user" @click="notDeveloped">
        <div class="header-right--user-avt icon"></div>
        <div class="header-right--user-name">Phạm công Khang</div>
        <div class="header-right--select icon-arrow-down icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { dialogStatus } from "@/assets/js/constants/constants.js";
import * as resource from "@/assets/resource/resourceVn";
export default {
  inject: ["createDialog"],
  name: "HeaderComponent",
  props: [],
  methods: {
    /**
     * chức năng chưa phát triển
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    notDeveloped() {
      this.createDialog(
        resource.dialogTitles.notDeveloped,
        dialogStatus.warning,
        resource.dialogMessage.notDeveloped
      );
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url("../assets/css/header/header.css");
</style>