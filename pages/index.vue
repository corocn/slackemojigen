<template>
  <section class="container flex m-4">
    <div class="emoji-controller mt-8">
      <h1 class="text-5xl">Slack<br />Emoji<br />Generator</h1>

      <div class="mt-2">
        <h2 class="text-lg">Text</h2>
        <textarea v-model="text" />
        <button @click="setWeight('normal')">Normal</button>
        <button @click="setWeight('bold')">Bold</button>
      </div>

      <div>
        <h2 class="text-lg mt-2">Color</h2>
        <no-ssr placeholder="Picker Loading...">
          <sketch v-model="colors" />
        </no-ssr>
      </div>
    </div>
    <div class="emoji-display flex flex-row flex-wrap">
      <div v-for="family in fontFamilies" v-bind:key="family" class="p-6">
        <emoji-view
          :text="text"
          :family="family"
          :color="colors.rgba"
          :weight="weight"
        />
      </div>
    </div>
  </section>
</template>

<script>
import EmojiView from '~/components/EmojiView'
import { Sketch } from 'vue-color'

export default {
  components: {
    EmojiView,
    Sketch
  },
  asyncData() {
    return {
      text: 'あ',
      weight: 'bold',
      colors: { rgba: { r: 0, g: 0, b: 0, a: 1 } },
      fontFamilies: [
        'Noto Serif SC',
        'Noto Sans JP',
        'Noto Sans TC',
        'Kosugi Maru',
        'Noto Serif TC',
        'M PLUS 1p',
        'Sawarabi Mincho',
        'Noto Sans SC',
        'Sawarabi Gothic',
        'Noto Serif JP',
        'M PLUS Rounded 1c',
        'Kosugi'
      ]
    }
  },
  methods: {
    setWeight(value) {
      this.weight = value
    }
  }
}
</script>

<style scoped>
.emoji-controller {
  width: 300px;
}

.emoji-display {
  max-width: 1500px;
}
</style>
