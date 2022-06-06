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

  export default {
    name: "AgreementSidestep",
    components: {
      Icon,
      TagLabel
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_breakpoints.scss";
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/variables/_colors.scss";
  @import "@/styles/variables/_layout.scss";

  .agreement-sidestep {
    @include flex-box();
    @include padding();

    @include tablet() {
      @include flex-box(center, center, column);
    }

    &__icon {
      @include mobile() {
        margin-right: $space * 5;
      }

      @include tablet() {
        margin-bottom: $space * 8;
      }

      @include desktop() {
        margin-bottom: $space * 11;
      }
    }

    &__description {
      color: $darkest-gray;
    }
  }
</style>
