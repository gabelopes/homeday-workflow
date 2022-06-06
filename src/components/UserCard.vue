<template>
  <div class="user-card">
    <div class="user-card__picture">
      <ProfilePicture :src="gitHubPicture" class="user-card__picture-image" />

      <span class="user-card__picture-caption">{{ gitHubUser }}</span>
    </div>

    <div class="user-card__copy">
      <h3 class="user-card__name">{{ firstName }} {{ lastName }}</h3>

      <span class="user-card__email">{{ email }}</span>

      <span v-if="userExists === false" class="user-card__unknown">{{ $t("userCard.notFound") }}</span>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import ProfilePicture from "@/components/ProfilePicture.vue";

  export default {
    name: "UserCard",
    components: {
      ProfilePicture
    },
    computed: {
      ...mapGetters(["firstName", "lastName", "gitHubUser", "gitHubPicture", "email", "userExists"])
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

  .user-card {
    @include flex-box();
    @include padding();

    border: $border-width solid $dark-gray;
    border-radius: $space * 2;
    width: 100%;

    &__picture {
      @include flex-box(center, $direction: column);

      margin-right: $space * 5;

      &-image {
        margin-bottom: $space * 2;
      }

      &-caption {
        @include serif-font();
      }
    }

    &__copy {
      @include flex-box($direction: column);
    }

    &__name {
      margin: 0;
    }

    &__email {
      @include font-size($small-font);
    }

    &__unknown {
      @include font-size($small-font);

      color: $red;
      margin-top: $space * 2;
    }
  }
</style>
