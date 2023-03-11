<template>
  <v-row
    v-resize="onResize"
    style="
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <v-row
      class="ma-0 pa-0"
      style="
        height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <v-col :cols="currentWidth < 800 ? '8' : '4'">
        <v-text-field
          dense
          rounded
          label="eski şifre"
          outlined
          color="rgb(255, 145, 77)"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
          v-model="oldPassword"
        ></v-text-field>
        <v-text-field
          dense
          rounded
          label="yeni şifre"
          outlined
          color="rgb(255, 145, 77)"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          @click:append="show2 = !show2"
          v-model="newPassword"
        ></v-text-field>
        <v-text-field
          dense
          rounded
          label="yeni şifre tekrar"
          outlined
          color="rgb(255, 145, 77)"
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show3 ? 'text' : 'password'"
          @click:append="show3 = !show3"
          v-model="newPasswordAgain"
        ></v-text-field>
      </v-col>
      <v-col cols="4" style="display: flex; justify-content: center">
        <v-btn
          :disabled="enableChangePassword"
          rounded
          color="rgb(255, 145, 77)"
          style="color: white"
          @click="changePassword"
        >
          Şifremi Yenile
        </v-btn>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
      show1: false,
      show2: false,
      show3: false,
      currentWidth: '',
    }
  },
  methods: {
    onResize() {
      this.currentWidth = window.innerWidth
    },

    async changePassword() {
      const encrypted_oldPass = btoa(this.oldPassword)
      const encrypted_newPass = btoa(this.newPassword)

      const passwords = {
        oldPassword: encrypted_oldPass,
        newPassword: encrypted_newPass,
      }

      this.$axios.setHeader('user_id', this.$auth.user.user_id)
      await this.$axios
        .$post('users/change-password', passwords)
        .then((response) => {
          if (response.code === '1') {
            this.$toast.success('Şifreniz başarıyla değiştirildi!', {
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
            this.$router.push('/')
          } else {
            this.$toast.error('Eski şifre hatalı!', {
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

  computed: {
    enableChangePassword() {
      if (
        this.oldPassword &&
        this.newPassword &&
        this.newPasswordAgain &&
        this.newPassword === this.newPasswordAgain
      ) {
        return false
      }
      return true
    },
  },
}
</script>

<style></style>
