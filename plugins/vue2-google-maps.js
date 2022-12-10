import Vue from 'vue'
import * as VueGoogleMaps from "vue2-google-maps" // Import package
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBYEdOCXuYaMx55p_2K4cu_LP_ywo3MCLw",
    libraries: "places"
  }
});