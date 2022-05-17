<template>
    <v-card class="gif-item">
        <img v-show="isLoaded" :src="info.images.fixed_width.url" alt="" @load="isLoaded = true">
        <v-icon v-if="canShare" class="share-btn" @click="share">mdi-share-variant</v-icon>

        <v-progress-circular
          v-if="!isLoaded"
          indeterminate
          color="primary"
        ></v-progress-circular>
        
        <!-- <v-card-title>{{ info.title }}</v-card-title> -->
    </v-card>
</template>

<script>
export default {
    name: 'GifCard',
    data: function() {
      return {
        isLoaded: false
      }
    },
    props: {
        info: Object
    },
    computed: {
      canShare() {
        return navigator.share
      }
    },
    methods: {
      share() {
        navigator.share({
          url: this.info.bitly_url,
          text: this.info.title,
        })
        .then(function () {
          console.log("Successfull")
        })
        .catch(function () {
          console.log("Failed")
        })
      }
    }
}
</script>

<style scoped lang="scss">
  .v-card {
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .share-btn {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;

        &.theme--light.v-icon {
          color: rgba(0, 0, 0, 0.9);
        }

        &:after {
          background: #fff;
          opacity: 0.2;
        }

        &:before {
          z-index: 1;
        }
    }
  }
</style>