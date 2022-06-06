<template>
  <div class="input-box">
    <label :for="id" class="input-box__label">{{ label }}</label>

    <input
      :class="{
        'input-box__input--success': !!value && !errorMessage,
        'input-box__input--error': !!errorMessage
      }"
      :id="id"
      :value="value"
      @change="$emit('change', value)"
      class="input-box__input"
      type="text"
    />

    <span v-if="errorMessage" class="input-box__error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
  export default {
    name: "InputBox",
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      value: {
        type: String,
        default: ""
      },
      errorMessage: {
        type: String,
        default: null
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

  .input-box {
    @include flex-box($direction: column);

    width: 100%;

    > :not(:last-child) {
      margin-bottom: $space * 3;
    }

    &__label {
      font-weight: $bold-weight;

      &-required {
        @include font-size();

        color: $red;
      }
    }

    &__input {
      @include padding($small);

      border-radius: $space * 2;
      border: $border-width solid $dark-gray;
      background-color: transparent;
      width: 100%;

      &:focus {
        outline: none;
      }

      &--success {
        border-color: $green;
      }

      &--error {
        border-color: $red;
      }
    }

    &__error {
      @include font-size($small-font);

      color: $red;
    }
  }
</style>
