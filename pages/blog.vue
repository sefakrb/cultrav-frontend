<template>
  <v-row class="ma-0 pa-0">
    <v-col class="ma-0 pa-0" cols="12">
      <v-carousel
        height="75vh"
        cycle
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-img min-height="75vh" :src="require('../static/' + slide.image)">
            <v-card
              flat
              style="
                display: flex;
                height: 80%;
                width: 50%;
                align-items: flex-end;
              "
              color="transparent"
            >
              <v-card-title
                style="
                  height: 25%;
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-size: 2.5em;
                  opacity: 1;
                  background-color: rgba(0, 0, 0, 0.6);
                "
                >{{ slide.text }}</v-card-title
              >
            </v-card>
          </v-img>
        </v-carousel-item>
      </v-carousel>
      <v-row class="ma-0 pa-0" style="margin-top: 5% !important">
        <v-col cols="8">
          <v-card flat height="100vh"></v-card>
        </v-col>
        <v-col cols="3">
          <v-card color="#D9D9D9" height="100vh"> </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          image: 'ankara.png',
          text: "ANKARA'DA NE YENMELİ?",
        },
      ],
    }
  },
}
</script>

<style></style>
