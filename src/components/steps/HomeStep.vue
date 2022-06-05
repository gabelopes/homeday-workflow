<template>
  <div class="home-step">
    <Icon name="chat" size="big" variant="side" />

    <TagLabel class="tag-label">{{ $t("homeStep.intro") }}</TagLabel>

    <h1 class="home-step__title">
      {{ $t("homeStep.title") }}
    </h1>
  </div>
</template>

<script>
  import Icon from "@/components/Icon.vue";
  import TagLabel from "@/components/TagLabel.vue";

  export default {
    name: "HomeStep",
    components: {
      Icon,
      TagLabel
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixins/_layout.scss";

  .home-step {
    @include flex-box(center, center, column);
  }
</style>
