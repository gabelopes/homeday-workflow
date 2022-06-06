<template>
  <img v-lazy="require(`@/assets/${name}-${variant}.webp`)" alt="" class="icon" :class="`icon--${size}`" />
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
        default: "regular",
        validator(type) {
          return ["tiny", "small", "regular", "medium", "big"].includes(type);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_breakpoints.scss";
  @import "@/styles/mixins/_layout.scss";

  .icon {
    @include box($sizing * 20);

    @include desktop() {
      @include box($sizing * 30);
    }

    &--tiny {
      @include box($sizing * 2);

      @include desktop() {
        @include box($sizing * 3);
      }
    }

    &--small {
      @include box($sizing * 8);

      @include desktop() {
        @include box($sizing * 12);
      }
    }

    &--medium {
      @include box($sizing * 30);

      @include desktop() {
        @include box($sizing * 40);
      }
    }

    &--big {
      @include box($sizing * 40);

      @include desktop() {
        @include box($sizing * 50);
      }
    }
  }
</style>
