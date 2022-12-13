<template>
  <v-row class="ma-0 pa-0">
    <v-col cols="12">
      <h2>Vue Js Search and Add Marker</h2>
      <label>
        <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete>
        <button @click="addLocationMarker">Add</button>
      </label>
      <br />
    </v-col>

    <v-col cols="12">
      <gmap-map :zoom="5" :center="center" style="width: 100%; height: 70vh">
        <gmap-marker
          :key="index"
          v-for="(m, index) in locationMarkers"
          :position="m.position"
          @click="center = m.position"
          :clickable="true"
          :draggable="true"
        ></gmap-marker>
      </gmap-map>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AddGoogleMap',
  data() {
    return {
      center: {
        lat: 41.015137, //istanbul location
        lng: 28.97953,
      },
      locationMarkers: [
        {
          position: {
            lat: 41.015137, //istanbul location
            lng: 28.97953,
            label: 'Istanbul',
          },
        },
        {
          position: {
            lat: 39.7837304,
            lng: -100.4458825,
            label: 'United States',
          },
        },
        {
          lat: 38.6529545,
          lng: -90.2411166,
          label: 'St. Louis',
        },
        {
          lat: 41.3828939,
          lng: 2.1774322,
          label: 'Barcelona',
        },
        {
          lat: -10.3333333,
          lng: -53.2,
          label: 'Brazil',
        },
      ],
      locPlaces: [],
      existingPlace: null,
    }
  },

  mounted() {
    this.locateGeoLocation()
  },

  methods: {
    initMarker(loc) {
      this.existingPlace = loc
    },

    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng(),
        }
        this.locationMarkers.push({ position: marker })
        this.locPlaces.push(this.existingPlace)
        this.center = marker
        this.existingPlace = null
      }
    },

    locateGeoLocation() {
      navigator.geolocation.getCurrentPosition((res) => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        }
      })
    },
  },
}
</script>
