<template>
  <v-row
    v-resize="onResize"
    style="padding-top: 5% !important; width: 100vw"
    class="ma-0 pa-0 d-flex justify-center"
  >
    <v-col
      style="padding-bottom: 2%; margin-bottom: 2%"
      class="d-flex justify-center"
      cols="12"
    >
      <v-card-title
        style="font-style: italic; font-weight: 800"
        :style="{ 'font-size': titleSize }"
        >Ekibimiz</v-card-title
      >
    </v-col>

    <v-col
      v-for="person in persons"
      :key="person.name"
      :cols="colSize"
      :class="colSize === '5' ? 'ma-2' : ''"
    >
      <v-card
        :min-height="
          colSize === '3'
            ? '60vh'
            : colSize === '4'
            ? '60vh'
            : colSize === '5'
            ? '60vh'
            : ''
        "
        style="
          display: flex;
          flex-direction: column;
          align-items: space-between;
        "
        flat
      >
        <v-img
          min-height="15vh"
          :max-height="colSize === '3' ? '40vh' : '30vh'"
          contain
          :src="require('../static/employee/' + person.image)"
        ></v-img>
        <div class="ma-0 pa-0">
          <v-card-title
            style="word-break: break-word; text-align: center"
            class="justify-center"
            >{{ person.title }}</v-card-title
          >
          <v-card-text
            style="word-break: break-word; text-align: center"
            class="text-center"
            >{{ person.text }}</v-card-text
          >
        </div>
      </v-card>
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
      colSize: '',
      persons: [
        {
          image: 'dogukan-ozalp.svg',
          title: 'Doğukan Özalp',
          text: 'Kurucu Ortak',
        },
        {
          image: 'yuksel-berkay-erdem.svg',
          title: 'Yüksel Berkay Erdem',
          text: 'Kurucu Ortak/Yazılımcı',
        },
        {
          image: 'nur-selin-senol.svg',
          title: 'Nur Selin Şenol',
          text: 'Kurucu Ortak/Dijital Pazarlama Sorumlusu',
        },
        {
          image: 'sefa-karabas.jpg',
          title: 'Sefa Karabaş',
          text: 'Yazılımcı',
        },
        {
          image: 'fatma-dilay-oguz.svg',
          title: 'Fatma Dilay Oğuz',
          text: 'UI&UX Tasarımcısı',
        },
        {
          image: 'tugce-mina-ergul.svg',
          title: 'Tuğçe Mina Ergül',
          text: 'İçerik Yazarı',
        },
      ],
    }
  },
  methods: {
    onResize() {
      if (window.innerWidth < 425) {
        this.textSize = '0.8em'
        this.titleSize = '1.6em'
        this.lineHeight = '15px'
        this.colSize = '5'
      } else if (window.innerWidth < 600) {
        this.textSize = '0.8em'
        this.titleSize = '2em'
        this.lineHeight = '16px'
        this.colSize = '4'
      } else if (window.innerWidth > 600 && window.innerWidth < 900) {
        this.textSize = '0.9em'
        this.titleSize = '3em'
        this.lineHeight = '25px'
        this.colSize = '4'
      } else if (window.innerWidth > 900 && window.innerWidth < 1200) {
        this.textSize = '1.1em'
        this.titleSize = '4em'
        this.lineHeight = '27px'
        this.colSize = '3'
      } else {
        this.textSize = '1.2em'
        this.titleSize = '4.5em'
        this.lineHeight = '35px'
        this.colSize = '3'
      }
    },
  },
}
</script>

<style></style>
