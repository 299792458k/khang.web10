<template>
  <div v-show="show" class="dropdown-wrapper">
    <div v-for="item in content" :key="item">
      <Item :content="item"></Item>
    </div>
  </div>
</template>
<script>
import Item from "./DropdownItem.vue";
export default {
  name: "dropdownWrapper",
  props: ["show", "content"],
  data() {
    return {};
  },
  components: {
    Item,
  },
};
</script>
<style scoped>
@import url("../../assets/css/dropdown/dropdown.css");
</style>