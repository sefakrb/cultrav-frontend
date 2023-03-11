<template>
  <v-row class="backgroundStyle centerize" v-resize="onResize">
    <v-col class="centerize flex-column" cols="6">
      <v-col class="pl-10" :cols="windowSize < 1000 ? '12' : '9'">
        <v-card-text
          :class="
            windowSize < 1000 && windowSize > 500
              ? 'midSize'
              : windowSize < 500
              ? 'smallSize'
              : 'largeSize'
          "
          class="textStyle"
          >HER ZAMAN</v-card-text
        >
        <v-card-text
          :class="
            windowSize < 1000 && windowSize > 500
              ? 'midSize'
              : windowSize < 500
              ? 'smallSize'
              : 'largeSize'
          "
          class="pt-0 textStyle"
          >GEZMEK ISTEDIGIN</v-card-text
        >
        <v-card-text
          :class="
            windowSize < 1000 && windowSize > 500
              ? 'midSize'
              : windowSize < 500
              ? 'smallSize'
              : 'largeSize'
          "
          class="pt-0 textStyle"
          >YERDE!</v-card-text
        >
      </v-col>
    </v-col>
    <v-col cols="6">
      <v-img
        max-height="40vh"
        contain
        :src="require('../static/Rectangle.png')"
      ></v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      windowSize: '',
    }
  },
  methods: {
    onResize() {
      this.windowSize = window.innerWidth
    },
  },
}
</script>

<style scoped>
.centerize {
  display: flex;
  justify-content: center;
  align-items: center;
}

.backgroundStyle {
  background-color: #252525;
  height: 42vh;
  margin: 0;
  padding: 0;
}

.textStyle {
  color: white;
  font-style: italic;
  font-size: 2em;
}

.smallSize {
  font-size: 1em;
}
.midSize {
  font-size: 1.6em;
}
.largeSize {
  font-size: 2em;
}
</style>
