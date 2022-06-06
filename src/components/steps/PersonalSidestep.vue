<template>
  <div class="personal-sidestep">
    <Icon class="personal-sidestep__icon" name="user" variant="side" />

    <div class="personal-sidestep__copy">
      <TagLabel class="tag-label">{{ $t("personalSidestep.intro") }}</TagLabel>

      <h2 class="personal-sidestep__title">
        {{ $t("personalSidestep.title") }}
      </h2>

      <p class="personal-sidestep__description">
        {{ $t("personalSidestep.description") }}
      </p>
    </div>
  </div>
</template>

<script>
  import Icon from "@/components/Icon.vue";
  import TagLabel from "@/components/TagLabel.vue";

  export default {
    name: "PersonalSidestep",
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

  .personal-sidestep {
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
