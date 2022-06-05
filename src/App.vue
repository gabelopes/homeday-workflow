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

    font-family: "Mulish", sans-serif;
    font-size: 1rem;
    font-weight: $regular-weight;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @include tablet() {
      font-size: 1.2rem;
    }
  }

  button,
  input {
    font-family: "Mulish", sans-serif;
    font-size: 1rem;
    font-weight: $regular-weight;

    @include tablet() {
      font-size: 1.2rem;
    }
  }
</style>
