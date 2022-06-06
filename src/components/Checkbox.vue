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
        :for="id"
        class="checkbox__label"
        :class="{
          'checkbox__label--checked': checked,
          'checkbox__label--error': isError
        }"
      >
        {{ label }}
        <sup class="checkbox__label-required">*</sup>
      </label>
    </div>

    <span v-if="isError" class="checkbox__error">
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
    @include flex-box($direction: column);

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
      @include flex-box($verticalAlignment: center);

      &::before {
        @include box($sizing * 4);
        @include flex-box(center, center, $inline: true);

        content: "";
        border: $border-width solid $dark-gray;
        border-radius: 20%;
        margin-right: $space;

        @include tablet() {
          @include box($sizing * 5);

          margin-right: $space * 2;
        }

        @include tablet() {
          @include box($sizing * 6);

          margin-right: $space * 3;
        }
      }

      &--checked {
        &::before {
          @include font-size($medium-font);

          background-color: $dark-gray;
          color: $white;
          content: "\00d7";

          @include tablet() {
            @include font-size($big-font);
          }
        }
      }

      &--error {
        &::before {
          border-color: $red;
        }
      }
    }

    &__error {
      @include font-size($small-font);

      color: $red;
    }
  }
</style>
