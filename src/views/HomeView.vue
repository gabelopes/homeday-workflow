<template>
  <div class="home-view">
    <Wizard
      :steps="steps"
      :step="$route.params.step"
      @commit:step="handleStepCommit"
      @rollback:step="handleStepRollback"
    />
  </div>
</template>

<script>
  import Wizard from "@/components/Wizard.vue";
  import HomeStep from "@/components/steps/HomeStep.vue";
  import PersonalStep from "@/components/steps/PersonalStep.vue";
  import PersonalSidestep from "@/components/steps/PersonalSidestep.vue";
  import AgreementStep from "@/components/steps/AgreementStep.vue";
  import AgreementSidestep from "@/components/steps/AgreementSidestep.vue";
  import OverviewStep from "@/components/steps/OverviewStep.vue";
  import { markRaw } from "vue";
  import { mapGetters } from "vuex";

  export default {
    name: "HomeView",
    components: {
      Wizard
    },
    data() {
      return {
        steps: [
          {
            code: "home",
            mainComponent: markRaw(HomeStep)
          },
          {
            code: "personal",
            sideComponent: markRaw(PersonalSidestep),
            mainComponent: markRaw(PersonalStep),
            validator: () => {
              const validationResults = [];

              if (!this.firstName) {
                validationResults.push({
                  code: "firstName",
                  errorMessage: this.$t("validation.required")
                });
              }

              if (!this.lastName) {
                validationResults.push({
                  code: "lastName",
                  errorMessage: this.$t("validation.required")
                });
              }

              if (!this.gitHubUser) {
                validationResults.push({
                  code: "gitHubUser",
                  errorMessage: this.$t("validation.required")
                });
              }

              return validationResults;
            }
          },
          {
            code: "agreement",
            sideComponent: markRaw(AgreementSidestep),
            mainComponent: markRaw(AgreementStep),
            validator: () => {
              const validationResults = [];
              const emailRegEx = /[\w\d.-]+?@[\w\d.-]+/;

              if (!this.email) {
                validationResults.push({
                  code: "email",
                  errorMessage: this.$t("validation.required")
                });
              }

              if (this.email && !emailRegEx.test(this.email)) {
                validationResults.push({
                  code: "email",
                  errorMessage: this.$t("validation.invalidEmail")
                });
              }

              if (!this.consent) {
                validationResults.push({
                  code: "licenceAgreement",
                  errorMessage: this.$t("validation.required")
                });
              }

              return validationResults;
            }
          },
          {
            code: "overview",
            mainComponent: markRaw(OverviewStep)
          }
        ]
      };
    },
    computed: {
      ...mapGetters(["firstName", "lastName", "gitHubUser", "email", "consent"])
    },
    methods: {
      handleStepCommit({ code }) {
        this.$router.push(`/${code}`);
      },

      handleStepRollback({ code }) {
        this.$router.replace(`/${code}`);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_layout.scss";

  .home-view {
    @include box(100%);
  }
</style>
