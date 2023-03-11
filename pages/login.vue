<template>
  <v-row
    v-resize="onResize"
    style="height: 100vh"
    class="ma-0 pa-0 d-flex justify-center align-center"
  >
    <v-img
      style="display: flex; justify-content: center"
      :max-width="this.colResize !== '4' ? '80vw' : '50vw'"
      max-height="70vh"
      contain
      :src="require('static/login.svg')"
    >
      <v-card
        style="margin-top: 15%"
        :style="
          this.currentWidth < 800 && this.currentWidth > 700
            ? { 'margin-left': '21%' }
            : this.currentWidth < 800
            ? { 'margin-left': '18%' }
            : { 'margin-left': '22%' }
        "
        flat
        height="20vh"
        :width="this.colResize !== '4' ? '27vw' : '17vw'"
      >
        <v-text-field
          style="display: flex; align-items: center; justify-content: center"
          rounded
          color="rgb(255, 145, 77)"
          outlined
          dense
          label="username"
          type="text"
          v-model="userName"
        ></v-text-field>
        <v-text-field
          rounded
          color="rgb(255, 145, 77)"
          outlined
          dense
          label="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          v-model="password"
        ></v-text-field>
        <div class="d-flex flex-column justify-center align-center">
          <v-btn
            small
            color="rgb(255, 145, 77)"
            :width="this.currentWidth < '960' ? '60%' : '35%'"
            @click="login"
            style="color: white"
            >Giriş Yap</v-btn
          >
          <v-card-text
            class="ma-0 mt-3 pa-0"
            style="font-weight: 400; color: gray; text-align: center"
            >Hesabın yok mu?</v-card-text
          >
          <a href="/register" style="text-decoration: none">
            <v-card-text
              class="ma-0 pa-0"
              style="
                font-weight: 500;
                color: rgb(255, 145, 77);
                text-align: center;
              "
              >Kayıt ol</v-card-text
            >
          </a>
        </div>
      </v-card>
    </v-img>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      password: '',
      currentWidth: '',
      colResize: '',
      showPassword: false,
    }
  },

  mounted() {},

  methods: {
    async login() {
      const encrypted_pass = btoa(this.password)
      let loginWithAuth = null

      const user = {
        username: this.userName,
        password: encrypted_pass,
      }

      try {
        loginWithAuth = await this.$auth.loginWith('local', {
          data: user,
        })
      } catch (error) {
        this.$toast.error('Kullanıcı adı ya da şifre hatalı!', {
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

      if (loginWithAuth && loginWithAuth.status === 201) {
        this.$root.$emit('logged', true)
        this.$router.push('/')
        this.$toast.success('Giriş yapıldı', {
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
    },
    onResize() {
      this.currentWidth = window.innerWidth

      if (this.currentWidth < 800 && this.currentWidth > 610) {
        this.colResize = '3'
      } else if (this.currentWidth < 610 && this.currentWidth > 500) {
        this.colResize = '2'
      } else if (this.currentWidth < 800) {
        this.colResize = '1'
      } else {
        this.colResize = '4'
      }
    },
  },
}
</script>

<style>
.v-text-field {
  border-radius: 20px !important;
}
</style>
