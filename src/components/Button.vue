<template>
  <button class="button" :class="{ 'button--secondary': type === 'secondary' }">
    <slot />
  </button>
</template>

<script>
  export default {
    name: "Button",
    props: {
      type: {
        type: String,
        default: "primary",
        validator(type) {
          return ["primary", "secondary"].includes(type);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_breakpoints.scss";
  @import "@/styles/variables/_colors.scss";
  @import "@/styles/variables/_fonts.scss";

  $border-width: 2px;

  .button {
    background-color: $primary-button-color;
    border: $border-width solid $primary-button-color;
    border-radius: 12px;
    color: $white;
    font-weight: $medium-weight;

    @include mobile() {
      padding: 15px 20px;
    }

    @include tablet() {
      padding: 20px 30px;
    }

    &:focus,
    &:hover {
      background-color: $primary-button-active-color;
      border: $border-width solid $primary-button-active-color;
    }

    &:disabled {
      background-color: $secondary-button-color;
      border: $border-width solid $secondary-button-color;
    }

    &--secondary {
      background-color: transparent;
      border: $border-width solid $secondary-button-color;
      color: $secondary-button-color;

      &:focus,
      &:hover {
        background-color: transparent;
        border: $border-width solid $secondary-button-active-color;
        color: $secondary-button-active-color;
      }
    }
  }
</style>
