<template>
  <v-app dark>
    <AppBar></AppBar>
    <v-main>
      <Nuxt />
      <v-footer color="#252525" padless>
        <v-col cols="12">
          <v-card-text style="color: white" class="text-center"
            >Bize ulaşın!</v-card-text
          >
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-col cols="4">
            <v-text-field
              dense
              background-color="white"
              rounded
              label="e-mail adresiniz"
            ></v-text-field>
          </v-col>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-icon color="blue">mdi-linkedin</v-icon>
          <v-icon color="pink">mdi-instagram</v-icon>
          <v-icon color="blue">mdi-twitter</v-icon>
          <v-icon color="blue">mdi-facebook</v-icon>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-img
            contain
            max-height="90px"
            :src="require('../static/logo-cultrav-white.png')"
          ></v-img>
        </v-col>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
}
</script>

<style>
html {
  overflow: auto;
  overflow-x: hidden;
}
</style>
