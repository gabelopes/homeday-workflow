<template>
  <div class="wizard" :class="{ 'wizard--split': isSplit }">
    <div class="wizard__stage wizard__stage--primary" :class="{ 'wizard__stage--sidebar': isSplit }">
      <div class="wizard__stage-component">
        <transition appear mode="out-in" name="fade">
          <component :is="sideComponent" />
        </transition>
      </div>

      <StepIndicator v-if="isSplit" :selected-index="currentStepIndex" :steps="steps" />

      <transition name="fade-delay-enter">
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
            <component :is="currentStep.mainComponent" :validation="currentValidationResults" />
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
  import Button from "@/components/Button.vue";
  import StepIndicator from "@/components/StepIndicator.vue";

  export default {
    name: "Wizard",
    emits: ["commit:step", "rollback:step"],
    components: {
      Button,
      StepIndicator
    },
    props: {
      steps: {
        type: Array,
        required: true,
        validator(steps) {
          return steps.length && steps.every(({ code, mainComponent }) => code && mainComponent);
        }
      },
      step: {
        type: String,
        required: false
      }
    },
    computed: {
      currentStep() {
        return this.steps[this.currentStepIndex] ?? {};
      },

      currentStepIndex() {
        const stepIndex = this.getStepIndex(this.step);

        return this.isInStepsRange(stepIndex) ? stepIndex : 0;
      },

      currentValidator() {
        return this.getValidator(this.currentStep);
      },

      currentValidationResults() {
        return this.currentValidator();
      },

      isBeforeLastStep() {
        return this.currentStepIndex === this.steps.length - 2;
      },

      isCurrentStepValid() {
        return this.isValidationSuccessful(this.currentValidationResults);
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

      sideComponent() {
        const { mainComponent, sideComponent } = this.currentStep ?? {};

        return this.isSplit ? sideComponent : mainComponent;
      }
    },
    methods: {
      commitStep(stepIndex) {
        this.mutateStep(stepIndex, "commit:step");
      },

      findInvalidStepIndexBefore(stepIndex) {
        if (stepIndex < 0) {
          return -1;
        }

        return this.steps.slice(0, stepIndex).findIndex((step) => {
          const validator = this.getValidator(step);
          const validationResults = validator();

          return !this.isValidationSuccessful(validationResults);
        });
      },

      getStepIndex(stepCode) {
        return this.steps.findIndex(({ code }) => code === stepCode);
      },

      getValidator({ validator }) {
        return validator ?? (() => []);
      },

      isInStepsRange(stepIndex) {
        return stepIndex >= 0 && stepIndex < this.steps.length;
      },

      isValidationSuccessful(validationResults) {
        return Array.isArray(validationResults) && validationResults.length === 0;
      },

      mutateStep(stepIndex, event) {
        if (this.isInStepsRange(stepIndex)) {
          this.$emit(event, this.steps[stepIndex]);
        }
      },

      nextStep() {
        this.commitStep(this.currentStepIndex + 1);
      },

      previousStep() {
        this.commitStep(this.currentStepIndex - 1);
      },

      reportStep() {
        const stepIndex = this.getStepIndex(this.step);
        const invalidStepIndex = this.findInvalidStepIndexBefore(stepIndex);

        if (stepIndex < 0) {
          return this.commitStep(0);
        }

        if (invalidStepIndex >= 0) {
          this.rollbackStep(invalidStepIndex);
        } else {
          this.commitStep(stepIndex);
        }
      },

      rollbackStep(stepIndex) {
        this.mutateStep(stepIndex, "rollback:step");
      }
    },
    created() {
      this.reportStep();
    },
    watch: {
      step() {
        this.reportStep();
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

  @include fade($half-transition-duration);
  @include fade-delay-enter($half-transition-duration, $half-transition-duration);
  @include fade-slide($half-transition-duration);
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
      @include flex-box(center, center, $direction: column);

      &--primary {
        @include box(100%);
        @include flex-box(center, center, column);

        background-color: $primary-background-color;
        flex-shrink: 0;
        position: relative;
        transition: all $regular-transition-duration;

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
