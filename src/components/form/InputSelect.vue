<template>
  <div class="wrapper" ref="wrapper" :class="size">
    <div class="label">
      <h3 class="title">{{ label }}</h3>
      <div class="required" v-show="required">*</div>
    </div>
    <input
      class="input"
      :type="type"
      @input="handleInput"
      @keydown="handleSelectByArrowKeys"
      :value="departmentSearch"
      ref="input"
      @focus="handleFocus"
      @blur="handleBlur"
      :tabindex="tabindex"
    />
    <div class="icon input-icon" @click="toggleSelect"></div>
    <div class="selections" v-show="selectShow">
      <div class="select-item select-header">
        <div class="select-item-left">Mã đơn vị</div>
        <div class="select-item-right">Tên đơn vị</div>
      </div>
      <div
        class="select-item"
        v-for="(item, index) in departments"
        :class="index === selectingIndex ? 'active' : ''"
        :key="item"
        ref="items"
        @mousedown="
          () => {
            handleSelect(index);
            toggleSelect();
          }
        "
      >
        <div class="select-item-left">
          {{ departments[index].departmentCode }}
        </div>
        <div class="select-item-right">
          {{ departments[index].departmentName }}
        </div>
      </div>
    </div>
    <div class="errorMessage" ref="errorMessage"></div>
  </div>
</template>
<script>
// js
import { keyCodes } from "@/assets/js/constants/constants.js";
export default {
  name: "InputSelect",
  emits: ["update:modelValue"],
  props: [
    "departments",
    "label",
    "type",
    "size",
    "required",
    "modelValue",
    "tabindex",
  ],
  /**
   * khi chọn phòng ban thì ẩn error đi
   * @returns null
   * Created By KhangPC (12/12/2022)
   */
  created() {
    this.departmentSearch = this.modelValue ? this.modelValue : "";
    this.$watch("departmentSearch", () => {
      if (this.departmentSearch) {
        this.$refs.wrapper.classList.remove("error");
        this.$refs.errorMessage.innerHTML = "";
      }
    });
  },
  methods: {
    focus() {
      this.$refs.input.focus();
      // this.$refs.input.select();
    },
    /**
     * chọn phòng ban bằng arrow keys
     * @param {e} event keydown
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleSelectByArrowKeys(e) {
      const totalDepartments = this.departments.length;
      switch (e.keyCode) {
        case keyCodes.arrowUp:
          if (this.selectingIndex === null) {
            this.selectingIndex = 0;
          } else if (this.selectingIndex === 0) {
            this.selectingIndex = totalDepartments - 1;
          } else {
            this.selectingIndex = this.selectingIndex - 1;
          }
          break;
        case keyCodes.arrowDown:
          console.log("down");
          if (this.selectingIndex === null) {
            this.selectingIndex = 0;
          } else if (this.selectingIndex === totalDepartments - 1) {
            this.selectingIndex = 0;
          } else {
            this.selectingIndex = this.selectingIndex + 1;
          }
          break;
        case keyCodes.enter:
          if (this.selectingIndex !== null && this.selectShow) {
            this.handleSelect(this.selectingIndex);
            this.toggleSelect();
          }
          break;
      }
    },
    /**
     * khi blur khỏi input thì kiểm tra xem giá trị nhập có thuộc 1 trong các lựa chọn
     * @param {e} event blur
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleBlur(e) {
      this.selectShow = false;
      console.log(e);
      let isValidInput = false;
      for (let i = 0; i < this.departments.length; i++) {
        if (
          this.departments[i].departmentName.toLowerCase() ===
          e.target.value.toLowerCase()
        ) {
          isValidInput = true;
          break;
        }
      }
      if (e.target.value === "") {
        this.$emit("update:modelValue", null);
      }
      if (!isValidInput) {
        this.departmentSearch = "";
      }
    },
    /**
     * focus vào input thì hiện bảng chọn
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleFocus() {
      this.selectShow = true;
    },
    /**
     * xử lý khi người dùng nhập input phòng ban
     * @param {e} event input
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleInput(e) {
      this.selectShow = true;
      this.departmentSearch = e.target.value;
      console.log(this.departmentSearch);
      for (let i = 0; i < this.departments.length; i++) {
        if (
          this.departments[i].departmentName
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          this.selectingIndex = i;
          break;
        }
      }
    },
    /**
     * đóng/mở selections
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    toggleSelect() {
      this.selectShow = !this.selectShow;
    },
    /**
     * chọn phòng ban
     * @param {index} index của phòng ban được chọn
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleSelect(index) {
      this.selectingIndex = index;
      this.departmentSearch = this.departments[index].departmentName;
      this.$emit("update:modelValue", index);
    },
  },
  data() {
    return {
      departmentSearch: "",
      selectShow: false,
      selectingIndex: null,
    };
  },
};
</script>
<style scoped>
@import url("../../assets/css/form/inputselect.css");
</style>