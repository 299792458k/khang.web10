<template @toggle-form="toggleForm">
  <div class="content">
    <div class="content-outer">
      <h2>Nhân viên</h2>
      <div class="add-employee btn--main btn target-tooltip" @click="newForm()">
        Thêm mới nhân viên
        <div class="k-tooltip">Ctrl 1</div>
      </div>
    </div>
    <div class="content-inner-wrapper" @scroll="onScroll">
      <div class="content-inner" @scroll="myScroll">
        <div ref="getScrollPosElement"></div>
        <div class="content-inner--actions">
          <div class="content-actions-left">
            <button
              class="btn export-btn"
              @click="toggleActionMulti"
              :class="this.totalSelectedRecords < 1 ? 'disabled' : ''"
            >
              Thực hiện hàng loạt
              <div class="icon icon-dropdown-light"></div>
            </button>
            <Transition>
              <Dropdown
                class="action-multi"
                :show="isMultiSelecting && this.totalSelectedRecords >= 1"
                :content="actionMultiData"
              ></Dropdown>
            </Transition>
          </div>
          <div class="content-actions-right">
            <input
              v-model="searchParam"
              type="text"
              placeholder="Tìm theo mã, tên nhân viên"
              class="content-inner--actions-search"
            />
            <div class="content-inner--actions-icon icon"></div>
            <div
              class="content-inner--actions-refresh icon"
              @click="reload"
            ></div>
            <div class="icon icon-excel" @click="exportToExcel"></div>
          </div>
        </div>
        <div class="scrollContainer">
          <TableComponent ref="table" :data="tableData"></TableComponent>
          <!-- <div v-else>no content</div> -->
        </div>
        <Pagination
          v-show="tableData"
          :page="page"
          :totalRecords="totalRecords"
          :totalSelectedRecords="totalSelectedRecords"
          :recordsPerPage="limit"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
// library
import { computed } from "@vue/runtime-core";
// service
import * as employeeService from "../apiServices/employeeService";
// js
import Constant, {
  modifyTotalSelectedRecordsTypes,
  dialogStatus,
  dialogType,
  excel,
} from "../assets/js/constants/constants.js";
import debounce from "../assets/js/helpers/debounce.js";
import * as resource from "@/assets/resource/resourceVn";
import * as enums from "@/assets/js/enums/enums";
// component
import Pagination from "../components/pagination/Pagination.vue";
import TableComponent from "../components/table/Table.vue";
import Dropdown from "../components/dropdown/Dropdown.vue";

export default {
  inject: [
    "showLoadingTable",
    "showLoading",
    "createDialog",
    "recallApi",
    "newForm",
    "toggleForm",
  ],
  name: "ContentComponent",
  props: ["isDataChanged"],
  components: {
    Pagination,
    TableComponent,
    Dropdown,
  },
  created() {
    /**
     * watch các deps (từ khoá, số trang, số bản ghi trên một trang)
     * khi deps thay đổi thì gọi lại api để lấy data mới nhất
     */
    this.$watch(
      () => ({
        isDataChanged: this.isDataChanged,
        searchDebounceParam: this.searchDebounceParam,
        limit: this.limit,
        page: this.page,
      }),
      () => {
        this.getTableData();
      }
    );

    this.getTableData();
  },
  // lắng nghe sự kiện resize
  mounted() {
    window.addEventListener("resize", this.getWindowWidth);
  },
  // bỏ lắng nghe sự kiện resize
  unmounted() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  // xử lý debounce khi người dùng tìm kiếm
  watch: {
    searchParam: debounce(function (newVal) {
      this.searchDebounceParam = newVal;
    }, 500),
  },
  methods: {
    /**
     * lấy dữ liệu của bảng
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    async getTableData() {
      this.showLoadingTable(true);
      const res = await employeeService.getEmployees(
        this.limit,
        this.page,
        this.searchDebounceParam
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.showLoadingTable(false);
      this.tableData = res.content.data;
      console.log(res.content.data);
      this.totalRecords = res.content.totalCount;
    },
    /**
     * xuất khẩu
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    async exportToExcel() {
      this.showLoading(true);
      var res = await employeeService.exportToExcel();
      this.showLoading(false);
      const url = URL.createObjectURL(
        new Blob([res.content], {
          type: excel.type,
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(excel.linkAttr, excel.name);
      document.body.appendChild(link);
      link.click();
    },
    /**
     * toggle combo box các chức năng hàng loạt
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    toggleActionMulti() {
      if (this.totalSelectedRecords > 0)
        this.isMultiSelecting = !this.isMultiSelecting;
    },
    /**
     * dialog confirm xoá hàng loạt
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    deleteMulti() {
      this.createDialog(
        resource.dialogTitles.delete,
        dialogStatus.warning,
        resource.dialogMessage.confirmDeleteMulti,
        dialogType.confirm,
        this.handleActionMulti.bind(this)
      );
    },
    /**
     * xoá các bản ghi đã chọn
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    async handleActionMulti() {
      this.toggleActionMulti();
      this.selectedRecordsArray = this.$refs.table.itemCheckedArray;
      // lấy id các bản ghi dã chọn
      let list = [];
      this.selectedRecordsArray.map((item, index) => {
        if (item) {
          list.push(this.tableData[index].EmployeeId);
        }
      });
      const requestData = list.join();
      this.showLoading(true);
      let res = await employeeService.deleteMultiEmployee(requestData);
      this.showLoading(false);
      this.reload();
      this.clearSelected();
      if (res.status === enums.httpCode.ok) {
        this.createDialog(
          resource.dialogTitles.success,
          dialogStatus.success,
          resource.dialogMessage.deleteMultiSuccess
        );
      } else {
        if (res.errorCode === enums.errorCodes.exception) {
          this.createDialog(
            resource.dialogTitles.exception,
            dialogStatus.error,
            resource.errorMessage[res.errorCode]
          );
        }
      }
    },
    /**
     * clear các record đã chọn sau khi thực hiện chức năng hàng loạt
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    clearSelected() {
      this.$refs.table.selectAll(false);
      this.$refs.table.itemCheckedArray = this.$refs.table.itemCheckedArray.map(
        () => false
      );
      this.totalSelectedRecords = 0;
    },
    /**
     * lấy độ rộng của trình duyệt
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    getWindowWidth() {
      this.windowInnerwidth = window.innerWidth;
    },
    /**
     * chức năng reload
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    reload() {
      this.recallApi();
    },
    /**
     * thay đổi số bản ghi trên một trang
     * @param {limit} limit
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    setPageLimit(limit) {
      this.limit = limit;
      this.page = 1;
      this.$forceUpdate();
    },
    /**
     * thay đổi số trang
     * @param {page} trang
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    setCurrentPage(page) {
      this.page = page;
      this.$forceUpdate();
    },
    /**
     * trang sau
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    increaseCurrentPage() {
      this.page = this.page + 1;
    },
    /**
     * trang trước
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    decreaseCurrentPage() {
      this.page = this.page - 1;
    },
    /**
     * hàm set tổng số bản ghi đã chọn
     * @param {loại ( tăng, giảm, set giá trị )} type
     * @param {giá trị} value, mặc định là 1
     * @returns
     * Created By Khang (12/12/2022)
     */
    modifyTotalSelectedRecords(type, value = 1) {
      console.log(value);
      switch (type) {
        case modifyTotalSelectedRecordsTypes.increase:
          this.totalSelectedRecords = this.totalSelectedRecords + value;
          console.log(this.totalSelectedRecords);
          break;
        case modifyTotalSelectedRecordsTypes.decrease:
          this.totalSelectedRecords = this.totalSelectedRecords - value;
          console.log(this.totalSelectedRecords);
          break;
        case modifyTotalSelectedRecordsTypes.set:
          this.totalSelectedRecords = value;
          console.log(this.totalSelectedRecords);
          break;
      }
    },
  },
  data() {
    return {
      windowInnerwidth: window.innerWidth,
      scrollPosition: Constant.sidebarWidth,
      searchParam: "",
      searchDebounceParam: "",
      page: 1,
      limit: 10,
      tableData: [],
      totalRecords: 0,
      totalSelectedRecords: 0,
      selectedRecordsArray: [],
      isMultiSelecting: false,
      actionMultiData: [
        {
          data: resource.tableRowFunctions.delete,
          handler: this.deleteMulti,
        },
      ],
    };
  },
  provide() {
    return {
      scrollPosition: computed(
        () =>
          this.windowInnerwidth -
          Constant.modifyEmployeeDropdownToWindowRight -
          this.scrollPosition
      ),
      setPageLimit: this.setPageLimit,
      setCurrentPage: this.setCurrentPage,
      increaseCurrentPage: this.increaseCurrentPage,
      decreaseCurrentPage: this.decreaseCurrentPage,
      modifyTotalSelectedRecords: this.modifyTotalSelectedRecords,
    };
  },
};
</script>

<style scoped>
@import url("../assets/css/content/content.css");
</style>