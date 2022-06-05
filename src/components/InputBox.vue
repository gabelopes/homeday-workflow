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
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/variables/_colors.scss";
  @import "@/styles/variables/_fonts.scss";

  .input-box {
    @include flex-box($direction: column);

    > :not(:last-child) {
      margin-bottom: 10px;
    }

    &__label {
      font-weight: $bold-weight;
    }

    &__input {
      border-radius: 12px;
      border: 2px solid $dark-gray;
      background-color: transparent;

      &:focus {
        outline: none;
      }

      &--success {
        border-color: $green;
      }

      &--error {
        border-color: $red;
      }

      @include mobile() {
        padding: 15px 20px;
      }

      @include tablet() {
        padding: 20px 30px;
      }
    }

    &__error {
      color: $red;
    }
  }
</style>
