<template>
  <section class="flex flex-row m-4 mt-8">
    <div class="mt-2">
      <h2 class="text-lg mb-2">Text</h2>
      <textarea v-model="text" class="border rounded w-1/2 h-16" />
    </div>
    <div class="emoji-display flex flex-wrap justify-start">
      <div v-for="weight in weights" v-bind:key="weight" class="mx-6 mb-6">
        <span
          v-bind:style="{
            fontSize: '50px',
            fontFamily: family,
            fontWeight: weight
          }"
          >{{ weight }}</span
        >

        <emoji-view
          :text="text"
          :family="family"
          color="#000000FF"
          :weight="weight"
        />
      </div>
    </div>
  </section>
</template>

<script>
import EmojiView from '~/components/EmojiView'

export default {
  components: {
    EmojiView
  },
  asyncData() {
    return {
      text: 'おつ\nかれ',
      family: 'M PLUS Rounded 1c',
      weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
    }
  }
}
</script>

<style scoped>
.emoji-controller {
  max-width: 250px;
  min-width: 250px;
}

.emoji-display {
  max-width: 1100px;
}
</style>
