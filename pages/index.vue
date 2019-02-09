<template>
  <section class="flex flex-row m-4">
    <div class="emoji-controller mt-8">
      <h1 class="text-5xl">Slack<br />Emoji<br />Generator</h1>

      <div class="mt-2">
        <h2 class="text-lg mb-2">Preset</h2>

        <li v-for="preset in presets" :key="preset.text">
          <preset-button
            :text="preset.text"
            :color="preset.color"
            :weight="preset.weight"
            v-on:click="onClickPreset"
          ></preset-button>
        </li>
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
      ],
      presets: [
        {
          text: 'おつ\nかれ',
          weight: 'bold',
          color: { r: 255, g: 0, b: 0, a: 1 }
        },
        {
          text: 'すご\nーい',
          weight: 'bold',
          color: { r: 255, g: 146, b: 0, a: 1 }
        },
        {
          text: '神',
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
      this.colors.rgba = preset.color
    }
  }
}
</script>

<style scoped>
.emoji-controller {
  min-width: 300px;
}

.emoji-display {
  max-width: 1100px;
}
</style>
