<template>
  <div class="personal-step">
    <InputBox
      id="first-name"
      required
      :label="$t('personalStep.firstName')"
      :error-message="getErrorMessage('firstName')"
      :value="firstName"
      @update="setFirstName"
    />

    <InputBox
      id="last-name"
      required
      :label="$t('personalStep.lastName')"
      :error-message="getErrorMessage('lastName')"
      :value="lastName"
      @update="setLastName"
    />

    <InputBox
      id="github-user"
      required
      :label="$t('personalStep.gitHubUser')"
      :error-message="getErrorMessage('gitHubUser')"
      :value="gitHubUser"
      @update="setGitHubUser"
    />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import InputBox from "@/components/InputBox.vue";

  export default {
    name: "PersonalStep",
    components: {
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
  @import "@/styles/mixins/_breakpoints.scss";
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/variables/_layout.scss";

  .personal-step {
    @include box(100%);
    @include padding();

    overflow: hidden auto;

    @include desktop() {
      @include box(75%, 100%);
    }

    > :not(:last-child) {
      margin-bottom: $space * 5;
    }
  }
</style>
