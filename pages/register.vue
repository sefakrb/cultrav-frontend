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
      :src="require('static/register.svg')"
    >
      <v-card
        :style="
          this.colResize !== '4'
            ? { 'margin-left': '10%', 'margin-top': '10%' }
            : { 'margin-left': '17%', 'margin-top': '12%' }
        "
        flat
        height="25vh"
        :width="this.colResize !== '4' ? '35vw' : '18vw'"
      >
        <v-text-field
          rounded
          :class="
            this.colResize === '1' ? 'textFieldSizeMobile' : 'textFieldSize'
          "
          max-height="20px"
          color="rgb(255, 145, 77)"
          outlined
          dense
          label="username"
          type="text"
          v-model="username"
        ></v-text-field>
        <v-text-field
          rounded
          :class="
            this.colResize === '1' ? 'textFieldSizeMobile' : 'textFieldSize'
          "
          color="rgb(255, 145, 77)"
          outlined
          dense
          label="email"
          :rules="[rules.required, rules.email]"
          type=""
          v-model="email"
        ></v-text-field>
        <v-text-field
          rounded
          :class="
            this.colResize === '1' ? 'textFieldSizeMobile' : 'textFieldSize'
          "
          color="rgb(255, 145, 77)"
          outlined
          dense
          label="password"
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-text-field
          rounded
          :class="
            this.colResize === '1' ? 'textFieldSizeMobile' : 'textFieldSize'
          "
          color="rgb(255, 145, 77)"
          outlined
          dense
          label="password again"
          v-model="passwordAgain"
          :append-icon="showPasswordAgain ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPasswordAgain ? 'text' : 'password'"
          @click:append="showPasswordAgain = !showPasswordAgain"
          class="pb-0"
        ></v-text-field>
        <div class="d-flex justify-center">
          <v-btn
            :disabled="enableRegister"
            small
            color="rgb(255, 145, 77)"
            width="20%"
            style="color: white"
            @click="register"
            >Kayıt Ol</v-btn
          >
        </div>
      </v-card>
    </v-img>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordAgain: '',
      currentWidth: '',
      colResize: '',
      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => value.length <= 20 || 'Max 20 characters',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (pattern.test(value)) {
            this.validEmailControl(true)
          } else {
            this.validEmailControl(false)
          }
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
      isValidEmail: false,
      showPassword: false,
      showPasswordAgain: false,
    }
  },

  mounted() {},

  methods: {
    async register() {
      const encrypted_pass = btoa(this.password)

      const user = {
        username: this.username,
        email: this.email,
        password: encrypted_pass,
      }

      await this.$axios.$post('users/register', user).then((data) => {
        if (data.code === '0') {
          this.$toast.warning('Kullanıcı zaten kayıtlı!', {
            position: 'top-right',
            timeout: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.63,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })
        } else if (data.code === '1') {
          this.$toast.success('Kullanıcı kayıt oldu', {
            position: 'top-right',
            timeout: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.63,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })
          this.$router.push('/login')
        }
      })
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

    validEmailControl(bool) {
      this.isValidEmail = bool
    },
  },

  computed: {
    enableRegister() {
      if (
        this.username &&
        this.email &&
        this.isValidEmail &&
        this.password === this.passwordAgain
      ) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style>
.textFieldSize {
  border-radius: 20px !important;
  min-height: 40px;
}

.textFieldSizeMobile {
  border-radius: 20px !important;
  max-height: 40px;
  margin-bottom: 4% !important;
}
</style>
