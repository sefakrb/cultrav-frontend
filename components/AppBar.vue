<template>
  <v-app-bar width="100vw" app v-resize="resizeButtons" color="#FF914D">
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
          nuxt
          :to="button.route"
          >{{ button.title }}</v-btn
        >
        <v-btn depressed rounded class="loginButton">Üye Girişi</v-btn>

        <div
          style="
            background-color: white;
            border-bottom-left-radius: 20px 20px;
            border-bottom-right-radius: 20px 20px;
            color: black;
            font-weight: 800;
            height: 100%;
            min-width: 45px;
            margin-bottom: 4%;
            margin-left: 5%;
            padding-bottom: 1%;
            display: flex;
            align-items: flex-end;
            justify-content: center;
          "
        >
          EN
        </div>
      </v-col>

      <v-col
        v-if="mobile"
        style="color: transparent"
        class="d-flex justify-center align-center"
        :cols="colResize ? '8' : '5'"
      >
        <v-card color="transparent" elevation="0" class="mx-auto">
          <v-slide-group multiple show-arrows>
            <v-slide-item v-for="button in buttons" :key="button.title">
              <v-btn depressed :class="button.class" nuxt :to="button.route">{{
                button.title
              }}</v-btn>
            </v-slide-item>
            <v-slide-item>
              <v-btn depressed rounded class="loginButton">Üye Girişi</v-btn>
            </v-slide-item>
            <v-slide-item>
              <v-slide-item>
                <v-btn
                  class="langButton"
                  style="color: black; font-weight: 800"
                  depressed
                  >EN</v-btn
                >
              </v-slide-item>
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
          title: 'Blog',
          class: 'buttonStyle',
          route: 'blog',
        },

        {
          title: 'Hakkımızda',
          class: 'buttonStyle',
          route: 'aboutUs',
        },
        {
          title: 'İletişim',
          class: 'buttonStyle',
          route: 'connect',
        },
      ],
    }
  },
  methods: {
    resizeButtons() {
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
  font-weight: 800;
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
