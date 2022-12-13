<template>
  <v-row class="ma-0 pa-0">
    <v-col class="d-flex justify-center" cols="12">
      <v-card-title style="font-style: italic; font-weight: 800; font-size: 5em"
        >Ekibimiz</v-card-title
      >
    </v-col>
    <v-col v-for="person in persons" :key="person.name" cols="3">
      <v-card class="d-flex flex-column align-center">
        <v-img
          max-height="50%"
          max-width="50%"
          contain
          :src="require('../static/employee/' + person.image)"
        ></v-img>
        <v-card-title class="justify-center">{{ person.title }}</v-card-title>
        <v-card-text class="text-center">{{ person.text }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      persons: [
        {
          image: 'sefa.jpg',
          title: 'Sefa Karabaş',
          text: 'Yazılımcı',
        },
      ],
    }
  },
}
</script>

<style></style>
