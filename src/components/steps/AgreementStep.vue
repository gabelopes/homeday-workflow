<template>
  <div class="agreement-step">
    <InputBox
      id="email"
      :label="$t('agreementStep.email')"
      :error-message="getErrorMessage('email')"
      :value="email"
      @update="setEmail"
    />

    <Checkbox
      id="licence-agreement"
      :label="$t('agreementStep.licenceAgreement')"
      :error-message="getErrorMessage('licenceAgreement')"
      :checked="consent"
      @update="setConsent"
    />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import Checkbox from "@/components/Checkbox.vue";
  import InputBox from "@/components/InputBox.vue";

  export default {
    name: "AgreementStep",
    components: {
      Checkbox,
      InputBox
    },
    props: {
      validation: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      ...mapGetters(["email", "consent"])
    },
    methods: {
      ...mapActions(["setEmail", "setConsent"]),

      getErrorMessage(code) {
        const validationResult = this.validation.find((validationResult) => validationResult.code === code);

        return validationResult?.errorMessage;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_breakpoints.scss";
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/variables/_layout.scss";

  .agreement-step {
    @include box(100%);
    @include padding();

    overflow: hidden auto;

    @include desktop() {
      @include box(75%, 100%);
    }

    > :not(:last-child) {
      margin-bottom: $space * 10;
    }
  }
</style>
