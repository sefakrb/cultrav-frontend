<template>
  <v-row v-resize="onResize" class="ma-0 pa-0">
    <v-col cols="12">
      <v-card-title
        class="titleStyle"
        :class="
          colSize === '6' || colSize === '12' ? 'smallSize' : 'normalSize'
        "
        >Hem Gezip Hem De Öğrenmeye Başlayın!</v-card-title
      >
    </v-col>
    <v-col class="centerize" cols="12">
      <v-row class="centerize">
        <v-col v-for="item in items" :key="item.title" :cols="colSize">
          <v-card flat>
            <v-card flat class="pt-3">
              <v-img
                contain
                max-height="90px"
                :src="require('../static/' + item.image)"
              ></v-img>
            </v-card>

            <v-card-title
              style="font-weight: 600"
              class="text-center centerize"
              >{{ item.title }}</v-card-title
            >
            <v-card-text class="text-center">{{ item.text }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      colSize: '',
      items: [
        {
          image: 'kendi-rotani-olustur-1.png',
          title: 'Kendi rotanı oluştur',
          text: 'Bir şehirdeki tüm tarihi yerleri dilediğin an rotana ekleyebilir, seyahat sırasında bu rotayı takip edebilirsiniz.',
        },
        {
          image: 'tarihi-yerleri-kesfet-1.png',
          title: 'Tarihi yerleri keşfet',
          text: 'Uygulamanın kamerasını herhangi bir tarihi yere yönlendirerek yapay zekamızın sunacağı bilgilerin tadını çıkarabilirsiniz.',
        },
        {
          image: 'anilarini-tazele-1.png',
          title: 'Anılarını Tazele',
          text: 'Uygulamamızı kullanarak daha önce gezdiğin tarihi yerleri görebilir, geçmişe bir yolculuk yapabilirsiniz.',
        },
      ],
    }
  },
  methods: {
    onResize() {
      let width = window.innerWidth
      if (width < 700 && width > 420) {
        this.colSize = '6'
      } else if (width < 420) {
        this.colSize = '12'
      } else {
        this.colSize = '3'
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

.titleStyle {
  font-weight: 600;
  justify-content: center;
  text-align: center;
}

.smallSize {
  font-size: 1.6em;
}
.normalSize {
  font-size: 2em;
}
</style>
