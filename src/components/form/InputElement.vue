<template>
  <div class="wrapper" ref="wrapper" :class="size">
    <div class="label">
      <h3 class="title" :class="tooltip ? 'target-tooltip' : ''">
        {{ label }}
        <div v-if="tooltip" class="k-tooltip">{{ tooltip }}</div>
      </h3>
      <div class="required" v-show="required">*</div>
    </div>
    <input
      class="input"
      :disabled="disabled === 1"
      :type="type"
      :value="modelValue"
      @input="
        (e) => {
          this.$refs.wrapper.classList.remove('error');
          this.$refs.errorMessage.innerHTML = '';
          this.$emit('update:modelValue', e.target.value);
        }
      "
      @keydown="handleKeyDown"
      ref="input"
      :tabindex="tabindex"
    />
    <div class="errorMessage" ref="errorMessage"></div>
  </div>
</template>
<script>
export default {
  name: "InputComponent",
  props: [
    "disabled",
    "label",
    "type",
    "size",
    "required",
    "modelValue",
    "tabindex",
    "tooltip",
  ],
  emits: ["update:modelValue"],
  methods: {
    /**
     * focus và select
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    focus() {
      this.$refs.input.focus();
      this.$refs.input.select();
    },
    /**
     * trim dữ liệu nhập
     * @param {e} event keydown
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
    handleKeyDown(e) {
      if (this.$refs.input.value === "" && e.code === "Space") {
        e.preventDefault();
      }
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
@import url("../../assets/css/form/inputelement.css");
</style>