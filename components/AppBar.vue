<template>
  <v-app-bar app v-resize="resizeButtons" color="#FF914D">
    <v-row>
      <v-col class="centerize" :cols="mobile ? '3' : '5'">
        <v-img
          max-width="170px"
          :src="require('../static/logo-cultrav.png')"
        ></v-img>
      </v-col>

      <v-col v-if="!mobile" class="centerize" cols="5">
        <v-btn
          depressed
          v-for="button in buttons"
          :key="button.title"
          :class="button.class"
          >{{ button.title }}</v-btn
        >
        <v-btn depressed rounded class="loginButton">Üye Girişi</v-btn>
      </v-col>

      <v-col
        v-if="mobile"
        style="color: transparent"
        class="d-flex justify-center align-center"
        :cols="colResize ? '8' : '5'"
      >
        <v-card color="transparent" elevation="0" class="mx-auto">
          <v-slide-group multiple show-arrows>
            <v-slide-item
              v-for="button in buttons"
              :key="button.title"
              v-slot="{ active }"
            >
              <v-btn depressed :class="button.class">{{ button.title }}</v-btn>
            </v-slide-item>
            <v-slide-item>
              <v-btn depressed rounded class="loginButton">Üye Girişi</v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-card>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      mobile: false,
      colResize: false,
      buttons: [
        {
          title: 'EN',
          class: 'langButton',
        },
        {
          title: 'Blog',
          class: 'buttonStyle',
        },
        {
          title: 'Hakkımızda',
          class: 'buttonStyle',
        },
        {
          title: 'İletişim',
          class: 'buttonStyle',
        },
      ],
    }
  },
  methods: {
    resizeButtons() {
      console.log(window.innerWidth)
      let width = window.innerWidth
      if (width < 690 && width > 500) {
        this.mobile = true
        this.colResize = true
      } else if (width < 690) {
        this.mobile = true
        this.colResize = false
      } else {
        this.mobile = false
        this.colResize = false
      }
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
.v-btn {
  text-transform: unset !important;
}

.langButton {
  background-color: transparent !important;
  color: black;
}
.buttonStyle {
  background-color: transparent !important;
  color: white;
}

.loginButton {
  background-color: black !important;
  color: white;
}
</style>
