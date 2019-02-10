<template>
  <section class="flex flex-row m-4">
    <div class="emoji-controller mt-8">
      <h1 class="text-5xl">Slack<br />Emoji<br />Generator</h1>

      <div class="mt-2">
        <h2 class="text-lg mb-2">Preset</h2>
        <preset-button
          v-for="preset in presets"
          :key="preset.text"
          :text="preset.text"
          :img="preset.img"
          :color="preset.color"
          :weight="preset.weight"
          v-on:click="onClickPreset"
        ></preset-button>
      </div>

      <div class="mt-2">
        <h2 class="text-lg mb-2">Text</h2>
        <textarea v-model="text" class="border rounded w-1/2 h-16" />
      </div>

      <div class="mt-2">
        <h2 class="text-lg mb-2">Weight</h2>
        <button
          @click="setWeight('normal')"
          class="bg-white hover:bg-grey-lightest text-grey-darkest font-normal py-2 px-4 border border-grey-light rounded shadow"
        >
          Normal
        </button>
        <button
          @click="setWeight('bold')"
          class="bg-white hover:bg-grey-lightest text-grey-darkest font-bold py-2 px-4 border border-grey-light rounded shadow"
        >
          Bold
        </button>
      </div>

      <div class="mt-2">
        <h2 class="text-lg mb-2">Color</h2>
        <no-ssr placeholder="Picker Loading...">
          <sketch v-model="colors" />
        </no-ssr>
      </div>
    </div>
    <div class="emoji-display flex flex-wrap justify-start">
      <div v-for="family in fontFamilies" v-bind:key="family" class="m-6">
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
import PresetButton from '../components/PresetButton'

export default {
  components: {
    PresetButton,
    EmojiView,
    Sketch
  },
  asyncData() {
    return {
      text: 'えも\nじ',
      weight: 'normal',
      colors: { rbga: { r: 0, g: 0, b: 0, a: 1 } },
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
      ],
      presets: [
        {
          text: 'すご\nーい',
          img: '001_sugo-i.png',
          weight: 'bold',
          color: { r: 245, g: 166, b: 35, a: 1 }
        },
        {
          text: 'おつ\nかれ',
          img: '002_otsukare.png',
          weight: 'bold',
          color: { r: 255, g: 0, b: 0, a: 1 }
        },
        {
          text: '神',
          img: '003_god.png',
          weight: 'normal',
          color: { r: 0, g: 0, b: 0, a: 1 }
        }
      ]
    }
  },
  methods: {
    setWeight(value) {
      this.weight = value
    },
    onClickPreset(preset) {
      this.text = preset.text
      this.weight = preset.weight
      this.colors = { rgba: preset.color }
    }
  }
}
</script>

<style scoped>
.emoji-controller {
  min-width: 250px;
}

.emoji-display {
  max-width: 1100px;
}
</style>
