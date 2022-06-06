<template>
  <span class="tag-label">
    <slot />
  </span>
</template>

<script>
  export default {
    name: "TagLabel"
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/variables/_colors.scss";
  @import "@/styles/variables/_fonts.scss";

  .tag-label {
    color: $light-gray;
    font-family: "Arvo", serif;
    font-weight: $bold-weight;
    text-transform: uppercase;
  }
</style>
