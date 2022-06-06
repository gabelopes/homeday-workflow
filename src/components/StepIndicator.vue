<template>
  <ul class="step-indicator">
    <li
      v-for="({ code, icon }, index) in steps"
      :key="code"
      class="step-indicator__step"
      :class="{
        'step-indicator__step--complete': selectedIndex > index,
        'step-indicator__step--current': selectedIndex === index
      }"
    >
      <img v-if="icon" :src="icon" :alt="$t('stepSelector.stepNumber', [index + 1])" />
      <span v-else>{{ index + 1 }}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "StepSelector",
    props: {
      selectedIndex: {
        type: Number,
        default: 0
      },
      steps: {
        type: Array,
        required: true,
        validator(steps) {
          return steps.length && steps.every(({ code, mainComponent }) => code && mainComponent);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_breakpoints.scss";
  @import "@/styles/mixins/_fonts.scss";
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/variables/_colors.scss";
  @import "@/styles/variables/_fonts.scss";
  @import "@/styles/variables/_steps.scss";
  @import "@/styles/variables/_transitions.scss";

  .step-indicator {
    margin: 0;
    padding: 0;

    @include mobile() {
      @include flex-box(center, center);

      bottom: 0;
    }

    @include tablet() {
      @include flex-box(center, center, $direction: column);

      right: 0;
    }

    position: absolute;

    &__step {
      @include box($step-size-mobile);
      @include flex-box(center, center);
      @include font-size($medium-font);

      background-color: $white;
      border: $step-inner-border-size-mobile solid $light-gray;
      border-radius: 100%;
      box-shadow: 0 0 0 $step-outer-border-size $medium-gray;
      color: $medium-gray;
      font-weight: $medium-weight;
      transform: translateY(50%);
      transition: box-shadow $half-transition-duration;

      @include tablet() {
        @include box($step-size-tablet);

        transform: translateX(50%);
        border-width: $step-inner-border-size-tablet;
      }

      @include desktop() {
        @include box($step-size-desktop);

        border-width: $step-inner-border-size-desktop;
      }

      &:not(:last-child) {
        @include mobile() {
          margin-right: $step-spacing-mobile;
        }

        @include tablet() {
          margin-bottom: $step-spacing-tablet;
        }

        @include desktop() {
          margin-bottom: $step-spacing-desktop;
        }
      }

      &::before,
      &:last-child::after {
        @include mobile() {
          @include box($step-spacing-mobile - $step-outer-border-size, $step-outer-border-size);
        }

        @include tablet() {
          @include box($step-outer-border-size, $step-spacing-tablet - $step-outer-border-size);
        }

        @include desktop() {
          @include box($step-outer-border-size, $step-spacing-desktop - $step-outer-border-size);
        }

        background-color: $medium-gray;
        content: "";
        position: absolute;
        transition: background-color $half-transition-duration;
      }

      &::before {
        transform: translateX(-100%);

        @include mobile() {
          left: -$step-inner-border-size-mobile;
        }

        @include tablet() {
          top: -$step-inner-border-size-tablet;
          transform: translateY(-100%);
        }

        @include desktop() {
          top: -$step-inner-border-size-desktop;
        }
      }

      &:first-child::before {
        @include mobile() {
          width: 100vw;
        }

        @include tablet() {
          height: 100vh;
        }
      }

      &:last-child::after {
        transform: translateX(100%);

        @include mobile() {
          width: 100vw;
          right: -$step-inner-border-size-mobile;
        }

        @include tablet() {
          height: 100vh;
          transform: translateY(100%);
          bottom: -$step-inner-border-size-tablet;
        }

        @include desktop() {
          bottom: -$step-inner-border-size-desktop;
        }
      }

      &--complete {
        box-shadow: 0 0 0 $step-outer-border-size $green;
        color: $green;

        &::before {
          background-color: $green;
        }
      }

      &--current {
        box-shadow: 0 0 0 $step-outer-border-size $blue;
        color: $blue;

        &::before {
          background-color: $blue;
        }
      }
    }
  }
</style>
