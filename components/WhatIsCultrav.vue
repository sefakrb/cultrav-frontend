<template>
  <v-row
    v-resize="onResize"
    class="ma-0 pa-0 bg"
    style="
      padding-top: 6% !important;
      padding-bottom: 6% !important;
      width: 100vw;
    "
  >
    <v-col class="d-flex justify-center" cols="12">
      <v-card-title
        style="font-style: italic; font-weight: 800; color: #ffffff"
        :style="{ 'font-size': titleSize }"
      >
        Peki Cultrav Nedir?</v-card-title
      >
    </v-col>
    <v-col style="padding-left: 5%" class="d-flex align-center" xs="12" sm="6">
      <v-card-text
        style="font-weight: 600; font-style: italic; color: #ffffff"
        :style="{ 'font-size': textSize, 'line-height': lineHeight }"
        class="text-center"
      >
        Cultrav; yapay zeka ve görüntü işleme teknolojisi kullanarak size merak
        ettiğiniz tüm tarihi yerler hakkında bilgi sunan bir uygulamadır. Sizin
        seyahatinizdeki ihtiyaçlarınızı karşılamayı görev edinmiş bir ekip
        olarak uygulama içinde tarihi bilgi vermenin dışında da birçok özellik
        barındırıyoruz. Gezilebilecek tüm yerleri hem harita üzerinde hem de
        şehir şehir listelerine ulaşarak keşfedebilir ve tek bir tıkla bu
        yerlerden kendinize özel bir rota oluşturabilirsiniz. Uygulamamızı
        kullanarak yaptığınız gezilerden sonra anılarınıza, gezdiğiniz yerlere
        bakarak geçmişe bir yolculuğa çıkmanın keyfini sürerken, ek olarak merak
        ettiğiniz tarihi yerler hakkında ön bilgi alarak ilginizi çekecek
        yerlerin neler olduğunu görebilirsiniz. İlk önce ülkemizin büyüleyici
        tarihi güzelliklerini sizinle buluşturan Cultrav, gerekli hazırlık
        süreçlerinin tamamlanmasıyla yurt dışında da sizin mutlukla seyahat
        etmenize yardımcı olacak. “Her Zaman Gezmek İstediğiniz Yerde!”
        sloganıyla çıktığımız bu yolda sizinle beraber yürümekten mutluluk
        duyuyoruz.</v-card-text
      >
    </v-col>
    <v-col class="d-flex align-center" xs="12" sm="6">
      <v-img
        height="100%"
        contain
        :src="require('../static/what-is-cultrav.png')"
      ></v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      textSize: '',
      titleSize: '',
      lineHeight: '',
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
        this.lineHeight = '35px'
      }
    },
  },
}
</script>

<style scoped>
.bg {
  background-color: #252525;
}
</style>
