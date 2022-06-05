<template>
  <ul class="step-selector">
    <li
      v-for="({ code, icon }, index) in steps"
      :key="code"
      class="step-selector__step"
      :class="{
        'step-selector__step--complete': selectedIndex > index,
        'step-selector__step--current': selectedIndex === index
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
    model: {
      prop: "selectedIndex",
      event: "change:stepIndex"
    },
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
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/mixins/_breakpoints.scss";
  @import "@/styles/variables/_colors.scss";
  @import "@/styles/variables/_fonts.scss";
  @import "@/styles/variables/_transitions.scss";

  $inner-border-size-small: 10px;
  $inner-border-size: 15px;
  $outer-border-size: 3px;
  $spacing-small: 40px;
  $spacing: 50px;
  $size-small: 50px;
  $size: 75px;

  .step-selector {
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
      @include box($size-small);
      @include flex-box(center, center);

      background-color: $white;
      border: $inner-border-size-small solid $light-gray;
      border-radius: 100%;
      box-shadow: 0 0 0 $outer-border-size $medium-gray;
      color: $medium-gray;
      font-size: 1.2rem;
      font-weight: $medium-weight;
      transform: translateY(50%);
      transition: box-shadow $half-transition-duration;

      @include tablet() {
        transform: translateX(50%);
      }

      @include desktop() {
        @include box($size);

        border: $inner-border-size solid $light-gray;
        font-size: 1.4rem;
        transform: translateX(50%);
      }

      &:not(:last-child) {
        @include mobile() {
          margin-right: $spacing-small;
        }

        @include tablet() {
          margin-bottom: $spacing-small;
        }

        @include desktop() {
          margin-bottom: $spacing;
        }
      }

      &::before,
      &:last-child::after {
        @include mobile() {
          @include box($spacing-small - $outer-border-size, $outer-border-size);
        }

        @include tablet() {
          @include box($outer-border-size, $spacing-small - $outer-border-size);
        }

        @include desktop() {
          @include box($outer-border-size, $spacing - $outer-border-size);
        }

        background-color: $medium-gray;
        content: "";
        position: absolute;
        transition: background-color $half-transition-duration;
      }

      &::before {
        transform: translateX(-100%);

        @include mobile() {
          left: -$inner-border-size-small;
        }

        @include tablet() {
          top: -$inner-border-size-small;
          transform: translateY(-100%);
        }

        @include desktop() {
          top: -$inner-border-size;
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
          right: -$inner-border-size-small;
        }

        @include tablet() {
          height: 100vh;
          transform: translateY(100%);
          bottom: -$inner-border-size-small;
        }

        @include desktop() {
          bottom: -$inner-border-size;
        }
      }

      &--complete {
        box-shadow: 0 0 0 $outer-border-size $green;
        color: $green;

        &::before {
          background-color: $green;
        }
      }

      &--current {
        box-shadow: 0 0 0 $outer-border-size $blue;
        color: $blue;

        &::before {
          background-color: $blue;
        }
      }
    }
  }
</style>
