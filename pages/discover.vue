<template>
  <v-row
    v-resize="onResize"
    class="ma-0 pa-0"
    style="display: flex; justify-content: center"
  >
    <v-col cols="8">
      <v-img
        min-width="100%"
        :min-height="currentWidth < 800 ? '20vh' : ''"
        :src="require('../static/discover/istanbul-discover.svg')"
        style="opacity: 1"
        @click="route('istanbul')"
      >
        <v-card flat class="cardStyle" color="transparent">
          <v-card-title
            class="cardTitleStyle"
            :style="
              currentWidth < 500
                ? { 'font-size': '1.2em' }
                : { 'font-size': '2em' }
            "
            >İstanbul</v-card-title
          >
        </v-card>
      </v-img>
      <v-img
        min-width="100%"
        :min-height="currentWidth < 800 ? '20vh' : ''"
        :src="require('../static/discover/izmir-discover.svg')"
        @click="route('izmir')"
      >
        <v-card flat class="cardStyle" color="transparent">
          <v-card-title
            class="cardTitleStyle"
            :style="
              currentWidth < 500
                ? { 'font-size': '1.2em' }
                : { 'font-size': '2em' }
            "
            >İzmir</v-card-title
          >
        </v-card></v-img
      >
      <v-img
        min-width="100%"
        :min-height="currentWidth < 800 ? '20vh' : ''"
        :src="require('../static/discover/antalya-discover.svg')"
        @click="route('antalya')"
      >
        <v-card flat class="cardStyle" color="transparent">
          <v-card-title
            class="cardTitleStyle"
            :style="
              currentWidth < 500
                ? { 'font-size': '1.2em' }
                : { 'font-size': '2em' }
            "
            >Antalya</v-card-title
          >
        </v-card></v-img
      >
      <div class="ma-0 pa-0 d-flex" style="max-width: 100%">
        <v-img
          max-width="50%"
          :min-height="currentWidth < 800 ? '20vh' : ''"
          :src="require('../static/discover/mugla-discover.svg')"
          @click="route('mugla')"
        >
          <v-card flat class="cardStyle" color="transparent">
            <v-card-title
              class="cardTitleStyle"
              :style="
                currentWidth < 500
                  ? { 'font-size': '1.2em' }
                  : { 'font-size': '2em' }
              "
              >Muğla</v-card-title
            >
          </v-card></v-img
        >
        <v-img
          max-width="50%"
          :min-height="currentWidth < 800 ? '20vh' : ''"
          :src="require('../static/discover/nevsehir-discover.svg')"
          @click="route('nevsehir')"
        >
          <v-card flat class="cardStyle" color="transparent">
            <v-card-title
              class="cardTitleStyle"
              :style="
                currentWidth < 500
                  ? { 'font-size': '1.2em' }
                  : { 'font-size': '2em' }
              "
              >Nevşehir</v-card-title
            >
          </v-card></v-img
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      currentWidth: '',
    }
  },
  methods: {
    onResize() {
      this.currentWidth = window.innerWidth
    },
    route(city) {
      this.$router.push({
        name: 'discoverCity___tr',
        query: { city: city },
      })
    },
  },
}
</script>

<style scoped>
.cardStyle {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: flex-end;
}
.cardTitleStyle {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  color: white;
  font-size: 2.5em;
  opacity: 1;
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0) 0%,
    rgba(30, 30, 30, 0.75) 100%
  );
  word-break: break-word;
}
</style>
