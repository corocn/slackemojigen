<template>
  <section class="flex flex-row m-4 mt-8">
    <div class="emoji-controller">
      <div>
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

      <div class="mt-2">
        <h2 class="text-lg mb-2">ReadMe</h2>
        <p class="m-1">
          <a href="https://fonts.google.com/" class="text-blue-dark"
            >Google Fonts</a
          >
          を使用しています。
        </p>
        <p class="m-1">
          フォントの読み込みが完了するまで適切に描画されません。スマホ対応
          してません。3行以上に対応していません。
        </p>
        <p class="m-1">
          フィードバックや不具合連絡は
          <a href="https://twitter.com/corocn" class="text-blue-dark"
            >@corocn</a
          >
          まで。現状Chromeのみで動作確認しています。
        </p>
      </div>
    </div>
    <div class="emoji-display flex flex-wrap justify-start">
      <div v-for="family in fontFamilies" v-bind:key="family" class="mx-6 mb-6">
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
  max-width: 250px;
  min-width: 250px;
}

.emoji-display {
  max-width: 1100px;
}
</style>
