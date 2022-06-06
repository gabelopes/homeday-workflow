<template>
  <router-view />
</template>

<style lang="scss">
  @import "@/styles/mixins/_breakpoints.scss";
  @import "@/styles/mixins/_fonts.scss";
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/variables/_fonts.scss";

  @include Arvo();
  @include Mulish();

  * {
    box-sizing: border-box;
  }

  html,
  body {
    @include box(100%);

    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  #app {
    @include box(100%);
    @include font-size();
    @include sans-serif-font();

    font-weight: $regular-weight;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button,
  input {
    @include font-size();
    @include sans-serif-font();

    font-weight: $regular-weight;
  }
</style>
