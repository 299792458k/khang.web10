<template>
  <div class="container">
    <Sidebar></Sidebar>
    <div class="body">
      <Header></Header>
      <Content :isDataChanged="isDataChanged" />
    </div>
    <vue-element-loading :active="isLoading" spinner="bar-fade-scale" />
  </div>
  <Dialog
    v-if="isDialogShowing"
    :title="dialogTitle"
    :status="dialogStatus"
    :content="dialogContent"
    :type="dialogType"
    :handler="dialogHandler"
  ></Dialog>
  <Form v-if="isFormShow" :initData="formData" :type="formType"></Form>
</template>

<script>
import VueElementLoading from "vue-element-loading";

//js
import { formTypes, keyboardCodes } from "@/assets/js/constants/constants.js";
import EmployeeClass from "@/assets/js/class/employeeClass";

import Sidebar from "./layout/TheSidebar.vue";
import Header from "./layout/TheHeader.vue";
import Content from "./layout/TheContent.vue";
import Dialog from "./components/dialog/Dialog.vue";
import Form from "@/components/form/employee/EmployeeForm.vue";
import { computed } from "@vue/runtime-core";

export default {
  name: "App",
  created() {
    var _this = this;
    // Tạo các keyboard shortcuts
    window.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.code === keyboardCodes.digit1) {
        _this.newForm();
        e.preventDefault();
      }
    });
  },
  methods: {
    /**
     * mask vào toàn bộ trang
     * @param {value} true: hiện loading, false: ẩn loading
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    showLoading(value) {
      this.isLoading = value;
    },
    /**
     * chỉ mask vào content của table
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    recallApi() {
      this.isDataChanged = !this.isDataChanged;
    },
    /**
     * set ẩn hiện loading ở table
     * @param {value} true: hiện, false: ẩn
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    showLoadingTable(value) {
      this.isLoadingTableContent = value;
    },
    /**
     * tạo mới dialog
     * @param {status} trạng thái
     * @param {content} nội dung
     * @param {type} loại (thường hoặc confirm)
     * @param {handler} hàm xử lý cho type confirm
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    createDialog(title, status, content, type = null, handler = null) {
      this.dialogTitle = title;
      if (status) {
        this.dialogStatus = status;
      }
      if (content) {
        this.dialogContent = content;
      }
      this.dialogType = type;
      this.dialogHandler = handler;
      this.toggleDialog();
    },
    /**
     * đóng mở dialog
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    toggleDialog() {
      this.isDialogShowing = !this.isDialogShowing;
    },
    /**
     * đóng mở form
     * @param {value} true: mở, false: đóng
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    toggleForm(value) {
      if (value !== undefined && value !== null) {
        this.isFormShow = value;
        console.log("show: " + this.isFormShow);
      } else {
        this.isFormShow = !this.isFormShow;
      }
    },
    /**
     * tạo mới form
     * @param {type} loại
     * @param {data} nội dung
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    newForm(type, data) {
      this.formType = type ? type : formTypes.new;
      this.formData = data ? data : new EmployeeClass();
      this.isFormShow = true;
    },
  },
  components: {
    Sidebar,
    Header,
    Content,
    Dialog,
    VueElementLoading,
    Form,
  },
  data() {
    return {
      isLoading: false,
      isDataChanged: false,
      // xử lý dialog
      dialogTitle: "",
      dialogStatus: "",
      dialogContent: "",
      dialogType: "",
      dialogHandler: null,
      isDialogShowing: false,
      // xử lý form
      isFormShow: false,
      formType: null,
      formData: null,
      isLoadingTableContent: false,
    };
  },
  provide() {
    return {
      dialogShowing: computed(() => this.isDialogShowing),
      toggleDialog: this.toggleDialog,
      createDialog: this.createDialog,

      formShow: computed(() => this.isFormShow),
      toggleForm: this.toggleForm,
      newForm: this.newForm,

      isDataChanged: this.isDataChanged,
      recallApi: this.recallApi,
      isLoadingTableContent: computed(() => this.isLoadingTableContent),
      showLoadingTable: this.showLoadingTable,
      isLoading: this.isLoading,
      showLoading: this.showLoading,
    };
  },
};
</script>

<style>
@import url(./assets/css/main.css);
@import url(./assets/css/base/base.css);
@import url(./assets/css/base/button.css);
@import url(./assets/css/base/dialog.css);
@import url(./assets/css/base/dropdown.css);
@import url(./assets/css/base/table.css);
@import url(./assets/css/base/icon.css);
</style>
