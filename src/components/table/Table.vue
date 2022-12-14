<template>
  <div class="tb">
    <TableRow
      :isHeading="true"
      ref="checkAll"
      :selectAll="selectAll"
      :checked="isSelectAll"
    ></TableRow>
    <div v-if="data" class="tb-content">
      <div v-for="(item, index) in data" ref="tableItemRefs" :key="item.code">
        <TableRow
          :data="item"
          :modelValue="itemCheckedArray[index]"
          :index="index"
          @update:modelValue="
            (index) =>
              (this.itemCheckedArray[index] = !this.itemCheckedArray[index])
          "
          :checkSelectedAll="checkSelectedAll"
        ></TableRow>
      </div>
      <vue-element-loading
        :active="isLoadingTableContent"
        spinner="bar-fade-scale"
      />
    </div>
    <!-- <div v-else></div> -->
    <img
      v-else
      src="https://cdn.dribbble.com/users/1449854/screenshots/4136663/no_data_found.png"
      alt="ss"
      class="no-image"
    />
  </div>
</template>
<script>
import VueElementLoading from "vue-element-loading";
//js
import {
  modifyTotalSelectedRecordsTypes,
  maxRecordsPerPage,
} from "@/assets/js/constants/constants.js";
//component
import TableRow from "./TableRow.vue";
export default {
  inject: ["modifyTotalSelectedRecords", "isLoadingTableContent"],
  name: "TableComponent",
  props: ["data"],
  components: {
    TableRow,
    VueElementLoading,
  },
  created() {
    // khởi tạo mảng các bản ghi đã chọn
    for (let i = 0; i < maxRecordsPerPage; i++) {
      this.itemCheckedArray[i] = false;
    }

    console.log(this.data);
  },
  // // lưu lại selectAll khi reload data
  // updated() {
  //   if (this.isSelectAll) {
  //     this.selectAll(true);
  //   }
  // },
  methods: {
    /**
     * chọn tất cả
     * @param {value} true: chọn tất, false: bỏ chọn tất, null: toggle isSelectAll
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    selectAll(value) {
      // tổng số bản ghi trên trang hiện tại
      const tableItemRefs = this.$refs.tableItemRefs;
      if (value !== undefined) {
        this.isSelectAll = value;
        this.modifyTotalSelectedRecords(
          modifyTotalSelectedRecordsTypes.set,
          tableItemRefs.length
        );
      } else {
        if (this.isSelectAll) {
          this.modifyTotalSelectedRecords(
            modifyTotalSelectedRecordsTypes.set,
            0
          );
        } else {
          this.modifyTotalSelectedRecords(
            modifyTotalSelectedRecordsTypes.set,
            this.data.length
          );
        }
        this.isSelectAll = !this.isSelectAll;
      }
      for (let i = 0; i < this.data.length; i++) {
        this.itemCheckedArray[i] = this.isSelectAll;
      }
    },
    /**
     * kiểm tra có đang chọn tất cả không
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    checkSelectedAll() {
      let isCheckedAll = true;
      for (let i = 0; i < this.data.length; i++) {
        if (!this.itemCheckedArray[i]) {
          isCheckedAll = false;
          break;
        }
      }
      this.isSelectAll = isCheckedAll;
      this.$refs.checkAll.$refs.checkbox.checked = this.isSelectAll;
    },
  },
  data() {
    return {
      isSelectAll: false,
      itemCheckedArray: [],
    };
  },
};
</script>
<style scoped>
@import url("../../assets/css/base/table.css");
</style>