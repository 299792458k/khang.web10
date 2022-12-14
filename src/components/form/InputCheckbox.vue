<template>
  <div class="checkbox">
    <input
      type="checkbox"
      ref="input"
      :checked="checked"
      :value="modelValue"
      @input="updateValue"
      :id="'employeeRole' + checkboxValue"
    />
    <label :for="'employeeRole' + checkboxValue"> {{ label }} </label>
  </div>
</template>
<script>
export default {
  name: "InputCheckbox",
  props: ["label", "modelValue", "checkboxValue"],
  emits: ["update:modelValue"],
  computed: {
    /**
     * nếu mảng values chứa giá trị checkboxValue thì checked = true
     * Created By KhangPC (12/12/2022)
     */
    checked() {
      let index = this.modelValue.indexOf(this.checkboxValue);
      if (index >= 0) return true;
      else return false;
    },
  },
  methods: {
    /**
     * hàm update giá trị của input
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    updateValue() {
      console.log(this.checkboxValue);
      if (this.$refs.input.checked) {
        this.$emit("update:modelValue", true, this.checkboxValue);
      } else {
        this.$emit("update:modelValue", false, this.checkboxValue);
      }
    },
  },
};
</script>
<style scoped>
</style>