<template>
  <div class="form-overlay">
    <div
      class="form-content"
      ref="form"
      @mousedown="startDrag"
      @mouseup="endDrag"
    >
      <div class="form-header">
        <div class="header-left" @mousedown.stop>
          <h2 v-if="type === formTypes.modify">Sửa thông tin nhân viên</h2>
          <h2 v-else>Thông tin nhân viên</h2>
          <InputCheckbox
            label="Là khách hàng"
            :modelValue="employeeRolesArr"
            @update:modelValue="
              (isCheck, data) => updateEmployeeRole(isCheck, data)
            "
            :checkboxValue="employeeRoles.user"
          ></InputCheckbox>
          <InputCheckbox
            label="Là nhà cung cấp"
            :modelValue="employeeRolesArr"
            @update:modelValue="
              (isCheck, data) => updateEmployeeRole(isCheck, data)
            "
            :checkboxValue="employeeRoles.provider"
          ></InputCheckbox>
        </div>
        <div class="header-actions" @mousedown.stop>
          <div class="icon icon-infor target-tooltip" @click="notDeveloped">
            <div class="k-tooltip">Hỗ trợ</div>
          </div>
          <div class="icon icon-close target-tooltip" @click="handleClose">
            <div class="k-tooltip">Esc</div>
          </div>
        </div>
      </div>
      <div class="form-body" @mousedown.stop>
        <div class="body-top">
          <div class="body-top--left">
            <div class="form-row">
              <Input
                label="Mã"
                type="text"
                required="true"
                size="small"
                v-model="formData.EmployeeCode"
                ref="firstInput"
                rules="required format:NV\d*\b max:16"
                tabindex="1"
              ></Input>
              <Input
                label="Tên"
                type="text"
                required="true"
                size="medium"
                v-model="formData.FullName"
                ref="nameInput"
                rules="required"
                tabindex="2"
              ></Input>
            </div>
            <div class="form-row">
              <InputSelect
                :departments="departmentsData"
                size="large"
                :modelValue="formData.DepartmentName"
                @update:modelValue="(index) => handleChooseDepartment(index)"
                label="Đơn vị"
                required="true"
                type="text"
                ref="departmentInput"
                rules="required"
                tabindex="3"
              ></InputSelect>
            </div>
            <div class="form-row">
              <Input
                size="large"
                v-model="formData.PositionName"
                label="Chức danh"
                :required="false"
                type="text"
                ref="positionInput"
                tabindex="4"
              ></Input>
            </div>
          </div>
          <div class="body-top--right">
            <div class="form-row">
              <InputDate
                size="small"
                v-model="formData.DateOfBirth"
                label="Ngày sinh"
                :required="false"
                type="text"
                ref="dobInput"
                tabindex="5"
              >
              </InputDate>

              <InputRadioGroup
                size="small"
                v-model="formData.Gender"
                label="Giới tính"
                :required="false"
                type="gender"
                ref="genderInput"
                tabindex="6"
                :valueEnums="genderEnums"
                :valueResource="genderResource"
              ></InputRadioGroup>
            </div>
            <div class="form-row">
              <Input
                size="medium"
                v-model="formData.IdentityNumber"
                label="Số CMND"
                :required="false"
                tooltip="Số chứng minh nhân dân"
                type="text"
                ref="identityInput"
                tabindex="7"
              ></Input>
              <InputDate
                size="small"
                v-model="formData.IdentityDate"
                label="Ngày cấp"
                :required="false"
                type="text"
                ref="identityDateInput"
                tabindex="8"
              ></InputDate>
            </div>
            <div class="form-row">
              <Input
                size="large"
                v-model="formData.IdentityPlace"
                label="Nơi cấp"
                :required="false"
                type="text"
                ref="identityPlace"
                tabindex="9"
              ></Input>
            </div>
          </div>
        </div>
        <div class="body-bottom">
          <div class="form-row">
            <Input
              size="large"
              v-model="formData.Address"
              label="Địa chỉ"
              :required="false"
              type="text"
              ref="addressInput"
              tabindex="10"
            ></Input>
          </div>
          <div class="form-row">
            <Input
              size="xsmall"
              v-model="formData.PhoneNumber"
              label="ĐT di động"
              tooltip="Điện thoại di động"
              :required="false"
              type="text"
              ref="phoneInput"
              tabindex="11"
            ></Input>
            <Input
              size="xsmall"
              v-model="formData.TablePhoneNumber"
              label="ĐT cố định"
              tooltip="Điện thoại cố định"
              :required="false"
              type="text"
              ref="tablePhoneInput"
              tabindex="12"
            ></Input>
            <Input
              size="xsmall"
              v-model="formData.Email"
              label="Email"
              :required="false"
              type="text"
              ref="emailInput"
              tabindex="13"
            ></Input>
          </div>
          <div class="form-row">
            <Input
              size="xsmall"
              v-model="formData.BankAccountNumber"
              label="Tài khoản ngân hàng"
              :required="false"
              type="text"
              ref="bankNumberInput"
              tabindex="14"
            ></Input>
            <Input
              size="xsmall"
              v-model="formData.BankName"
              label="Tên ngân hàng"
              :required="false"
              type="text"
              ref="bankNameInput"
              tabindex="15"
            ></Input>
            <Input
              size="xsmall"
              v-model="formData.BankPlace"
              label="Chi nhánh"
              :required="false"
              type="text"
              ref="bankPlaceInput"
              tabindex="16"
            ></Input>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer--left" @mousedown.stop>
          <div tabindex="17" @keypress.enter="toggleForm">
            <Button content="Huỷ" type="" @click="toggleForm(false)"></Button>
          </div>
        </div>
        <div class="footer--right" @mousedown.stop>
          <div
            tabindex="18"
            class="form-save target-tooltip"
            @keypress.enter="handleSubmit"
          >
            <Button content="Cất" type="" @click="handleSubmit"> </Button>
            <div class="k-tooltip">Ctrl S</div>
          </div>
          <div
            tabindex="19"
            class="target-tooltip"
            @keypress.enter="handleSubmit('saveAndAdd')"
          >
            <Button
              content="Cất và Thêm"
              type="btn--main"
              @click="handleSubmit('saveAndAdd')"
            ></Button>
            <div class="k-tooltip">Ctrl Shift S</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// service
import * as employeeService from "@/apiServices/employeeService";
import * as departmentService from "@/apiServices/departmentService";
// components
import Button from "../../button/Button.vue";
import InputCheckbox from "@/components/form/InputCheckbox.vue";
import Input from "../InputElement.vue";
import InputRadioGroup from "../InputRadioGroup.vue";
import InputSelect from "../InputSelect.vue";
import InputDate from "../InputDate.vue";
//js
import {
  formTypes,
  dialogStatus,
  dialogType,
  formConstant,
  submitType,
  keyboardCodes,
} from "../../../assets/js/constants/constants.js";
import {
  convertToServerDate,
  convertToVNDate,
} from "@/assets/js/helpers/dateHelper.js";
import * as resource from "@/assets/resource/resourceVn.js";
import * as enums from "@/assets/js/enums/enums";
// import Validator from "../../assets/js/validation/validator.js";
import Validator from "@/assets/js/validation/validator.js";
import EmployeeClass from "../../../assets/js/class/employeeClass.js";
import DepartmentClass from "@/assets/js/class/departmentClass.js";

export default {
  inject: [
    "formShow",
    "toggleForm",
    "showLoading",
    "createDialog",
    "recallApi",
    "newForm",
  ],
  name: "FormElement",
  props: ["type", "initData"],
  mounted() {
    var _this = this;
    // focus vào input đầu tiên
    this.$refs.firstInput.focus();
    // thêm shortcuts
    window.addEventListener("keydown", _this.handleShortcutListener);
  },
  /**
   * focus vào input đầu tiên
   * Created By KhangPC (12/12/2022)
   */
  updated() {
    if (this.gotNewCode) {
      this.$refs.firstInput.focus();
      this.gotNewCode = false;
    }
  },
  /**
   * remove các shortcuts
   * Created By KhangPC (12/12/2022)
   */
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleShortcutListener);
  },
  methods: {
    /**
     * cập nhật employeeRoles
     * @param {isCheck} input check hay không
     * @param {data} value của input
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    updateEmployeeRole(isCheck, data) {
      let index = this.employeeRolesArr.indexOf(data);
      if (index > -1) {
        if (!isCheck) {
          this.employeeRolesArr.splice(index, 1);
        }
      } else {
        if (isCheck) {
          this.employeeRolesArr.push(data);
        }
      }
    },
    /**
     * thêm các phím tắt cho form
     * @param {e} event
     * Created By KhangPC (12/12/2022)
     */
    handleShortcutListener(e) {
      if (e.code === keyboardCodes.escape) {
        this.toggleForm();
      } else if (e.ctrlKey && e.shiftKey && e.code === keyboardCodes.keyS) {
        this.handleSubmit(submitType.saveAndAdd);
      } else if (e.ctrlKey && e.code === keyboardCodes.keyS) {
        e.preventDefault();
        this.handleSubmit();
      }
      // moving by tab shortcut
      if (e.code === keyboardCodes.tab) {
        // 19 là tabindex lớn nhất của form
        if (e.target.getAttribute("tabindex") === "19") {
          e.preventDefault();
          this.$refs.firstInput.focus();
        }
      }
    },
    /**
     * chuc nang chua phat trien
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
     * xử lý đóng form, nếu có dữ liệu thì yêu cầu người dùng xác nhận
     * Created By KhangPC (12/12/2022)
     */
    handleClose() {
      let hasData;
      let formDataNoCode = { ...this.formData };
      formDataNoCode.EmployeeCode = "";
      for (let item in formDataNoCode) {
        if (formDataNoCode[item] !== "" && formDataNoCode[item] !== undefined) {
          hasData = true;
          break;
        }
      }
      if (this.formData.EmployeeCode === "" && !hasData) {
        this.toggleForm();
      } else if (
        hasData &&
        // this.formData.EmployeeCode !== this.originEmployeeCode
        JSON.stringify(this.originData) !== JSON.stringify(this.formData)
      ) {
        this.createDialog(
          resource.dialogTitles.saveChanges,
          dialogStatus.info,
          resource.dialogMessage.confirmDataChanged,
          dialogType.deepConfirm,
          () => {
            this.handleSubmit();
          }
        );
      } else {
        this.toggleForm();
      }
    },
    /**
     * chọn là khách hàng hay nhà cung cấp
     * @param {value} là khách hàng hay nhà cung cấp
     * Created By KhangPC (12/12/2022)
     */
    handleSelectRole(value) {
      this.formData.EmployeeRole = value;
    },
    /**
     * Sự kiện bắt đầu kéo form
     * @param {e} event
     * Created By KhangPC (12/12/2022)
     */
    startDrag(e) {
      this.assignMousePosition(e);
      this.$refs.form.addEventListener("mousemove", this.handleDrag);
    },
    /**
     * kết thúc kéo form
     * Created By KhangPC (12/12/2022)
     */
    endDrag() {
      this.$refs.form.removeEventListener("mousemove", this.handleDrag);
    },
    /**
     * kéo thả form
     * @param {e} event
     * Created By KhangPC (12/12/2022)
     */
    handleDrag(e) {
      // if (e.screenX === 0 && e.screenY === 0) return;
      const formEle = this.$refs.form;
      formEle.style = {
        cursor: "move",
      };
      formEle.style.margin = "unset";
      formEle.style.transform = "unset";

      /**
       * không kéo form ra ngoài màn hình
       */
      let x =
        e.clientX - this.offsetX > formConstant.minX
          ? e.clientX - this.offsetX
          : formConstant.minX;
      x =
        x < window.innerWidth - formConstant.width
          ? x
          : window.innerWidth - formConstant.width;
      if (x < 0) x = 0;
      let y =
        e.clientY - this.offsetY > formConstant.minY
          ? e.clientY - this.offsetY
          : formConstant.minY;
      y =
        y < window.innerHeight - formConstant.height
          ? y
          : window.innerHeight - formConstant.height;
      if (y < 0) y = 0;
      formEle.style.left = x + "px";
      formEle.style.top = y + "px";
    },
    /**
     * gán 2 giá trị offsetX, offsetY ( vị trí của chuột so với form)
     * @param {e} event
     * Created By KhangPC (12/12/2022)
     */
    assignMousePosition(e) {
      var rect = this.$refs.form.getBoundingClientRect();

      this.offsetX = e.clientX - rect.left;
      this.offsetY = e.clientY - rect.top;
    },
    /**
     * hàm submit
     * @param {type} loại form (thêm mới hoắc sửa)
     * Created By KhangPC (12/12/2022)
     */
    async handleSubmit(type) {
      let isFormValid = this.checkFormValid();
      if (!isFormValid) return;
      let employeeData = { ...this.formData };
      console.log(this.employeeRolesArr.join(","));
      employeeData.EmployeeRole = this.employeeRolesArr.join(",");

      // convert to server date
      employeeData = this.convertToServerData(employeeData);
      // trường hợp sửa
      if (this.type === formTypes.modify) {
        await this.submitForm(
          employeeData,
          employeeService.modifyEmployee,
          type,
          enums.httpCode.ok,
          resource.dialogMessage.dataSaved
        );
        // trường hợp thêm mới
      } else {
        await this.submitForm(
          employeeData,
          employeeService.addEmployee,
          type,
          enums.httpCode.created,
          resource.dialogMessage.employeeAdded
        );
      }
    },
    /**
     * hàm submit form
     * @param {formData} dữ liệu gửi đi
     * @param {request} api để submit form
     * @param {type} Cất hoặc Cất và thêm mới
     * @param {successStatus} http code khi thành công
     * @param {dialogSuccessMessage} thông báo khi thành công
     * return
     * Created By Khang (10/12/2022)
     */
    async submitForm(
      formData,
      request,
      type,
      successStatus,
      dialogSuccessMessage
    ) {
      this.showLoading(true);
      const res = await request(formData);
      this.showLoading(false);
      // Thành công
      if (res.status === successStatus) {
        await this.reloadData();
        if (type === submitType.saveAndAdd) {
          this.toggleForm(false);
          this.newForm();
        } else {
          this.toggleForm(false);
          this.createDialog(
            resource.dialogTitles.success,
            dialogStatus.success,
            dialogSuccessMessage
          );
        }
      } else {
        // lỗi trùng mã
        if (res.errorCode === enums.errorCodes.duplicateCode) {
          return this.createDialog(
            resource.dialogTitles.duplicateCode,
            dialogStatus.error,
            resource.errorMessage[this.getErrorNameByCode(res.errorCode)](
              this.formData.EmployeeCode
            )
          );
        }
        // exception
        else if (res.errorCode === enums.errorCodes.exception) {
          return this.createDialog(
            resource.dialogTitles.exception,
            dialogStatus.error,
            resource.errorMessage[this.getErrorNameByCode(res.errorCode)]
          );
        }
      }
    },
    /**
     * lấy tên lỗi từ error enums
     * @param {errorCode} error enum
     * @returns errorName
     * Created By KhangPC (12/12/2022)
     */
    getErrorNameByCode(errorCode) {
      console.log(errorCode);
      let errorName = Object.keys(enums.errorCodes).find(
        (key) => enums.errorCodes[key] === errorCode
      );
      console.log("name: " + errorName);
      return errorName;
    },
    /**
     * Chuyển datetime sang GMT +0
     * @param {data} chuỗi ngày
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    convertToServerData(data) {
      if (data.DateOfBirth) {
        data.DateOfBirth = convertToServerDate(this.formData.DateOfBirth);
      }
      if (data.IdentityDate) {
        data.IdentityDate = convertToServerDate(this.formData.IdentityDate);
      }
      return data;
    },
    /**
     * kiểm tra form hợp lệ
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    checkFormValid() {
      let isFormValid = true;
      let firstErrInput = null;
      let errorArr = [];
      for (let inputRef in this.$refs) {
        if (this.$refs[inputRef] !== this.$refs.form) {
          const res = Validator(this.$refs[inputRef]);
          isFormValid = isFormValid && res.isValid;
          if (!res.isValid) {
            errorArr.push(res.errorMessage);
            if (!firstErrInput) {
              firstErrInput = this.$refs[inputRef];
              console.log(firstErrInput);
            }
          }
        }
      }
      // focus vào ô lỗi đầu tiên
      if (firstErrInput) {
        firstErrInput.focus();
      }
      // thông báo nếu form ko hợp lệ
      if (!isFormValid) {
        this.createDialog(
          resource.dialogTitles.invalidData,
          dialogStatus.error,
          errorArr[0]
        );
      }
      return isFormValid;
    },
    /**
     * call api khi dữ liệu thay đổi
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    async reloadData() {
      await this.recallApi();
      this.toggleForm(false);
    },
    /**
     * chọn phòng ban từ dropdown
     * @param {index} index của phòng ban đã chọn
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleChooseDepartment(index) {
      if (index !== null) {
        this.formData.DepartmentId = this.departmentsData[index].departmentId;
        this.formData.DepartmentCode =
          this.departmentsData[index].departmentCode;
        this.formData.DepartmentName =
          this.departmentsData[index].departmentName;
      } else {
        this.formData.DepartmentId = null;
        this.formData.DepartmentCode = null;
        this.formData.DepartmentName = "";
      }
    },
    getEmployeeRoles() {
      console.log(typeof this.formData.EmployeeRole);
      if (this.formData.EmployeeRole) {
        let arr = this.formData.EmployeeRole.split(",");
        this.employeeRolesArr = arr.map((item) => +item);
        console.log("roles: " + JSON.stringify(this.employeeRolesArr));
      }
    },
  },

  components: {
    Button,
    Input,
    InputRadioGroup,
    InputSelect,
    InputDate,
    InputCheckbox,
  },
  async created() {
    // gán dữ liệu khởi tạo
    this.formData = this.initData ? this.initData : new EmployeeClass();
    console.log("formData: " + JSON.stringify(this.formData));
    // lấy employeeRoles
    this.employeeRoles = { ...enums.employeeRole };
    this.getEmployeeRoles();
    // lấy formtypes
    this.formTypes = { ...formTypes };

    // lấy employeeGenders
    this.genderEnums = { ...enums.gender };
    this.genderResource = { ...resource.gender };

    // chuyển đổi dữ liệu ngày tháng
    if (this.formData.DateOfBirth) {
      this.formData.DateOfBirth = convertToVNDate(this.formData.DateOfBirth);
    }
    if (this.formData.IdentityDate) {
      this.formData.IdentityDate = convertToVNDate(this.formData.IdentityDate);
    }
    // lấy danh sách phòng ban
    this.showLoading(true);
    const departmentsDataObj = await departmentService.getAllDepartments();
    const departmentsData = departmentsDataObj.content;
    for (let i = 0; i < departmentsData.length; i++) {
      this.departmentsData.push(
        new DepartmentClass(
          departmentsData[i].departmentId,
          departmentsData[i].departmentCode,
          departmentsData[i].departmentName
        )
      );
    }
    // lưu giá trị khởi tạo của form để thông báo dữ liệu thay đổi khi đóng form
    if (this.type === formTypes.new) {
      const newCodeResObj = await employeeService.getNewCode();
      this.formData.EmployeeCode = newCodeResObj.content;
      this.gotNewCode = true;
    }
    this.originData = { ...this.formData };
    this.showLoading(false);
  },
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      formData: {},
      originData: null,
      departmentsData: [],
      positionsData: [],
      employeeRoles: {},
      employeeRolesArr: [],
      formTypes: [],
      genderEnums: {},
      genderResource: {},
      gotNewCode: false,
    };
  },
};
</script>
<style scoped>
@import url("@/assets/css/form/form.css");
</style>
