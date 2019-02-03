<template>
  <section class="container">
    <div>
      <EmojiView :text="text" :size="size" font-family="M PLUS Rounded 1c" />
      <textarea v-model="text" />
      <input v-model="size" type="number" />
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
      size: '100'
    }
  }
}
</script>
