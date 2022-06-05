<template>
  <div class="personal-step">
    <InputBox
      id="first-name"
      :label="$t('personalStep.firstName')"
      :error-message="getErrorMessage('firstName')"
      :value="firstName"
      @input="setFirstName"
    />

    <InputBox
      id="last-name"
      :label="$t('personalStep.lastName')"
      :error-message="getErrorMessage('lastName')"
      :value="lastName"
      @input="setLastName"
    />

    <InputBox
      id="github-user"
      :label="$t('personalStep.gitHubUser')"
      :error-message="getErrorMessage('gitHubUser')"
      :value="gitHubUser"
      @input="setGitHubUser"
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

  .personal-step {
    @include box(100%);
    @include flex-box(center, center, column);

    > :not(:last-child) {
      margin-bottom: 20px;
    }
  }
</style>
