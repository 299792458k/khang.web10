<template>
  <div class="sidebar">
    <div class="sidebar-header" @click="notDeveloped">
      <div class="sidebar-menu icon"></div>
      <img
        class="sidebar-logo"
        src="https://actappg1.misacdn.net/img/Logo_Module_TiengViet_White.66947422.svg"
        alt=""
      />
    </div>
    <div class="sidebar-list">
      <div v-for="(item, index) in sidebarListData" :key="item.name">
        <SidebarItem
          :itemName="item.name"
          @click="
            () => {
              handleSidebarItemClick(index);
              notDeveloped();
            }
          "
          :class="index === sidebarItemChoosingIndex ? 'active' : null"
        >
          <div class="icon" :class="item.icon"></div>
        </SidebarItem>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarItem from "../components/SidebarItem.vue";
import sidebarListData from "../assets/js/data/sidebarData";
import * as resource from "@/assets/resource/resourceVn";

import { dialogStatus } from "@/assets/js/constants/constants.js";
export default {
  inject: ["createDialog"],
  name: "SidebarComponent",
  components: {
    SidebarItem,
  },
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
    /**
     * click vào sidebar item
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleSidebarItemClick(index) {
      this.sidebarItemChoosingIndex = index;
    },
  },
  data() {
    return {
      sidebarItemChoosingIndex: 1,
      sidebarListData,
    };
  },
};
</script>

<style scoped>
@import url("../assets/css/sidebar/sidebar.css");
</style>