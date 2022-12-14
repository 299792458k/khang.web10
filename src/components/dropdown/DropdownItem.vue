<template>
  <div class="item" @click="content.handler">{{ content.data }}</div>
</template>
<script>
export default {
  name: "dropdownItem",
  props: ["content"],
};
</script>
<style scoped>
@import url("../../assets/css/dropdown/dropdownitem.css");
</style>