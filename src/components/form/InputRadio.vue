<template>
  <div class="radio-item">
    <input
      type="radio"
      ref="input"
      :id="id"
      :checked="modelValue !== null && inputValue === modelValue"
      :tabindex="tabindex"
      @input="updateValue"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>
<script>
export default {
  name: "InputRadio",
  props: ["id", "label", "inputValue", "modelValue", "tabindex"],
  methods: {
    /**
     * hàm update giá trị của input
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    updateValue() {
      if (this.$refs.input.checked) {
        this.$emit("update:modelValue", this.inputValue);
      } else {
        this.$emit("update:modelValue", null);
      }
    },
  },
};
</script>
<style scoped>
</style>