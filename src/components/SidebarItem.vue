<template>
  <div class="sidebar-item-wrapper">
    <a class="sidebar-item">
      <slot></slot>
      <div class="sidebar-item--name">
        {{ itemName }}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: ["itemName"],
};
</script>

<style scoped>
@import url("../assets/css/sidebar/sidebaritem.css");
</style>