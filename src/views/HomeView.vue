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
  import { email, required } from "@/validators";

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
              const requiredMessage = this.$t("validation.required");

              return [
                ...this.validate(this.firstName, required, "firstName", requiredMessage),
                ...this.validate(this.lastName, required, "lastName", requiredMessage),
                ...this.validate(this.gitHubUser, required, "gitHubUser", requiredMessage)
              ];
            }
          },
          {
            code: "agreement",
            sideComponent: markRaw(AgreementSidestep),
            mainComponent: markRaw(AgreementStep),
            validator: () => {
              const requiredMessage = this.$t("validation.required");

              return [
                ...this.validate(this.email, required, "email", requiredMessage),
                ...this.validate(this.email, email, "email", this.$t("validation.invalidEmail")),
                ...this.validate(this.consent, required, "licenceAgreement", requiredMessage)
              ];
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
      },

      validate(prop, validator, code, errorMessage) {
        return validator(prop) ? [] : [{ code, errorMessage }];
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
