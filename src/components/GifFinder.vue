<template>
  <v-container pa-40 class="grey lighten-5">
    
    <search-field />
    <gifs-list :url="url" />
    
  </v-container>
</template>

<script>

  import SearchField from './SearchField'
  import GifsList from './GifsList'
  import { TRENDING_URL } from '@/modules/constants.js';

  export default {
    name: 'GifFinder',
    components: {
      SearchField, GifsList
    },
    data: () => ({
      url: TRENDING_URL
    }),
    created() {
      this.$on('searchQueryChange', (val) => {
        if (val !== '') {
          this.url = `https://api.giphy.com/v1/gifs/search?q=${val}&`
        } else {
          this.url = TRENDING_URL;
        }
      })
    }
  }
</script>
