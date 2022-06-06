<template>
  <div class="overview-step">
    <Icon name="tick" size="big" variant="side" />

    <TagLabel>{{ $t("overviewStep.intro") }}</TagLabel>

    <h1 class="overview-step__title">
      {{ $t("overviewStep.title") }}
    </h1>

    <UserCard />
  </div>
</template>

<script>
  import Icon from "@/components/Icon.vue";
  import TagLabel from "@/components/TagLabel.vue";
  import UserCard from "@/components/UserCard.vue";

  export default {
    name: "HomeStep",
    components: {
      UserCard,
      Icon,
      TagLabel
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_layout.scss";

  .overview-step {
    @include box(100%);
    @include flex-box(center, center, column);
    @include padding();
  }
</style>
