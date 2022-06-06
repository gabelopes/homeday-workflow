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
  @import "@/styles/variables/_layout.scss";

  .button {
    background-color: $primary-button-color;
    border: $border-width solid $primary-button-color;
    border-radius: $space * 2;
    color: $white;
    font-weight: $medium-weight;
    outline: 0;
    padding: $sizing * 3;

    @include tablet() {
      padding: $sizing * 4;
    }

    @include tablet() {
      padding: $sizing * 5;
    }

    &:focus,
    &:hover {
      background-color: $primary-button-active-color;
      border: $border-width solid $primary-button-active-color;
    }

    &:disabled {
      background-color: $secondary-button-color;
      border-color: $secondary-button-color;
    }

    &--secondary {
      background-color: transparent;
      border-color: $secondary-button-color;
      color: $secondary-button-color;

      &:focus,
      &:hover {
        background-color: transparent;
        border-color: $secondary-button-active-color;
        color: $secondary-button-active-color;
      }
    }
  }
</style>
