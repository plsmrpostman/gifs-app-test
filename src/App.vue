<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.svg"
          transition="scale-transition"
          width="40"
          height="40"
        />

        <h1 class="hidden-sm-and-down">Gifs test app</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <gif-finder />
    </v-main>
  </v-app>
</template>

<script>
import GifFinder from './components/GifFinder';

export default {
  name: 'App',

  components: {
    GifFinder,
  },
  computed: {
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },

  data: () => ({
    //
  }),
};
</script>
