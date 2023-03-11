import Vue from 'vue'
import * as VueGoogleMaps from "vue2-google-maps" // Import package
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.MAP_KEY,
    libraries: "places"
  }
});