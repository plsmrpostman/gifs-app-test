<template>
  <v-row no-gutters>
    <v-col 
    cols="12"
    class="search-input-wrapper"
    >
      <v-text-field
        label="Find gif..."
        outlined
        v-model.trim="searchQuery"
        append-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'SearchField',
    data: () => ({
      debounceTimeout: null,
      debouncedSearchQuery: '',
    }),
    watch: {
      searchQuery(value) {
        this.$parent.$emit('searchQueryChange', value)
      }
    },
    computed: {
      searchQuery: {
        get() {
          return this.debouncedSearchQuery;
        },
        set(val) {
          if (this.debounceTimeout) clearTimeout(this.debounceTimeout);

          this.debounceTimeout = setTimeout(() => {
            this.debouncedSearchQuery = val;
          }, 500)
        }
      }
    },
  }
</script>

<style scoped>
  .search-input-wrapper {
    margin-top: 10px;
  }
</style>