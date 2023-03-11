<template>
  <v-row
    v-resize="onResize"
    class="ma-0 pa-0"
    style="display: flex; justify-content: center"
  >
    <v-col cols="10">
      <!-- city image -->
      <v-img
        min-width="100%"
        max-height="60vh"
        :src="require('../static/discover/' + city + '-discover.svg')"
        style="opacity: 1"
      >
        <v-card flat class="cardStyle" color="transparent">
          <v-card-title
            class="cardTitleStyle"
            :style="
              currentWidth < 500
                ? { 'font-size': '1.2em' }
                : { 'font-size': '2em' }
            "
          >
            {{
              city === 'mugla'
                ? 'Muğla'
                : city.charAt(0) === 'i'
                ? 'İ' + city.slice(1)
                : city.charAt(0).toUpperCase('') + city.slice(1)
            }}</v-card-title
          >
        </v-card>
      </v-img>

      <!-- tarihi yerler, aktiviteler, oteller -->
      <div class="ma-0 pa-0" style="display: flex; margin-top: 3% !important">
        <!-- tarihi yerler kartı-->
        <v-card
          @click="scrollNearest('cultral-places')"
          width="32%"
          max-height="30vh"
          class="mx-2"
          rounded="xl"
        >
          <v-img
            max-height="30vh"
            min-height="20vh"
            :src="require('static/tarihi-yerler.svg')"
          >
            <v-card flat class="cardStyle" color="transparent">
              <v-card-title
                class="cardTitleStyle"
                style="font-size: 1em !important"
              >
                Tarihi Yerler
              </v-card-title>
            </v-card>
          </v-img>
        </v-card>

        <!-- aktiviteler kartı -->
        <v-card
          @click="scrollNearest('activities')"
          width="32%"
          max-height="30vh"
          class="mx-2"
          rounded="xl"
        >
          <v-img
            max-height="30vh"
            min-height="20vh"
            :src="require('static/aktiviteler.svg')"
          >
            <v-card flat class="cardStyle" color="transparent">
              <v-card-title
                class="cardTitleStyle"
                style="font-size: 1em !important"
                >Aktiviteler ve Turlar
              </v-card-title>
            </v-card>
          </v-img>
        </v-card>

        <!-- oteller kartı -->
        <v-card
          @click="scrollNearest('hotels')"
          width="32%"
          max-height="30vh"
          class="mx-2"
          rounded="xl"
        >
          <v-img
            max-height="30vh"
            min-height="20vh"
            :src="require('static/oteller.svg')"
          >
            <v-card flat class="cardStyle" color="transparent">
              <v-card-title
                class="cardTitleStyle"
                style="font-size: 1em !important"
              >
                Oteller
              </v-card-title>
            </v-card>
          </v-img>
        </v-card>
      </div>

      <!-- divider -->
      <div class="divider" style="width: 100%; margin-top: 3%">
        <v-divider></v-divider>
      </div>

      <!-- tarihi yerler kısmı detay -->
      <div id="cultral-places" class="ma-0 pa-0">
        <!-- header kısmı -->
        <div
          class="ma-0 pa-0"
          style="width: 100%; display: flex; justify-content: space-between"
        >
          <v-card-title style="font-weight: 700; color: #ff914d"
            >Tarihi Yerler</v-card-title
          >
          <v-card-title
            style="font-weight: 300; color: #ff914d; font-size: medium"
            >Daha Fazlası</v-card-title
          >
        </div>

        <!-- tarihi yerler -->
        <v-slide-group v-model="model" center-active show-arrows>
          <v-slide-item
            v-for="locationInfos in fetchedCityLocations"
            :key="'Tarihi' + locationInfos.locationID"
            v-slot="{ active, toggle }"
          >
            <v-card
              color="transparent"
              class="ma-4"
              :width="currentWidth < 600 ? '40vw' : '20vw'"
              max-height="65vh"
              elevation="0"
              @click="toggle, showDetails(locationInfos)"
            >
              <v-img
                style="border-radius: 15px"
                max-height="30vh"
                min-height="30vh"
                :src="locationInfos.locationImage"
              >
              </v-img>
              <v-card-text
                style="
                  text-align: center;
                  color: black;
                  font-weight: 400;
                  font-size: medium;
                "
                >{{ locationInfos.locationName }}</v-card-text
              >
            </v-card>
          </v-slide-item>
        </v-slide-group>

        <!-- tarihi yer detay dialogu -->
        <v-dialog width="60vw" v-model="dialogState">
          <v-card
            max-height="75vh"
            class="d-flex flex-column align-center"
            style="overflow: auto"
          >
            <v-row
              class="ma-0 pa-0 d-flex justify-end"
              style="
                width: 100%;
                padding-right: 4% !important;
                margin-top: 2% !important;
                margin-bottom: 2% !important;
              "
            >
              <v-icon @click="dialogState = false"> mdi-close</v-icon></v-row
            >
            <v-img
              v-if="this.locationImage != 'Current Location'"
              max-width="50vw"
              max-height="30vh"
              :src="this.locationImage"
            ></v-img>
            <v-card-title>{{ this.locationName }}</v-card-title>
            <v-card-text v-if="this.locationInfo != 'Current Location'"
              >{{ this.locationInfo
              }}<a
                :href="
                  deviceType === 'ios'
                    ? 'https://apps.apple.com/tr/app/cultrav/id1622312242?l=tr'
                    : deviceType === 'android'
                    ? 'https://play.google.com/store/apps/details?id=com.cultrav&gl=TR'
                    : 'https://play.google.com/store/apps/details?id=com.cultrav&gl=TR'
                "
                target="_blank"
                style="
                  text-decoration: none;
                  font-style: italic;
                  color: rgb(255, 145, 77);
                "
                >Daha fazlası için mobil uygulamamızı indirin</a
              ></v-card-text
            >
          </v-card>
        </v-dialog>
      </div>

      <!-- divider -->
      <div class="divider" style="width: 100%; margin-top: 3%">
        <v-divider></v-divider>
      </div>

      <!-- aktiviteler kısmı detay -->
      <div class="ma-0 pa-0" id="activities">
        <!-- header kısmı -->
        <div
          class="ma-0 pa-0"
          style="width: 100%; display: flex; justify-content: space-between"
        >
          <v-card-title style="font-weight: 700; color: #ff914d"
            >Aktiviteler & Turlar</v-card-title
          >
          <v-card-title
            style="font-weight: 300; color: #ff914d; font-size: medium"
            >Daha Fazlası</v-card-title
          >
        </div>

        <!-- aktiviteler -->
        <v-slide-group v-model="model" center-active show-arrows>
          <v-slide-item
            v-for="activity in externalActivitiesAndTours"
            :key="'Activity' + activity.id"
            v-slot="{ active, toggle }"
          >
            <v-card
              color="transparent"
              class="ma-4"
              :width="currentWidth < 600 ? '40vw' : '20vw'"
              max-height="65vh"
              elevation="0"
              @click="toggle, navigateToExternalPage(activity.url)"
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              "
            >
              <!-- aktivite resmi -->
              <v-img
                style="border-radius: 15px"
                max-height="30vh"
                min-height="30vh"
                :src="activity.imageLink"
              >
              </v-img>

              <!-- aktivite adı -->
              <v-card-text
                style="
                  text-align: center;
                  font-weight: 400;
                  font-size: medium;
                  color: black;
                "
                >{{ activity.name }}</v-card-text
              >

              <!-- aktivite degerlendirmesi -->
              <div id="aktivite-degerlendirmesi" class="ma-0 pa-0">
                <!-- aktivite yıldızı -->
                <div
                  class="ma-0 pa-0"
                  style="dipslay: flex; text-align: center"
                  id="star-part"
                >
                  <v-icon
                    id="realStar"
                    v-for="star in activity.starCount"
                    :key="'RA' + star"
                    class="pl-1"
                    >mdi-star</v-icon
                  >
                  <v-icon
                    id="emptyStar"
                    v-for="star2 in 5 - activity.starCount"
                    :key="'FH' + star2"
                    >mdi-star-outline
                  </v-icon>

                  <span style="font-size: small">
                    {{ activity.starCount }} / 5
                  </span>
                </div>

                <!-- aktivite fiyatı -->
                <v-card-text style="text-align: center"
                  >Fiyat: {{ activity.price }} ₺</v-card-text
                >
              </div>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </div>

      <!-- divider -->
      <div class="divider" style="width: 100%; margin-top: 3%">
        <v-divider></v-divider>
      </div>

      <!-- oteller kısmı detay -->
      <div class="ma-0 pa-0" id="hotels">
        <!-- header kısmı -->
        <div
          class="ma-0 pa-0"
          style="width: 100%; display: flex; justify-content: space-between"
        >
          <v-card-title style="font-weight: 700; color: #ff914d"
            >Oteller</v-card-title
          >
          <v-card-title
            style="font-weight: 300; color: #ff914d; font-size: medium"
            >Daha Fazlası</v-card-title
          >
        </div>

        <!-- oteller -->
        <v-slide-group v-model="model" center-active show-arrows>
          <v-slide-item
            v-for="hotel in externalHotels"
            :key="'Hotel' + hotel.id"
            v-slot="{ active, toggle }"
          >
            <v-card
              color="transparent"
              class="ma-4"
              :width="currentWidth < 600 ? '40vw' : '20vw'"
              max-height="65vh"
              elevation="0"
              @click="toggle, navigateToExternalPage(hotel.url)"
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              "
            >
              <!-- hotel resmi -->
              <v-img
                style="border-radius: 15px"
                max-height="30vh"
                min-height="30vh"
                :src="hotel.imageLink"
              >
              </v-img>

              <!-- hotel adı -->
              <v-card-text
                style="
                  text-align: center;
                  font-weight: 400;
                  font-size: medium;
                  color: black;
                "
                >{{ hotel.name }}</v-card-text
              >

              <!-- hotel degerlendirmesi -->
              <div id="hotel-degerlendirmesi" class="ma-0 pa-0">
                <!-- hotel yıldızı -->
                <div
                  class="ma-0 pa-0"
                  style="dipslay: flex; text-align: center"
                  id="star-part"
                >
                  <v-icon
                    id="realStar"
                    v-for="star in hotel.starCount"
                    :key="'RH' + star"
                    class="pl-1"
                    >mdi-star</v-icon
                  >
                  <v-icon
                    id="emptyStar"
                    v-for="star2 in 5 - hotel.starCount"
                    :key="'FH' + star2"
                    >mdi-star-outline
                  </v-icon>

                  <span style="font-size: small">
                    {{ hotel.starCount }} / 5
                  </span>
                </div>

                <!-- hotel fiyatı -->
                <!-- <v-card-text style="text-align: center"
                  >Fiyat: {{ hotel.price }} ₺</v-card-text
                > -->
              </div>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      city: '',
      currentWidth: '',
      fetchedCityLocations: [],
      externalHotels: [],
      externalActivitiesAndTours: [],
      model: null,
      dialogState: false,
      locationImage: '',
      locationInfo: '',
      locationName: '',
      deviceType: '',
    }
  },

  created() {
    this.city = this.$route.query.city
    this.fetchLocations()
    this.fetchExternalSources()
  },

  mounted() {},

  methods: {
    onResize() {
      this.currentWidth = window.innerWidth
    },

    async fetchLocations() {
      await this.$axios.$get('location/' + this.city).then((locations) => {
        this.fetchedCityLocations = locations
      })
    },

    async fetchExternalSources() {
      this.$axios.$get('/external-sources/' + this.city).then((response) => {
        this.externalHotels = response.hotels
        this.externalActivitiesAndTours = response.activitiesAndTours
      })
    },

    showDetails(data) {
      this.dialogState = true
      this.locationImage = data.locationImage
      this.locationInfo = data.locationInfo
      this.locationName = data.locatioName
    },

    scrollNearest(data) {
      const yOffset = -75
      const element = document.getElementById(data)
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    },

    getMobileOperatingSystem() {
      let userAgent = navigator.userAgent || navigator.vendor || window.opera

      if (/android/i.test(userAgent)) {
        return 'android'
      }

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios'
      }

      return 'unknown'
    },

    navigateToExternalPage(url) {
      window.open(url, '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
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

.cardTitleStyle2 {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  color: white;
  font-size: 1em;
  opacity: 1;
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0) 0%,
    rgba(30, 30, 30, 0.75) 100%
  );
  word-break: break-word;
}

#cultral-places {
  // ::v-deep .theme--light.v-divider {
  //   border-color: #ff914d !important;
  // }

  // ::v-deep .v-icon.v-icon {
  //   border-radius: 15px;
  //   border: 2px solid #ff914d !important;
  //   background-color: #ff914d;
  // }

  // ::v-deep .theme--light.v-icon.v-icon {
  //   color: white !important;
  // }
}

#realStar {
  color: #ff914d;
}

#emptyStar {
  color: #ff914d;
}
</style>
