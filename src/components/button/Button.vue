<template>
  <div class="btn" :class="buttonClass">{{ content }}</div>
</template>
<script>
export default {
  name: "ButtonComponent",
  props: ["content", "type"],
  data() {
    return {
      buttonClass: this.type,
    };
  },
};
</script>
<style scoped>
</style>