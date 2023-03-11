<template>
  <article>
    <v-card
      rounded="xl"
      style="padding: 5rem; max-width: 100%; overflow-y: auto"
    >
      <nuxt-content :document="article" />
    </v-card>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('blog', params.slug).fetch()

    return { article }
  },
}
</script>

<style>
article {
  display: block;
  margin: 0 auto;
  padding: 50px 30px;
  max-width: 800px;
}

h1 {
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 30px;
}
</style>
