<template>
  <v-row v-resize="onResize" class="ma-0 pa-0">
    <v-col class="ma-0 pa-0" cols="12">
      <!-- karosel -->
      <v-carousel
        height="75vh"
        cycle
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(article, i) in articles" :key="i">
          <v-btn
            tile
            style="width: 100%; height: 100%; margin: 0; padding: 0"
            nuxt
            :to="{
              name: 'slug___tr',
              params: { slug: article.slug },
            }"
          >
            <v-img
              style="opacity: 1"
              min-height="75vh"
              max-height="75vh"
              :src="require('../static/' + article.img)"
              nuxt
            >
              <v-card flat class="cardStyle" color="transparent">
                <v-card-title
                  class="cardTitleStyle"
                  :style="
                    currentWidth < 500
                      ? { 'font-size': '1.5em', 'margin-left': '7rem' }
                      : { 'font-size': '2em', 'margin-left': '2%' }
                  "
                  >{{ article.title }}</v-card-title
                >
              </v-card>
            </v-img>
          </v-btn>
        </v-carousel-item>
      </v-carousel>

      <v-card-title
        style="
          justify-content: center;
          font-size: 2.5rem;
          margin-top: 3rem;
          font-style: italic;
          font-weight: 800;
        "
        >BLOG YAZILARI</v-card-title
      >

      <!-- bloglar -->
      <v-row
        class="ma-0 pa-0"
        style="
          margin-top: 5% !important;
          display: flex;
          justify-content: center;
        "
      >
        <v-col cols="11">
          <v-card
            v-for="article of articles"
            :key="article.title"
            style="margin-bottom: 1rem; display: flex; overflow-x: auto"
            height="35vh"
            rounded="xl"
          >
            <!-- blog resmi -->
            <v-col
              cols="3"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <v-img
                contain
                max-height="20vh"
                :src="require(`~/static/${article.img}`)"
                alt=""
              />
            </v-col>

            <!-- blog başlığı ve açıklaması -->
            <v-col
              cols="9"
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-around;
              "
            >
              <v-card-title>{{ article.title }}</v-card-title>
              <v-card-text>{{ article.description }}</v-card-text>
              <v-card-text style="padding-top: 0">
                <v-btn
                  color="#FF914D"
                  small
                  outlined
                  :to="{
                    name: 'slug___tr',
                    params: { slug: article.slug },
                  }"
                  >OKU</v-btn
                >
              </v-card-text>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('blog', params.slug)
      .only(['title', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch()
    return {
      articles,
    }
  },

  data() {
    return {
      slides: [
        {
          image: 'ankara.png',
          text: "ANKARA'DA NE YENMELİ?",
        },
      ],
      currentWidth: '',
    }
  },

  methods: {
    onResize() {
      this.currentWidth = window.innerWidth
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
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0) 0%,
    rgba(30, 30, 30, 0.75) 100%
  );
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

  word-break: break-word;

  margin-bottom: 2%;
  margin-left: 2%;
}
</style>
