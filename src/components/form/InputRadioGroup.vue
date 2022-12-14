<template>
  <div class="input-radio-wrapper" :class="size">
    <div class="label">
      <h3 class="title">{{ label }}</h3>
      <div class="required" v-show="required">*</div>
    </div>
    <div class="radios">
      <InputRadio
        v-for="item in Object.keys(valueEnums)"
        :key="item"
        :id="item"
        :label="valueResource[item]"
        :inputValue="valueEnums[item]"
        v-model="value"
        :tabindex="tabindex"
      >
      </InputRadio>
    </div>
    <div class="errorMessage" ref="errorMessage"></div>
  </div>
</template>
<script>
import InputRadio from "@/components/form/InputRadio.vue";

export default {
  name: "InputRadioGroup",
  props: [
    "label",
    "size",
    "type",
    "required",
    "modelValue",
    "valueEnums",
    "valueResource",
    "tabindex",
  ],
  emits: ["update:modelValue"],
  components: {
    InputRadio,
  },
  methods: {
    /**
     * Watch value để update valuevalue vào form
     * @returns null
     * Created By KhangPC (12/12/2022)
     */
  },
  created() {
    this.value = this.modelValue;
    this.$watch("value", () => {
      this.$emit("update:modelValue", this.value);
    });
  },
  data() {
    return {
      value: null,
    };
  },
};
</script>
<style scoped>
@import url("../../assets/css/form/inputradio.css");
</style>