<template>
  <div class="agreement-sidestep">
    <Icon class="agreement-sidestep__icon" name="mail" variant="side" />

    <div class="agreement-sidestep__copy">
      <TagLabel class="tag-label">{{ $t("agreementSidestep.intro") }}</TagLabel>

      <h2 class="agreement-sidestep__title">
        {{ $t("agreementSidestep.title") }}
      </h2>

      <p class="agreement-sidestep__description">
        {{ $t("agreementSidestep.description") }}
      </p>
    </div>
  </div>
</template>

<script>
  import Icon from "@/components/Icon.vue";
  import TagLabel from "@/components/TagLabel.vue";
  import { mapActions } from "vuex";

  export default {
    name: "AgreementSidestep",
    components: {
      Icon,
      TagLabel
    },
    methods: {
      ...mapActions(["setTest"])
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_breakpoints.scss";
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/variables/_colors.scss";

  .agreement-sidestep {
    @include flex-box();

    @include tablet() {
      @include flex-box(center, center, column);
    }

    padding: 30px;

    @include tablet() {
      padding: 40px;
    }

    @include desktop() {
      padding-left: 50px;
    }

    &__icon {
      @include mobile() {
        margin-right: 20px;
      }

      @include tablet() {
        margin-bottom: 50px;
      }
    }

    &__description {
      color: $darkest-gray;
    }
  }
</style>
