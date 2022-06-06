<template>
  <div class="checkbox">
    <div class="checkbox__input-wrapper">
      <input
        :id="id"
        :required="required"
        :checked="checked"
        @change="handleChange"
        class="checkbox__input"
        type="checkbox"
      />

      <label
        class="checkbox__label"
        tabindex="0"
        :class="{
          'checkbox__label--checked': checked,
          'checkbox__label--required': required,
          'checkbox__label--error': isError
        }"
        :for="id"
        @keyup.space.exact="toggle"
      >
        <span class="checkbox__label-text">
          {{ label }}
          <sup v-if="required" class="checkbox__label-required" data-test="required-asterisk">*</sup>
        </span>
      </label>
    </div>

    <span v-if="isError" class="checkbox__error" data-test="error-message">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
  export default {
    name: "InputBox",
    emits: ["update"],
    props: {
      checked: {
        type: Boolean,
        default: false
      },
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
      }
    },
    data() {
      return {
        dirty: false
      };
    },
    computed: {
      isError() {
        return this.dirty && !!this.errorMessage;
      }
    },
    methods: {
      toggle() {
        this.$emit("update", !this.checked);
        this.dirty = true;
      },

      handleChange(event) {
        this.$emit("update", event.target.checked);
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

  .checkbox {
    @include flex-box(flex-start, $direction: column);

    &__label {
      font-weight: $bold-weight;

      &-required {
        @include font-size();

        color: $red;
        margin-left: $space;
      }
    }

    &__input {
      display: none;

      &-wrapper {
        @include flex-box(center, center);
      }
    }

    &__label {
      @include flex-box($verticalAlignment: flex-start);

      outline: 0;

      &::before {
        @include box($sizing * 4);
        @include flex-box(center, center, $inline: true);

        content: "";
        border: $border-width solid $dark-gray;
        border-radius: 20%;
        margin-right: $space * 2;
        position: relative;

        @include tablet() {
          @include box($sizing * 5);

          margin-right: $space * 3;
        }

        @include tablet() {
          @include box($sizing * 6);

          margin-right: $space * 4;
        }
      }

      &:not(&--error) {
        &:focus::before,
        &:hover::before {
          border-color: $darkest-gray;
        }
      }

      &:not(&--required) & {
        &-text {
          margin-top: $space;
        }
      }

      &--checked {
        &::before {
          background-color: $dark-gray;

          @include tablet() {
            @include font-size($big-font);
          }
        }

        &::after {
          @include box($sizing * 4);
          @include flex-box(center, center);
          @include font-size($big-font);

          border: $border-width solid transparent;
          color: $white;
          content: "\00d7";
          margin-top: -$border-width;
          position: absolute;

          @include tablet() {
            @include box($sizing * 5);
          }

          @include tablet() {
            @include box($sizing * 6);
          }
        }

        &:focus::before,
        &:hover::before {
          background-color: $darkest-gray;
        }
      }

      &--required & {
        &-text {
          margin-top: -$space;
        }
      }

      &--error {
        &::before {
          border-color: $red;
        }

        &:focus::before,
        &:hover::before {
          border-color: $dark-red;
        }
      }
    }

    &__error {
      @include font-size($small-font);

      color: $red;
      margin-top: $space * 2;
    }
  }
</style>
