<template>
  <div class="profile-picture" :class="{ 'profile-picture--unknown': userExists === false }">
    <img v-if="src" v-lazy="src" alt="" class="profile-picture__image" />
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "ProfilePicture",
    props: {
      src: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapGetters(["userExists"])
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_animations.scss";
  @import "@/styles/mixins/_fonts.scss";
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/variables/_colors.scss";
  @import "@/styles/variables/_layout.scss";

  @include rotate-animation();

  .profile-picture {
    @include box($sizing * 15);
    @include flex-box(center, center);

    border-radius: 100%;
    overflow: hidden;
    position: relative;

    &--unknown {
      border: $border-width dashed $dark-gray;
    }

    &--unknown::before {
      @include box(100%);
      @include flex-box(center, center);
      @include font-size($huge-font);
      @include sans-serif-font();

      content: "?";
      color: $dark-gray;
    }

    &:not(&--unknown)::before {
      @include box(50%);

      animation: rotate 1s linear infinite;
      border-bottom: $border-width solid transparent;
      border-left: $border-width solid $dark-gray;
      border-radius: 100%;
      border-right: $border-width solid transparent;
      border-top: $border-width solid $dark-gray;
      content: "";
      display: block;
      position: absolute;
    }

    &__image {
      @include box(100%);

      z-index: 1;
      position: relative;
      background-color: white;

      // Not using BEM due to Vue LazyLoad
      &[lazy="loading"] {
        visibility: hidden;
      }
    }
  }
</style>
