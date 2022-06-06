<template>
  <div class="overview-step">
    <Icon name="tick" size="big" variant="side" />

    <TagLabel>{{ $t("overviewStep.intro") }}</TagLabel>

    <h1 class="overview-step__title">
      {{ $t("overviewStep.title") }}
    </h1>

    <div class="overview-step__user">
      <div class="overview-step__user-picture">
        <img v-if="gitHubPicture" class="overview-step__user-picture-image" :src="gitHubPicture" alt="" />

        <span class="overview-step__user-picture-caption">{{ gitHubUser }}</span>
      </div>

      <div class="overview-step__user-copy">
        <h3 class="overview-step__user-name">{{ firstName }} {{ lastName }}</h3>
        <span class="overview-step__user-email">{{ email }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from "@/components/Icon.vue";
  import TagLabel from "@/components/TagLabel.vue";
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "HomeStep",
    components: {
      Icon,
      TagLabel
    },
    computed: {
      ...mapGetters(["firstName", "lastName", "gitHubUser", "gitHubPicture", "email"])
    },
    methods: {
      ...mapActions(["fetchGitHubPicture"])
    },
    mounted() {
      this.fetchGitHubPicture();
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_fonts.scss";
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/variables/_colors.scss";
  @import "@/styles/variables/_fonts.scss";
  @import "@/styles/variables/_layout.scss";

  .overview-step {
    @include box(100%);
    @include flex-box(center, center, column);

    &__user {
      @include flex-box();
      @include padding();

      border: $border-width solid $dark-gray;
      border-radius: $space * 2;
      width: 100%;

      &-picture {
        @include flex-box(center, $direction: column);

        margin-right: $space * 5;

        &-image {
          @include box($sizing * 15);

          border-radius: 100%;
          margin-bottom: $space * 2;
        }

        &-caption {
          @include serif-font();
        }
      }

      &-copy {
        @include flex-box($direction: column);
      }

      &-name {
        margin: 0;
      }

      &-email {
        @include font-size($small-font);
      }
    }
  }
</style>
