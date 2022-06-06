<template>
  <div class="wizard" :class="{ 'wizard--split': isSplit }">
    <div class="wizard__stage wizard__stage--primary" :class="{ 'wizard__stage--sidebar': isSplit }">
      <div class="wizard__stage-component">
        <transition appear mode="out-in" name="fade">
          <component :is="sideComponent" />
        </transition>
      </div>

      <StepSelector v-show="isSplit" :selected-index="currentStepIndex" :steps="steps" />

      <transition name="fade">
        <div v-if="!isSplit && !isLastStep" class="wizard__stage-controls">
          <Button v-if="!isFirstStep" @click="previousStep" type="secondary">{{ $t("wizard.previousStep") }}</Button>

          <Button @click="nextStep" :disabled="!isCurrentStepValid" data-test="next-button">
            {{ isFirstStep ? $t("wizard.start") : $t("wizard.nextStep") }}
          </Button>
        </div>
      </transition>
    </div>

    <transition name="reveal">
      <div v-if="isSplit" class="wizard__stage wizard__stage--secondary">
        <div class="wizard__stage-component wizard__stage-component--secondary">
          <transition appear mode="out-in" name="fade-slide">
            <component :is="currentStep.mainComponent" :validation="validationResults" />
          </transition>
        </div>

        <transition name="fade">
          <div v-if="!isLastStep" class="wizard__stage-controls">
            <Button v-if="!isFirstStep" @click="previousStep" type="secondary">{{ $t("wizard.previousStep") }}</Button>

            <Button @click="nextStep" :disabled="!isCurrentStepValid" data-test="next-button">
              {{ isBeforeLastStep ? $t("wizard.done") : $t("wizard.nextStep") }}
            </Button>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
  import StepSelector from "@/components/StepSelector.vue";
  import Button from "@/components/Button.vue";

  export default {
    name: "Wizard",
    components: {
      Button,
      StepSelector
    },
    props: {
      steps: {
        type: Array,
        required: true,
        validator(steps) {
          return steps.length && steps.every(({ code, mainComponent }) => code && mainComponent);
        }
      }
    },

    computed: {
      currentStep() {
        return this.steps[this.currentStepIndex] ?? {};
      },

      currentValidator() {
        return this.currentStep.validator ?? (() => []);
      },

      isBeforeLastStep() {
        return this.currentStepIndex === this.steps.length - 2;
      },

      isFirstStep() {
        return this.currentStepIndex === 0;
      },

      isLastStep() {
        return this.currentStepIndex === this.steps.length - 1;
      },

      isSplit() {
        return !!this.currentStep?.sideComponent;
      },

      isCurrentStepValid() {
        return this.validationResults?.length === 0;
      },

      sideComponent() {
        const { mainComponent, sideComponent } = this.currentStep ?? {};

        return this.isSplit ? sideComponent : mainComponent;
      },

      validationResults() {
        return this.currentValidator();
      }
    },

    data() {
      return {
        currentStepIndex: 0
      };
    },

    methods: {
      nextStep() {
        if (this.currentStepIndex < this.steps.length - 1) {
          this.currentStepIndex += 1;
        }
      },

      previousStep() {
        if (this.currentStepIndex > 0) {
          this.currentStepIndex -= 1;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_breakpoints.scss";
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/mixins/_transitions.scss";
  @import "@/styles/variables/_colors.scss";
  @import "@/styles/variables/_layout.scss";
  @import "@/styles/variables/_steps.scss";
  @import "@/styles/variables/_transitions.scss";

  @include fade($quarter-transition-duration);
  @include fade-slide();
  @include reveal();

  .wizard {
    @include box(100%);
    @include flex-box($direction: column);

    @include tablet() {
      @include flex-box();
    }

    &--split {
      background-color: $secondary-background-color;
      transition: background-color $half-transition-duration $half-transition-duration;
    }

    &__stage {
      &--primary {
        @include box(100%);
        @include flex-box(center, center, column);

        background-color: $primary-background-color;
        flex-shrink: 0;
        position: relative;

        @include mobile() {
          padding-bottom: $step-outer-border-size + $step-size-mobile / 2;
        }

        @include tablet() {
          padding-right: $step-outer-border-size + $step-size-tablet / 2;
        }

        @include desktop() {
          padding-right: $step-outer-border-size + $step-size-desktop / 2;
        }
      }

      &--secondary {
        @include box(100%);
        @include flex-box($verticalAlignment: space-between, $direction: column);

        overflow: hidden auto;

        @include mobile() {
          margin-top: $step-outer-border-size + $step-size-mobile / 2;
        }

        @include tablet() {
          margin-left: $step-outer-border-size + $step-size-tablet / 2;
        }

        @include desktop() {
          margin-left: $step-outer-border-size + $step-size-desktop / 2;
        }
      }

      &--secondary & {
        &-component {
          @include flex-box(center, center);

          overflow: hidden auto;
          width: 100%;
        }

        &-controls {
          @include flex-box(space-between);

          width: 100%;
        }
      }

      &--sidebar {
        box-shadow: 0 0 ($space * 2) 0 rgba(0, 0, 0, 0.35);
        transition: box-shadow $double-transition-duration;

        @include mobile() {
          height: 25%;
          min-height: $space * 65;
        }

        @include tablet() {
          min-width: $space * 75;
          width: 25%;
        }

        @include desktop() {
          min-width: $space * 85;
          width: 25%;
        }
      }

      &-controls {
        @include padding();

        > :not(:last-child) {
          margin-right: $space * 5;
        }
      }
    }
  }
</style>
