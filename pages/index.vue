<template>
  <section class="container">
    絵文字ジェネレーター
    <div>
      <textarea v-model="text" />
      <input v-model="size" type="number" />
    </div>
    <div class="font-container">
      <div v-for="font in fonts" v-bind:key="font" class="box">
        <div>
          <span class="font-name">{{ font }}</span>
        </div>
        <EmojiView :text="text" :size="size" :font-family="font" />
      </div>
    </div>
  </section>
</template>

<script>
import EmojiView from '~/components/EmojiView.vue'

export default {
  components: {
    EmojiView
  },
  data() {
    return {
      text: 'ああああ',
      size: '100',
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
  }
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
