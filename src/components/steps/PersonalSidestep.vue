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
  import { mapActions } from "vuex";

  export default {
    name: "PersonalSidestep",
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

  .personal-sidestep {
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
