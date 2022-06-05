<template>
  <div class="agreement-step">
    <InputBox
      id="email"
      :label="$t('agreementStep.firstName')"
      :error-message="getErrorMessage('firstName')"
      :value="firstName"
      @input="setFirstName"
    />

    <InputBox
      id="last-name"
      :label="$t('agreementStep.lastName')"
      :error-message="getErrorMessage('lastName')"
      :value="lastName"
      @input="setLastName"
    />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import InputBox from "@/components/InputBox.vue";

  export default {
    name: "PersonalStep",
    components: { InputBox },
    props: {
      validation: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      ...mapGetters(["firstName", "lastName", "gitHubUser"])
    },
    methods: {
      ...mapActions(["setFirstName", "setLastName", "setGitHubUser"]),

      getErrorMessage(code) {
        const validationResult = this.validation.find((validationResult) => validationResult.code === code);

        return validationResult?.errorMessage;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_layout.scss";

  .agreement-step {
    @include box(100%);
    @include flex-box(center, center, column);

    > :not(:last-child) {
      margin-bottom: 20px;
    }
  }
</style>
