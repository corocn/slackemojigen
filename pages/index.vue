<template>
  <section class="container">
    Slack絵文字ジェネレーター
    <div>
      <textarea v-model="text" />
      <input v-model="size" type="number" />
      <no-ssr placeholder="Picker Loading...">
        <sketch v-model="colors" />
      </no-ssr>
    </div>
    <div class="font-container">
      <div v-for="font in fonts" v-bind:key="font" class="box">
        <div>
          <span class="font-name">{{ font }}</span>
        </div>
        <EmojiView
          :text="text"
          :size="size"
          :font-family="font"
          :color="colors.rgba"
        />
      </div>
    </div>
  </section>
</template>

<script>
import EmojiView from '~/components/EmojiView.vue'
import { Sketch } from 'vue-color'

export default {
  components: {
    EmojiView,
    Sketch
  },
  asyncData() {
    return {
      text: 'すご\nーい',
      size: '100',
      colors: { rgba: { r: 245, g: 166, b: 35, a: 1 } },
      fonts: [
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
  methods: {}
}
</script>

<style scoped>
.font-container {
  display: flex;
  flex-flow: row wrap;
}

.box {
  padding: 20px;
}
</style>
