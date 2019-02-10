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
          <sketch v-model="colorPicker" />
        </no-ssr>
      </div>
    </div>
    <div class="emoji-display flex flex-wrap justify-start">
      <div v-for="family in fontFamilies" v-bind:key="family" class="m-6">
        <emoji-view
          :text="text"
          :family="family"
          :color="colorPicker.hex8"
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
import tinycolor from 'tinycolor2'

export default {
  components: {
    PresetButton,
    EmojiView,
    Sketch
  },
  asyncData() {
    return {
      text: 'えも\nじ',
      weight: 'bold',
      colorPicker: { hex8: '#CF375CFF' },
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
          color: '#E4B34BFF'
        },
        {
          text: 'おつ\nかれ',
          img: '002_otsukare.png',
          weight: 'bold',
          color: '#59B382FF'
        },
        {
          text: 'なる\nほど',
          img: '003_naruhodo.png',
          weight: 'bold',
          color: '#62C3EBFF'
        },
        {
          text: '神',
          img: '004_god.png',
          weight: 'bold',
          color: '#CF375CFF'
        },
        {
          text: 'ハイ\nサイ',
          img: '005_haisai.png',
          weight: 'bold',
          color: '#E4B34BFF'
        },
        {
          text: '草',
          img: '006_kusa.png',
          weight: 'bold',
          color: '#59B382FF'
        },
        {
          text: 'お大\n事に',
          img: '007_odaijini.png',
          weight: 'bold',
          color: '#62C3EBFF'
        },
        {
          text: '仏',
          img: '008_hotoke.png',
          weight: 'normal',
          color: '#CF375CFF'
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

      const c = tinycolor(preset.color)
      this.colorPicker = Object.assign({}, this.colorPicker, {
        a: c.toRgb().a,
        hex: c.toHex(),
        hex8: c.toHex8(),
        rgba: c.toRgb()
      })
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
