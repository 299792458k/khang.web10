<template>
  <div class="wrapper" ref="wrapper" :class="size">
    <div class="label">
      <h3 class="title">{{ label }}</h3>
      <div class="required" v-show="required">*</div>
    </div>
    <input
      class="input"
      :disabled="disabled === 1"
      :type="type"
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
      @keydown="handleKeydown"
      @blur="handleBlur"
      ref="input"
      :tabindex="tabindex"
      placeholder="dd/mm/yyyy"
    />
    <input type="text" class="hidden-input" />
    <span class="icon input-date-icon" @click="toggleCalender"></span>
    <div class="errorMessage" ref="errorMessage"></div>
    <div class="calender" v-show="calenderShow">
      <div class="calender-header">
        <div
          class="calender-header-left"
          @click="toggleChooseYear"
          v-if="!selectingYear && !selectingMonth"
        >
          <div class="calender-header-time">Tháng {{ month }}, {{ year }}</div>
          <div class="icon icon-arrow-down"></div>
        </div>
        <div class="calender-header-left choose-year" v-else>
          <div
            class="icon icon-arrow-down prev"
            @click="changeYearRange(1)"
          ></div>
          <div v-if="!selectedYear">
            {{ this.yearRangeEnd - chooseCells + 1 }} -
            {{ this.yearRangeEnd }}
          </div>
          <div v-else>{{ this.selectedYear }}</div>
          <div
            class="icon icon-arrow-down next"
            @click="changeYearRange(-1)"
          ></div>
        </div>
        <div class="calender-pick-year" v-show="selectingYear">
          <div class="pick-year-row" v-for="i in chooseRows" :key="i">
            <div
              class="pick-year-item"
              @click="chooseYear(i, j)"
              v-for="j in chooseCols"
              :key="j"
            >
              {{ this.yearRangeEnd - chooseCells + i * j }}
            </div>
          </div>
          <div class="pick-year-close" @click="toggleCalender()">Huỷ bỏ</div>
        </div>
        <div class="calender-pick-year" v-show="selectingMonth">
          <div class="pick-year-row" v-for="i in chooseRows" :key="i">
            <div
              class="pick-year-item"
              v-for="j in chooseCols"
              :key="j"
              @click="chooseMonth(i, j)"
            >
              Thg {{ (i - 1) * chooseCols + j }}
            </div>
          </div>
          <div class="pick-year-close" @click="toggleCalender()">Huỷ bỏ</div>
        </div>

        <div class="calender-header-right">
          <div class="icon icon-left" @click="handlePrevMonth"></div>
          <div class="icon icon-right" @click="handleNextMonth"></div>
        </div>
      </div>
      <div class="calender-body">
        <table class="calender-table">
          <thead class="calender-days">
            <tr>
              <th class="calender-day">T2</th>
              <th class="calender-day">T3</th>
              <th class="calender-day">T4</th>
              <th class="calender-day">T5</th>
              <th class="calender-day">T6</th>
              <th class="calender-day">T7</th>
              <th class="calender-day">CN</th>
            </tr>
          </thead>
          <tbody class="calender-dates">
            <tr
              class="calender-dates-row"
              v-for="rowIndex in calender.length"
              :key="rowIndex"
            >
              <td
                class="calender-dates-item"
                v-for="itemIndex in weekDays"
                :key="itemIndex"
                :class="{
                  'no-value': !calender[rowIndex - 1][itemIndex - 1],
                  active: calender[rowIndex - 1][itemIndex - 1] === day,
                }"
                @click="handleChooseDate(calender[rowIndex - 1][itemIndex - 1])"
              >
                {{ calender[rowIndex - 1][itemIndex - 1] }}
              </td>
            </tr>
            <!-- <td class="calender-gut"></td> -->
          </tbody>
        </table>
      </div>
      <div
        class="calender-footer"
        @click="
          () => {
            getCurrentDate();
            this.updateModelValue();
            this.toggleCalender();
          }
        "
      >
        Hôm nay
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDatesOfMonth,
  checkValidDate,
} from "@/assets/js/helpers/dateHelper.js";
import {
  calender,
  keyboardCodes,
  inputDate,
  dialogStatus,
} from "@/assets/js/constants/constants.js";
import * as resource from "@/assets/resource/resourceVn";
export default {
  inject: ["createDialog"],
  name: "InputComponent",
  props: [
    "disabled",
    "label",
    "type",
    "size",
    "required",
    "modelValue",
    "tabindex",
  ],
  emits: ["update:modelValue"],
  // khởi tạo lịch
  created() {
    this.getCurrentDate();
    this.calender = getDatesOfMonth(this.year, this.month);
    console.log(calender);
    // render lại lịch khi tháng/năm thay đổi
    this.$watch(
      () => ({
        month: this.month,
        year: this.year,
      }),
      (data) => {
        this.calender = getDatesOfMonth(data.year, data.month);
        this.day = undefined;
      }
    );
  },
  methods: {
    /**
     * chọn năm
     * @param {row} hàng
     * @param {col} cột
     * Created By Khang
     */
    chooseYear(row, col) {
      this.selectedYear = this.yearRangeEnd - this.chooseCells + row * col;
      this.toggleChooseYear(false);
      this.toggleChooseMonth(true);
    },
    /**
     * chọn tháng
     * @param {row} hàng
     * @param {col} cột
     * Created By Khang
     */
    chooseMonth(row, col) {
      this.selectedMonth = (row - 1) * inputDate.chooseYearCols + col;
      this.year = this.selectedYear;
      this.month = this.selectedMonth;
      this.toggleChooseMonth(false);
    },
    /**
     * đóng mở chọn năm
     * @param {value} true: mở, false: đóng
     * Created By Khang
     */
    toggleChooseYear(value) {
      console.log(this.selectingYear);
      if (value) {
        this.selectingYear = value;
      } else {
        this.selectingYear = !this.selectingYear;
      }
    },
    /**
     * đóng mở chọn tháng
     * @param {value} true: mở, false: đóng
     * Created By Khang
     */
    toggleChooseMonth(value) {
      console.log(this.selectingMonth);
      if (value) {
        this.selectingMonth = value;
      } else {
        this.selectingMonth = !this.selectingMonth;
      }
    },
    /**
     * thay đổi khoảng năm đang chọn
     * @param {value} 1: tăng, -1: giảm
     * Created By Khang
     */
    changeYearRange(value) {
      this.yearRangeEnd += inputDate.numOfYearToSelect * value;
    },
    /**
     * toggle lịch chọn
     * Created By Khang
     */
    toggleCalender() {
      this.calenderShow = !this.calenderShow;
      this.selectingYear = false;
      this.selectedYear = null;
      this.selectingMonth = false;
      this.selectedMonth = null;
    },
    /**
     * tháng trước
     * Created By Khang
     */
    handlePrevMonth() {
      // tháng 1 thì lùi về 1 năm
      if (this.month === calender.firstMonth) {
        this.year = this.year - 1;
        this.month = calender.lastMonth;
      } else {
        this.month = this.month - 1;
      }
    },
    /**
     * tháng sau
     * Created By Khang
     */
    handleNextMonth() {
      if (this.month === calender.lastMonth) {
        this.year = this.year + 1;
        this.month = calender.firstMonth;
      } else {
        this.month = this.month + 1;
      }
    },
    /**
     * chọn ngày
     * @param {value} ngày chọn
     * Created By Khang
     */
    handleChooseDate(value) {
      this.day = value;
      const dateValue = this.refineDate();
      if (checkValidDate(`${dateValue.day}${dateValue.month}${this.year}`)) {
        this.updateModelValue();
        this.toggleCalender();
      } else {
        this.getCurrentDate();
        this.createDialog(
          resource.dialogTitles.invalidDate,
          dialogStatus.warning,
          resource.dialogMessage.exceedDate
        );
      }
    },
    /**
     * thêm tiền số 0 nếu ngày/tháng có 1 chữ số
     * Created By Khang
     */
    refineDate() {
      let dateValue = {
        day: this.day,
        month: this.month,
        year: this.year,
      };
      // nếu có 1 chữ số thì thêm 0 ở trước
      if (this.day < 10) {
        dateValue.day = "0" + this.day;
      }
      if (this.month < 10) {
        dateValue.month = "0" + this.month;
      }
      return dateValue;
    },
    /**
     * binding ngày
     * Created By Khang
     */
    updateModelValue() {
      let dateValue = this.refineDate();
      this.$emit(
        "update:modelValue",
        `${dateValue.day}/${dateValue.month}/${this.year}`
      );
    },
    /**
     * lấy ngày hiện tại
     * Created By Khang
     */
    getCurrentDate() {
      const currDate = new Date();
      this.day = currDate.getDate();
      this.month = currDate.getMonth() + 1;
      this.year = currDate.getFullYear();
    },

    /**
     * Gán các eventlistener cho input khi focus
     * Created By Khang
     */
    handleFocus() {
      const inputEle = this.$refs.input;
      window.addEventListener("keydown", this.selectAll);
      if (!inputEle.value) {
        inputEle.value = this.defaultString;
      }
      inputEle.select();
    },
    /**
     * chọn tất cả trong input
     * @param {e} event
     * Created By Khang
     */
    selectAll(e) {
      if (e.ctrlKey && e.code === keyboardCodes.keyA) {
        this.$refs.input.select();
      }
    },
    /**
     * Xoá các eventListener
     * Created By Khang
     */
    handleBlur() {
      window.removeEventListener("keydown", this.selectAll);
      const isValid = this.validateInputValue();
      if (!isValid) {
        this.$refs.input.value = "";
        this.$emit("update:modelValue", null);
      }
    },
    /**
     * kiểm tra ngày có hợp lệ
     * Created By Khang
     */
    validateInputValue() {
      let isValid = true;
      const inputEle = this.$refs.input;
      if (
        inputEle.value.replaceAll("/", "").replaceAll("_", "").length <
        inputDate.length
      ) {
        isValid = false;
      }
      return isValid;
    },
    /**
     * chỉ cho nhập ký tự số, các phím chức năng
     * @param {e} event
     * Created By Khang
     */
    handleKeydown(e) {
      if (
        e.keyCode > inputDate.maxValidKeyCode &&
        !e.code.includes(inputDate.numpadKey)
      ) {
        e.preventDefault();
      }
      if (
        // 2: 2 dấu "/"
        this.$refs.input.value.length == inputDate.length + 2 &&
        e.keyCode > inputDate.minValidKeyCode &&
        e.keyCode <= inputDate.maxValidKeyCode &&
        e.code.includes(inputDate.numpadKey)
      ) {
        e.preventDefault();
      }
    },
    /**
     * hàm xử lý khi nhập ngày thủ công
     * Created By Khang
     */
    handleInput() {
      const inputEle = this.$refs.input;
      // Loại bỏ các ký tự '_'
      let dateString = inputEle.value.replaceAll("_", "");
      // Loại bỏ các ký tự '/', được input string: chỉ gồm các chữ số
      // VD: 21/12/2001 -> 21122001
      let inputString = dateString.replaceAll("/", "");
      // trường hợp xoá ký tự (21/08/____ + backSpace => 21/0_/____)
      if (dateString.length - inputString.length < 2) {
        inputString = inputString.slice(0, inputString.length - 1);
      }
      // nhập số cuối cùng thì validate
      if (inputString.length === inputDate.length) {
        if (checkValidDate(inputString)) {
          console.log(dateString);
          this.$emit("update:modelValue", dateString);
        } else {
          inputString = inputString.slice(0, inputString.length - 1);
        }
      } else if (inputString.length > inputDate.length) {
        inputString = inputString.slice(0, inputString.length - 1);
      }
      const dateStringLength = inputString.length;
      // vị trí để set con trỏ chuột
      let pointerPosition;
      // dựa vào độ dài của inputString để tạo ra chuỗi hoàn chỉnh
      if (dateStringLength < 2) {
        pointerPosition = dateStringLength;
        inputEle.value =
          inputString + this.defaultString.slice(inputString.length);
      } else if (dateStringLength < 4) {
        pointerPosition = dateStringLength + 1;
        inputEle.value =
          inputString.slice(0, 2) +
          "/" +
          inputString.slice(2) +
          this.defaultString.slice(pointerPosition);
      } else {
        pointerPosition = dateStringLength + 2;
        inputEle.value =
          inputString.slice(0, 2) +
          "/" +
          inputString.slice(2, 4) +
          "/" +
          inputString.slice(4) +
          this.defaultString.slice(pointerPosition);
      }
      // set vị trí con trỏ chuột
      inputEle.setSelectionRange(pointerPosition, pointerPosition);
    },
  },
  mounted() {
    let date = new Date(Date.now());
    this.yearRangeEnd = date.getFullYear();
  },
  data() {
    return {
      day: 0,
      month: 0,
      year: 0,
      weekDays: calender.weekDays,
      calender: [],
      calenderShow: false,
      defaultString: "__/__/____",

      selectingYear: false,
      selectedYear: null,
      selectingMonth: false,
      selectedMonth: null,
      yearRangeEnd: null,
      chooseRows: inputDate.chooseYearRows,
      chooseCols: inputDate.chooseYearCols,
      chooseCells: inputDate.numOfYearToSelect,
    };
  },
};
</script>
<style scoped>
@import url("../../assets/css/form/inputdate.css");
</style>