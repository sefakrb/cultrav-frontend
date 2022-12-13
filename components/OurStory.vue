<template>
  <v-row v-resize="onResize" style="height: 80vh" class="ma-0 pa-0 bg">
    <v-col style="margin-top: 4%" cols="6">
      <v-card-title
        style="
          font-style: italic;
          font-weight: 800;
          color: #ffffff;
          font-size: 5em;
        "
        :style="{ 'font-size': titleSize }"
        >Hikayemiz</v-card-title
      >
    </v-col>
    <v-col class="d-flex align-center" cols="6">
      <v-card
        color="rgba(0, 0, 0, 0.5)"
        height="70%"
        class="d-flex align-center"
      >
        <v-card-text
          style="
            font-weight: 600;
            font-size: 1.2em;
            font-style: italic;
            color: #ffffff;
          "
          :style="{ 'font-size': textSize, 'line-height': lineHeight }"
          class="text-center"
        >
          Tarihi yerler hakkında neleri merak ediyorsunuz? <br />
          Biz tarihleri, mitolojik öyküleri ve mimarileri gibi birçok şeyi merak
          eden bir ekibiz. Ancak ortada bir sorun olduğunu ve bizim merak
          ettiğimiz tüm bilgilere hızlı, kolay ve doğru şekilde ulaşamadığımızı
          gördük. Bunun üzerine hem kendimiz için hem de bizim gibi bu sorunları
          yaşayan sizler için efektif bir çözüm üretmeye karar verdik. Bu
          şekilde Ağustos 2021’de “CULTRAV” projesi üzerinde çalışmaya başladık.
        </v-card-text>
      </v-card></v-col
    >
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      titleSize: '',
      lineHeight: '',
      textSize: '',
    }
  },

  methods: {
    onResize() {
      console.log(window.innerWidth)
      if (window.innerWidth < 425) {
        this.textSize = '0.8em'
        this.titleSize = '1.6em'
        this.lineHeight = '15px'
      } else if (window.innerWidth < 600) {
        this.textSize = '0.8em'
        this.titleSize = '2em'
        this.lineHeight = '16px'
      } else if (window.innerWidth > 600 && window.innerWidth < 900) {
        this.textSize = '0.9em'
        this.titleSize = '3em'
        this.lineHeight = '25px'
      } else if (window.innerWidth > 900 && window.innerWidth < 1200) {
        this.textSize = '1.1em'
        this.titleSize = '4em'
        this.lineHeight = '27px'
      } else {
        this.textSize = '1.2em'
        this.titleSize = '4.5em'
        this.lineHeight = '40px'
      }
    },
  },
}
</script>

<style scoped>
.bg {
  background-image: url('../static/aboutUs-background.png');
  background-repeat: no-repeat, no-repeat;
  background-size: cover;
}
</style>
