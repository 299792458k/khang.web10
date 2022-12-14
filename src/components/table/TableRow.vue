<template>
  <template v-if="isHeading">
    <div class="t-row t-head">
      <div class="t-cell t-space"></div>
      <div class="t-cell checkbox" @dblclick.stop>
        <input
          ref="checkbox"
          type="checkbox"
          name=""
          id=""
          :checked="checked"
          @change="handleSelectAll"
        />
      </div>
      <div class="t-cell mw-120">Mã Nhân Viên</div>
      <div class="t-cell name">Tên Nhân viên</div>
      <div class="t-cell mw-120">Giới Tính</div>
      <div class="t-cell mw-120 t-center">Ngày sinh</div>
      <div class="t-cell fl-1 target-tooltip">
        Số CMND
        <div class="k-tooltip">Số chứng minh nhân dân</div>
      </div>
      <div class="t-cell fl-1">Chức Danh</div>
      <div class="t-cell fl-1">Tên Đơn Vị</div>
      <div class="t-cell fl-1">Số Tài Khoản</div>
      <div class="t-cell fl-1 mw-300">Tên Ngân Hàng</div>
      <div class="t-cell fl-1 mw-300 target-tooltip">
        Chi Nhánh TK Ngân Hàng
        <div class="k-tooltip">Chi nhánh tài khoản ngân hàng</div>
      </div>
      <div class="t-cell heading t-functional mw-120">Chức năng</div>
      <!-- <div class="t-cell t-space"></div> -->
    </div>
  </template>
  <template v-else>
    <div
      class="t-row"
      @dblclick="handleModifyEmployee"
      ref="row"
      :class="modelValue ? 'checked' : ''"
    >
      <div class="t-cell t-space"></div>
      <div class="t-cell checkbox" @dblclick.stop>
        <input
          ref="checkbox"
          type="checkbox"
          name=""
          id=""
          @input="handleCheck"
          :checked="modelValue"
          :value="modelValue"
        />
        <!-- @click.prevent="handleCheck" -->
      </div>
      <div class="t-cell mw-120">{{ data.EmployeeCode }}</div>
      <div class="t-cell name">{{ data.FullName }}</div>
      <div class="t-cell mw-120">{{ gender }}</div>
      <div class="t-cell mw-120 t-center">
        {{ convert(data.DateOfBirth) }}
      </div>
      <div class="t-cell fl-1">{{ data.IdentityNumber }}</div>
      <div class="t-cell fl-1">{{ data.PositionName }}</div>
      <div class="t-cell fl-1">{{ data.DepartmentName }}</div>
      <div class="t-cell fl-1">{{ data.BankAccountNumber }}</div>
      <div class="t-cell fl-1 mw-300">{{ data.BankName }}</div>
      <div class="t-cell fl-1 mw-300">{{ data.BankPlace }}</div>

      <div class="t-cell t-functional mw-120" @dblclick.stop>
        <span class="modify" @click="handleModifyEmployee">Sửa</span>
        <div
          class="icon--small icon-dropdown"
          :class="isDropdownSelecting ? 'active' : ''"
          @click="handleModifyDropdown"
        ></div>
      </div>
      <Dropdown
        :style="{
          top: dropdownTop + 'px',
        }"
        class="table-row-dropdown"
        :show="isDropdownSelecting"
        :content="dropdownContent"
      ></Dropdown>
    </div>
  </template>
</template>
<script>
import Dropdown from "../dropdown/Dropdown.vue";
import * as employeeService from "../../apiServices/employeeService";

// js
import { convertToVNDate } from "../../assets/js/helpers/dateHelper";
import {
  dialogStatus,
  dialogType,
  modifyTotalSelectedRecordsTypes,
  formTypes,
  tableRow,
} from "@/assets/js/constants/constants.js";
import * as resource from "../../assets/resource/resourceVn";
import * as enums from "@/assets/js/enums/enums";
import EmployeeClass from "../../assets/js/class/employeeClass";
export default {
  inject: [
    "toggleDialog",
    "createDialog",
    "newForm",
    "modifyTotalSelectedRecords",
    "showLoading",
  ],
  name: "TableFooter",
  components: { Dropdown },
  props: [
    "isHeading",
    "data",
    "selectAll",
    "checkSelectedAll",
    "modelValue",
    "index",
    "checked",
  ],
  emits: ["update:modelValue", "recallApi"],
  computed: {
    // render giới tính theo enums
    gender() {
      let genderName = Object.keys(enums.gender).find(
        (key) => enums.gender[key] === this.data.Gender
      );
      return resource.gender[genderName];
    },
  },
  methods: {
    /**
     * chuuyển đổi ngày sinh về dạng Vietnam date
     * @param {data} chuỗi ng
     * @returns ngày đã convert
     * Created By KhangPC (12/12/2022)
     */
    convert(data) {
      return convertToVNDate(data);
    },
    /**
     * ẩn/hiện dropdown ở cột chức năng
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    toggleDropdown() {
      this.isDropdownSelecting = !this.isDropdownSelecting;
    },
    /**
     * chọn tất cả
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleSelectAll() {
      this.selectAll();
    },
    /**
     * chọn/bỏ chọn một bản ghi
     * @param {} description
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleCheck() {
      this.$emit("update:modelValue", this.index);
      const checkboxEle = this.$refs.checkbox;
      if (checkboxEle.checked) {
        this.modifyTotalSelectedRecords(
          modifyTotalSelectedRecordsTypes.increase
        );
      } else {
        this.modifyTotalSelectedRecords(
          modifyTotalSelectedRecordsTypes.decrease
        );
      }
      this.checkSelectedAll();
    },
    /**
     * lấy vị trí của dropdown
     * @param {e} event
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleModifyDropdown(e) {
      if (
        e.clientY + tableRow.dropdownTop + tableRow.dropdownHeight >
        tableRow.maxDropdownPositionY
      ) {
        this.dropdownTop = e.clientY - tableRow.dropdownHeight;
      } else {
        this.dropdownTop = e.clientY + tableRow.dropdownTop;
      }
      this.toggleDropdown();
    },
    /**
     * chọn chức năng sửa
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleModifyEmployee() {
      const employeeValues = Object.values(this.data);
      const employeeData = new EmployeeClass(...employeeValues);
      this.newForm(formTypes.modify, employeeData);
    },
    /**
     * các chức năng chưa phát triển
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    notDevelopedFunction() {
      this.createDialog(
        resource.dialogTitles.notDeveloped,
        dialogStatus.error,
        resource.dialogMessage.notDeveloped
      ),
        this.toggleDropdown();
    },
    /**
     * tạo dialog để xác thực hành động
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    confirmDeleteEmployee() {
      this.createDialog(
        resource.dialogTitles.delete,
        dialogStatus.warning,
        resource.dialogMessage.confirmDelete(this.data.EmployeeCode),
        dialogType.confirm,
        async () => {
          await employeeService.deleteEmployee(this.data.EmployeeId);
          this.createDialog(
            resource.dialogTitles.success,
            dialogStatus.success,
            resource.dialogMessage.deleteMultiSuccess
          );
        }
      );
      this.toggleDropdown();
    },
    /**
     * nhân bản
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    async duplicateEmployee() {
      this.toggleDropdown();
      this.showLoading(true);
      let res = await employeeService.getNewCode();
      this.showLoading(false);
      const employeeValues = Object.values(this.data);
      let newEmployeeData = new EmployeeClass(...employeeValues);
      newEmployeeData.EmployeeCode = res.content;
      this.newForm(formTypes.new, newEmployeeData);
    },
  },
  data() {
    return {
      dropdownTop: 0,
      dropdownContent: [
        {
          data: resource.tableRowFunctions.duplicate,
          handler: this.duplicateEmployee,
        },
        {
          data: resource.tableRowFunctions.delete,
          handler: this.confirmDeleteEmployee,
        },
        {
          data: resource.tableRowFunctions.use,
          handler: this.notDevelopedFunction,
        },
      ],
      isDropdownSelecting: false,
    };
  },
};
</script>
<style scoped>
@import url("../../assets/css/table/tablerow.css");
</style>