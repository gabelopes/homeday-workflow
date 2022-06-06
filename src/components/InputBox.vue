<template>
  <div class="input-box">
    <label :for="id" class="input-box__label">
      {{ label }}
      <sup class="input-box__label-required">*</sup>
    </label>

    <input
      :class="{
        'input-box__input--success': isSuccess,
        'input-box__input--error': isError
      }"
      :id="id"
      :required="required"
      :value="value"
      @input="handleInput"
      class="input-box__input"
      type="text"
    />

    <span v-if="isError" class="input-box__error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
  export default {
    name: "InputBox",
    emits: ["update"],
    props: {
      errorMessage: {
        type: String,
        default: null
      },
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      required: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        dirty: false
      };
    },
    computed: {
      isSuccess() {
        return !!this.value && !this.errorMessage;
      },

      isError() {
        return this.dirty && !!this.errorMessage;
      }
    },
    methods: {
      handleInput(event) {
        this.$emit("update", event.target.value);
        this.dirty = true;
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
