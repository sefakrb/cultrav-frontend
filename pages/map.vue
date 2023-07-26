<template>
  <v-row class="ma-0 pa-0">
    <v-col cols="12" class="d-flex justify-center">
      <v-col cols="7">
        <v-progress-linear
          v-if="!isLocated"
          indeterminate
          color="rgb(255, 145, 77)"
        ></v-progress-linear>
        <v-select
          dense
          color="rgb(255, 145, 77)"
          v-if="isLocated"
          v-model="selectedCity"
          :items="cities"
          item-text="city"
          label="Şehir Seçiniz"
          persistent-hint
          return-object
          single-line
        ></v-select
      ></v-col>
    </v-col>

    <v-col cols="12">
      <gmap-map :zoom="8" :center="center" style="width: 100%; height: 70vh">
        <gmap-marker
          :key="index"
          v-for="(m, index) in locationMarkers"
          :position="m.position"
          @click="openDialog(m)"
          :clickable="true"
          :icon="
            m.position.icon
              ? {
                  url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi3_hdpi.png',
                  scaledSize: { width: 20, height: 30 },
                }
              : {
                  url: require('../static/mark.png'),
                  scaledSize: { width: 40, height: 40 },
                }
          "
          :draggable="false"
        ></gmap-marker>
      </gmap-map>
    </v-col>

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
        <!-- yorum yap ve yorumları göster butonu -->
        <div class="ma-0 mb-5 pa-0">
          <v-btn
            color="rgb(255, 145, 77)"
            rounded
            style="color: white"
            @click="makeCommentDialog = true"
            :disabled="!this.$auth.user"
            >Yorum Yap</v-btn
          >
          <v-btn
            color="rgb(255, 145, 77)"
            rounded
            style="color: white"
            @click="showComments"
            >Yorumlar</v-btn
          >
        </div>
      </v-card>
    </v-dialog>

    <!-- tarihi yerin yorumları dialogu -->
    <v-dialog
      @click:outside="noComment = false"
      width="50vw"
      v-model="allCommentsDialog"
    >
      <!-- content -->
      <div v-if="isLoaded" class="ma-0 pa-0">
        <v-card flat style="border-radius: 0">
          <!-- dialog kapatma -->
          <v-row
            class="ma-0 pa-0 d-flex justify-end"
            style="
              width: 100%;
              padding-right: 4% !important;
              padding-top: 2% !important;
            "
          >
            <v-icon
              @click="
                allCommentsDialog = false
                noComment = false
              "
            >
              mdi-close</v-icon
            ></v-row
          >
        </v-card>

        <!-- commnet varsa -->
        <v-card
          max-height="50vh"
          v-for="comment in comments"
          :key="comment.comment_id"
          flat
          style="border-radius: 0"
        >
          <v-card-subtitle
            style="font-weight: 600; color: black"
            class="pb-0"
            >{{ comment.owner_name }}</v-card-subtitle
          >
          <v-card-text>{{ comment.comment_context }}</v-card-text>
          <v-divider></v-divider>
        </v-card>

        <!-- comment yoksa -->
        <v-card
          v-if="noComment"
          max-height="50vh"
          flat
          style="
            border-radius: 0;
            display: flex;
            justify-content: center;
            padding-bottom: 5%;
          "
        >
          Maalesef yorum bulunmuyor.
        </v-card>
      </div>

      <!-- progress bar -->
      <v-card
        v-if="!isLoaded"
        flat
        min-height="30vh"
        style="
          border-radius: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <v-progress-circular
          indeterminate
          color="rgb(255, 145, 77)"
        ></v-progress-circular>
      </v-card>
    </v-dialog>

    <!-- tarihi yere yorum yapma dialogu -->
    <v-dialog width="50vw" v-model="makeCommentDialog">
      <v-card class="pa-5">
        <v-row
          class="ma-0 pa-0 d-flex justify-end"
          style="width: 100%; padding-right: 4% !important"
        >
          <v-icon @click="makeCommentDialog = false"> mdi-close</v-icon></v-row
        >
        <v-card-title style="justify-content: center">Yorum Yap</v-card-title>
        <v-textarea
          no-resize
          clearable
          v-model="newComment"
          label="Yorum"
          outlined
          dense
          color="rgb(255, 145, 77)"
        ></v-textarea>
        <div
          id="send-button"
          class="ma-0 pa-0"
          style="display: flex; justify-content: center"
        >
          <v-btn
            color="rgb(255, 145, 77)"
            rounded
            style="color: white"
            @click="makeComment"
            >Gönder</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'AddGoogleMap',
  data() {
    return {
      currentPlace: null,
      center: {
        lat: 39.925533,
        lng: 30.866287,
        icon: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi3_hdpi.png',
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
      dialogState: false,
      selectedCity: '',
      cities: [
        {
          city: 'Ankara',
          lat: 39.925533,
          lng: 32.866287,
        },
        {
          city: 'Antalya',
          lat: 36.896893,
          lng: 30.713324,
        },
        {
          city: 'Aydin',
          lat: 37.853512,
          lng: 27.843809,
        },
        {
          city: 'Istanbul',
          lat: 41.015137,
          lng: 28.97953,
        },
        {
          city: 'Izmir',
          lat: 38.423733,
          lng: 27.142826,
        },
        {
          city: 'Londra',
          lat: 51.507351,
          lng: -0.127758,
        },
        {
          city: 'Mugla',
          lat: 36.83474,
          lng: 28.643204,
        },
        {
          city: 'Nevsehir',
          lat: 38.626995,
          lng: 34.719975,
        },
        {
          city: 'New York',
          lat: 40.73061,
          lng: -73.935242,
        },
        {
          city: 'Paris',
          lat: 48.864716,
          lng: 2.349014,
        },
        {
          city: 'Prag',
          lat: 50.073658,
          lng: 14.41854,
        },
        {
          city: 'Roma',
          lat: 41.902782,
          lng: 12.496366,
        },
        {
          city: 'Tayland',
          lat: 13.736717,
          lng: 100.523186,
        },
      ],
      locations: '',
      fetchedCityLocations: '',
      locationName: '',
      locationInfo: '',
      locationImage: '',
      isLocated: false,
      deviceType: '',
      allCommentsDialog: false,
      makeCommentDialog: false,
      comments: [],
      newComment: '',
      choosenLocation: '',
      isLoaded: false,
      noComment: false,
    }
  },

  mounted() {
    this.locateGeoLocation()
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      this.deviceType = this.getMobileOperatingSystem()
      this.locations = await this.$axios.$get('location/all').then((data) => {})
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

    locateGeoLocation() {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          this.center = {
            lat: res.coords.latitude,
            lng: res.coords.longitude,
            icon: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi3_hdpi.png',
          }
          this.currentPlace = { position: this.center }
          this.locationMarkers.push({ position: this.center })
          this.isLocated = true
        },
        () => {
          this.center = {
            lat: 39.925533,
            lng: 32.866287,
          }
          this.isLocated = true
        }
      )
    },

    setPlace(place) {
      this.currentPlace = place
    },

    openDialog(markData) {
      this.choosenLocation = markData
      if (markData.location_infos) {
        let info = markData.location_infos.locationInfo
        const splitted = info.split('.')
        let text = ''
        for (let index = 0; index < splitted.length; index++) {
          const element = splitted[index]
          if (index === 4) {
            text += '..'
            break
          } else {
            text += element + '.'
          }
        }

        this.locationName = markData.location_infos.locationName
        this.locationInfo = text
        this.locationImage = markData.location_infos.locationImage
      } else {
        this.locationName = 'Current Location'
        this.locationInfo = 'Current Location'
        this.locationImage = 'Current Location'
      }

      this.dialogState = true
    },

    async fetchCity(city) {
      this.center = {
        lat: city.lat,
        lng: city.lng,
      }

      this.fetchedCityLocations = await this.$axios
        .$get('location/' + city.city)
        .then((data) => {
          for (let location of data) {
            let splitLocation = location.locationLocation.split(',')
            this.locationMarkers.push({
              position: {
                lat: parseFloat(splitLocation[0]),
                lng: parseFloat(splitLocation[1]),
              },
              location_infos: location,
            })
          }
        })
    },

    // tarihi yere yapılan yorumları gösteriyor
    async showComments() {
      this.allCommentsDialog = true
      await this.$axios
        .$get(
          'comments/' + parseInt(this.choosenLocation.location_infos.locationID)
        )
        .then((data) => {
          this.comments = data
          this.isLoaded = true
          if (data.length <= 0) {
            this.noComment = true
          }
        })
    },

    // tarihi yere yorum  yaptırıyor
    async makeComment() {
      this.$axios.setHeader(
        'user',
        JSON.stringify({
          user_id: this.$auth.user.user_id,
          user_name: this.$auth.user.user_name,
        })
      )
      this.$axios.setHeader(
        'location_id',
        parseInt(this.choosenLocation.location_infos.locationID)
      )
      this.$axios
        .post('/comments', {
          comment_context: this.newComment,
        })
        .then((response) => {
          // yorum kaydedilirse gösterilecek
          if (response.data.code === '1') {
            this.$toast.success('Yorumunuz başarıyla kaydedildi!', {
              position: 'top-right',
              timeout: 2000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: 'button',
              icon: true,
              rtl: false,
            })
            this.makeCommentDialog = false
            this.showComments()
          }
          //yorum kaydedilemezse gösterilecek
          else if (response.data.code === '0') {
            this.$toast.error('Yorumuzun kaydedilemedi tekrar deneyiniz!', {
              position: 'top-right',
              timeout: 2000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: 'button',
              icon: true,
              rtl: false,
            })
          }
        })
    },
  },

  watch: {
    selectedCity: {
      handler(n, o) {
        this.locationMarkers =
          this.currentPlace != null
            ? [{ position: this.currentPlace.position }]
            : []
        this.center = {
          lat: '',
          lng: '',
        }
        this.fetchCity(n)
      },
    },
  },
}
</script>

<style>
.v-dialog {
  border-radius: 30px;
}
</style>
