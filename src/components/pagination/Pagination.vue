<template>
  <div class="table--footer">
    <div class="table--footer-left">
      Tổng: <span class="total-records">{{ this.totalRecords }}</span>
      <span class="selected-records" v-show="totalSelectedRecords > 0"
        >( Đã chọn: {{ this.totalSelectedRecords }} )</span
      >
    </div>
    <div class="table--footer-wrapper">
      <div class="table--footer-limit">Số bản ghi/trang:</div>
      <div v-if="recordsPerPageIndex">
        {{ dropdownContent[recordsPerPageIndex].data }}
        <!-- {{ recordsPerPage }} bản ghi tren một trang -->
      </div>
      <div v-else>10</div>
      <div
        :class="{ choosing: dropdownShowing }"
        class="table--footer-total"
        @click="handleToggleDropdown"
      >
        <div class="icon icon-arrow-down"></div>
        <div
          v-show="dropdownShowing"
          class="dropdown-wrapper"
          :style="{ top: -dropdownTop + 'px' }"
          ref="dropdown"
        >
          <div v-for="(item, index) in dropdownContent" :key="item">
            <DropdownItem
              :content="item"
              id="index"
              :class="index === recordsPerPageIndex ? 'active' : null"
            ></DropdownItem>
          </div>
        </div>
      </div>

      <div class="table--footer-paginating">
        <div>
          {{ (this.currentPage - 1) * this.recordsPerPage + 1 }} -
          {{
            this.currentPage * this.recordsPerPage < this.totalRecords
              ? this.currentPage * this.recordsPerPage
              : this.totalRecords
          }}
          bản ghi
        </div>
        <div
          class="paginating-page paginating-page-before icon icon-arrow-down"
          @click="decreasePage"
          :class="currentPage === 1 ? 'disabled' : ''"
        ></div>
        <div
          class="paginating-page paginating-page-after icon icon-arrow-down"
          @click="increasePage"
          :class="currentPage === totalPages ? 'disabled' : ''"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import DropdownItem from "../dropdown/DropdownItem.vue";
import { pagination } from "@/assets/js/constants/constants.js";
import pagingData from "@/assets/js/data/pagingData";
export default {
  inject: [
    "setPageLimit",
    "setCurrentPage",
    "increaseCurrentPage",
    "decreaseCurrentPage",
  ],
  name: "PagingComponent",
  components: {
    DropdownItem,
  },
  props: ["totalRecords", "totalSelectedRecords", "recordsPerPage", "page"],
  created() {
    // gán giá trị cho dropdown chọn số bản ghi trên một trang
    this.dropdownContent = pagingData.map((item) => {
      return {
        value: item.value,
        data: item.data,
        handler: () => {
          this.setPageLimit(item.value),
            this.handleDropdownChoose(item.index),
            this.toggleDropdown();
        },
      };
    });
    /**
     * lắng nghe thay đổi trang
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    this.$watch("page", () => {
      this.currentPage = this.page;
    });
    /**
     * lắng nghe thay đổi số bản ghi/trang
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    this.$watch("recordsPerPage", () => {
      for (let i = 0; i < this.dropdownContent.length; i++) {
        if (this.dropdownContent[i].value === this.recordsPerPage) {
          this.recordsPerPageIndex = i;
        }
      }
    });
  },
  methods: {
    /**
     * trang trước
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    decreasePage() {
      if (this.currentPage > 1) {
        this.decreaseCurrentPage();
      }
    },
    /**
     * trang sau
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    increasePage() {
      if (this.currentPage < this.totalPages) {
        this.increaseCurrentPage();
      }
    },
    /**
     * đóng/mở combo box chọn số bản ghi/trang
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleToggleDropdown() {
      this.dropdownTop =
        this.dropdownContent.length * pagination.dropdownItemHeight +
        pagination.dropdownMargin;
      this.toggleDropdown();
    },
    /**
     * ẩn chọn số bản ghi
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    toggleDropdown() {
      this.dropdownShowing = !this.dropdownShowing;
    },
    /**
     * chọn số bản ghi
     * @param {index} index của số bản ghi trogn combo box
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleDropdownChoose(index) {
      this.recordsPerPageIndex = index;
      this.handleToggleDropdown();
    },
  },
  computed: {
    /**
     * tính tổng số trang
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    totalPages() {
      return Math.floor(this.totalRecords / this.recordsPerPage) + 1;
    },
  },
  data() {
    return {
      dropdownTop: 0,
      dropdownContent: [],
      dropdownShowing: false,
      recordsPerPageIndex: 0,
      currentPage: this.page,
    };
  },
};
</script>
<style scoped>
@import url("../../assets/css/pagination/pagination.css");
</style>