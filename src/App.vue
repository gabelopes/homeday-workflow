<template>
  <router-view />
</template>

<style lang="scss">
  @import "@/styles/mixins/_layout.scss";
  @import "@/styles/mixins/_fonts.scss";

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
  }

  #app {
    font-family: "Mulish", sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
