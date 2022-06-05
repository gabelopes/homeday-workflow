<template>
  <img :src="require(`@/assets/${name}-${variant}.webp`)" alt="" class="icon" :class="`icon--${size}`" />
</template>

<script>
  export default {
    name: "Icon",
    props: {
      name: {
        type: String,
        required: true
      },
      variant: {
        type: String,
        default: "inactive"
      },
      size: {
        type: String,
        default: "medium",
        validator(type) {
          return ["small", "medium", "big"].includes(type);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_breakpoints.scss";
  @import "@/styles/mixins/_layout.scss";

  .icon {
    &--small {
      @include box(20px);

      @include desktop() {
        @include box(30px);
      }
    }

    &--medium {
      @include box(150px);

      @include desktop() {
        @include box(200px);
      }
    }

    &--big {
      @include box(200px);

      @include desktop() {
        @include box(300px);
      }
    }
  }
</style>
