<template>
  <v-app-bar width="100vw" app v-resize="resizeButtons" class="appBarStyle">
    <v-row>
      <!-- logo -->
      <v-col class="centerize" :cols="mobile ? '2' : '3'">
        <v-img
          class="logo"
          :max-width="currentWidth < 800 ? '90px' : '170px'"
          :src="require('../static/logo-cultrav.svg')"
          @click="routeHomePage"
        ></v-img>
      </v-col>

      <!-- butonlar desktop-->
      <v-col v-if="!mobile" class="centerize" cols="8">
        <v-btn
          depressed
          v-for="button in buttons"
          :key="button.title"
          :class="button.class"
          nuxt
          style="color: #727597"
          :to="button.route"
          >{{ button.title }}</v-btn
        >
        <!-- login butonu -->
        <v-btn
          v-if="!isLogged"
          depressed
          style="border-radius: 10px !important"
          class="loginButton"
          to="/login"
        >
          <v-icon small>mdi-account</v-icon>
          Üye Girişi</v-btn
        >

        <!-- login olduktan sonra user avatarı -->
        <v-menu v-if="isLogged" open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              rounded
              class="mx-10 loginButton"
              v-if="isLogged"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small>mdi-account</v-icon>
              {{ $auth.user ? $auth.user.user_name : '' }}
            </v-btn>
          </template>

          <v-list class="ma-0 pa-0">
            <v-btn
              class="ma-0 pa-0"
              depressed
              width="100%"
              outlined
              color="#727597"
              to="/changePassword"
              >Şifremi Değiştir</v-btn
            >
            <v-btn
              class="ma-0 pa-0"
              depressed
              width="100%"
              outlined
              color="#727597"
              to="/login"
              @click="logout"
              >Çıkış</v-btn
            >
          </v-list>
        </v-menu>
      </v-col>

      <!-- butonlar mobil-->
      <v-col
        v-if="mobile"
        style="color: transparent"
        class="d-flex justify-center align-center"
        :cols="colResize"
      >
        <v-card color="transparent" elevation="0" class="mx-auto">
          <v-slide-group multiple show-arrows>
            <v-slide-item v-for="button in buttons" :key="button.title">
              <v-btn depressed :class="button.class" nuxt :to="button.route">{{
                button.title
              }}</v-btn>
            </v-slide-item>
            <v-slide-item>
              <v-btn depressed class="loginButton" to="/login" v-if="!isLogged"
                >Üye Girişi</v-btn
              >
            </v-slide-item>
            <v-slide-item>
              <v-menu v-if="isLogged" open-on-hover bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    rounded
                    class="mx-10 loginButton"
                    v-if="isLogged"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon small>mdi-account</v-icon>

                    {{ $auth.user ? $auth.user.user_name : '' }}
                  </v-btn>
                </template>
                <v-list class="ma-0 pa-0">
                  <v-btn
                    class="ma-0 pa-0"
                    depressed
                    width="100%"
                    outlined
                    color="#727597"
                    to="/changePassword"
                    >Şifremi Değiştir</v-btn
                  >
                </v-list>
                <v-list class="ma-0 pa-0">
                  <v-btn
                    class="ma-0 pa-0"
                    depressed
                    width="100%"
                    outlined
                    color="#727597"
                    to="/login"
                    @click="logout"
                    >Çıkış</v-btn
                  >
                </v-list>
              </v-menu>
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
          title: 'Keşfet',
          class: 'buttonStyle',
          route: 'discover',
        },
        {
          title: 'Harita',
          class: 'buttonStyle',
          route: 'map',
        },
      ],
      isLogged: this.$auth.user,
      currentWidth: '',
    }
  },
  mounted() {
    this.$root.$on('logged', () => {
      this.isLogged = true
    })
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.isLogged = false
    },
    resizeButtons() {
      let width = window.innerWidth
      this.currentWidth = width

      if (width < 800 && width > 630) {
        this.mobile = true
        this.colResize = '8'
      } else if (width < 630 && width > 500) {
        this.mobile = true
        this.colResize = '6'
      } else if (width < 900 && width > 800) {
        this.mobile = false
        this.colResize = '8'
      } else if (width < 800) {
        this.mobile = true
        this.colResize = '4'
      } else {
        this.mobile = false
        this.colResize = '8'
      }
    },
    routeHomePage() {
      this.$router.push('/')
    },
  },
}
</script>

<style>
.appBarStyle {
  background-image: linear-gradient(
    to right,
    #ff914d,
    #ff9d74,
    #ffac9b,
    #ffbec1
  ) !important;
}

.centerize {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-btn {
  text-transform: unset !important;
}

/* .langButton {
  background-color: transparent !important;
  color: black;
  font-weight: 800;
} */

.buttonStyle {
  background-color: transparent !important;
  color: #727597 !important;
}

.loginButton {
  background-color: white !important;
  color: #727597 !important;
}

.logo:hover {
  cursor: pointer;
}

/* .languageStyle {
  background-color: white;
  border-bottom-left-radius: 20px 20px;
  border-bottom-right-radius: 20px 20px;
  color: #727597;
  font-weight: 800;
  height: 100%;
  min-width: 45px;
  margin-bottom: 4%;
  margin-left: 5%;
  padding-bottom: 1%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
} */
</style>
