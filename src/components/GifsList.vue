<template>
  <div>
    <v-row class="gifs-list" no-gutters v-if="!showPlaceholder">
      <transition-group class="row" name="list">
        <v-col
          cols="12"
          md="3"
          sm="4"
          v-for="gif in gifs"
          :key="gif.analytics_response_payload"
          transition="scroll-y-transition"
          class="gif-item-col"
        >
          <gif-card :info="gif" /> 
        </v-col>
      </transition-group>
    </v-row>

    <v-row v-else-if="gifs.length" justify="center" class="no-results-wrap">
        <img :src="gifs[0].images.downsized_medium.url" alt="gif">
    </v-row>

    <v-progress-circular
      indeterminate
      color="black"
      :size="80"
      v-if="loading"
    ></v-progress-circular>

    <div class="intersection-block" ref="intersectionBlock" v-intersect="onIntersect" v-if="loadMore && intersectionBlockVisible"></div>
  </div>
</template>

<script>
  import { API_KEY, TRENDING_URL } from '@/modules/constants.js';
  import GifCard from '@/components/GifCard'

  export default {
    components: { GifCard },
    data() {
      return {
        gifs: [],
        currentPage: 0,
        totalItems: null,
        itemsPerPage: 10,
        loading: true,
        showPlaceholder: false,
        intersectionBlockVisible: true
      }
    },
    props: {
      url: {
        type: String,
        default: TRENDING_URL
      }
    },
    watch: {
      url: function() {
        this.showPlaceholder = false;
        this.currentPage = 0;
        this.gifs = [];
      },
    },
    computed: {
      pageOffset() {
        return this.currentPage * this.itemsPerPage;
      },
      loadMore() {
        return !this.showPlaceholder && ((this.pageOffset < this.totalItems) || !this.totalItems)
      },
    },
    methods: {
      async getGifs() {

        let response = await fetch(this.url + new URLSearchParams({
          api_key: API_KEY,
          offset: this.pageOffset,
          limit: this.itemsPerPage
        }));

        let fetchedGifs = await response.json();

        this.totalItems = fetchedGifs.pagination['total_count'];

        if (fetchedGifs.data.length !== 0) {
          this.gifs = [...this.gifs, ...fetchedGifs.data];
        } else {
          this.showPlaceholder = true;
          this.getPlaceholderGif();
        }

        this.loading = false;
        this.intersectionBlockVisible = true;
        
      },
      async getPlaceholderGif() {
        let response = await fetch(`https://api.giphy.com/v1/gifs/random?tag=Not+Found&api_key=${API_KEY}`);
        let fetchedPlaceholder = await response.json();

        this.gifs = [];
        this.gifs.push(fetchedPlaceholder.data);
      },
      onIntersect(entries, observer, isIntersecting) {
        if (isIntersecting && this.loadMore) {
          this.loading = true;
          this.intersectionBlockVisible = false;
          this.getGifs();
          this.currentPage += 1;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .intersection-block {
    margin-top: 100px;
    height: 20px;
    background: transparent;
  }

  .v-progress-circular {
    display: block;
    width: 100px;
    margin: 30px auto 0;
  }

  .list-enter-active, 
  .list-leave-active {
    transition: all 1s;
  }

  .list-enter, 
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .gifs-list {
    .gif-item-col {
      height: 300px;

      @media screen and (min-width: 1904px) {
        height: 360px;
      }
    }
  }

  .no-results-wrap {
    img {
      max-width: 100%
    }
  }


</style>