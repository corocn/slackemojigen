<template>
  <section class="flex flex-row m-4 mt-8">
    <div class="emoji-controller">
      <div>
        <h2 class="text-lg mb-2">
          Preset
        </h2>
        <preset-button
          v-for="preset in presets"
          :key="preset.text"
          :text="preset.text"
          :img="preset.img"
          :color="preset.color"
          :weight="preset.weight"
          @click="onClickPreset"
        />
      </div>

      <div class="mt-2">
        <h2 class="text-lg mb-2">
          Text
        </h2>
        <textarea v-model="text" class="border rounded w-1/2 h-16" />
      </div>

      <div class="mt-2">
        <h2 class="text-lg mb-2">
          Weight
        </h2>
        <button
          v-for="w in weights"
          :key="w"
          class="bg-white hover:bg-grey-lightest text-grey-darkest text-sm m-1 py-1 px-4 border border-grey-light rounded-lg shadow"
          :style="{
            minWidth: '64px',
            fontWeight: w
          }"
          @click="setWeight(w)"
        >
          {{ w }}
        </button>
      </div>

      <div class="mt-2">
        <h2 class="text-lg mb-2">
          Color
        </h2>
        <no-ssr placeholder="Picker Loading...">
          <sketch v-model="colorPicker" />
        </no-ssr>
      </div>

      <div class="mt-4">
        <h2 class="text-lg mb-2">
          Readme
        </h2>
        <p class="m-1">
          <a href="https://fonts.google.com/" class="text-blue-dark"
            >Google Fonts</a
          >
          を使用しています。動作確認はChrome, Firefox, Safari。スマホ未検証（一応使える）。3行以上は未対応。描画がおかしかったらリロード推奨です。フィードバックや不具合連絡は
          <a href="https://twitter.com/corocn" class="text-blue-dark"
            >@corocn</a
          >
          まで。
        </p>
      </div>
    </div>
    <div class="emoji-display flex flex-wrap justify-start">
      <div v-for="family in fontFamilies" :key="family" class="mx-6 mb-6">
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
import { Sketch } from 'vue-color'
import tinycolor from 'tinycolor2'
import PresetButton from '../components/PresetButton'
import EmojiView from '~/components/EmojiView'

export default {
  components: {
    PresetButton,
    EmojiView,
    Sketch
  },
  asyncData() {
    return {
      text: 'えも\nじ',
      weight: '600',
      weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
      colorPicker: { hex8: '#CF375CFF' },
      fontFamilies: [
        'M PLUS 1p',
        'M PLUS Rounded 1c',
        'Noto Sans JP',
        'Noto Sans SC',
        'Noto Sans TC',
        'Noto Serif JP',
        'Noto Serif SC',
        'Noto Serif TC',
        'Kosugi',
        'Kosugi Maru',
        'Sawarabi Gothic',
        'Sawarabi Mincho'
      ],
      presets: [
        {
          text: 'すご\nーい',
          img: '001_sugo-i.png',
          weight: '700',
          color: '#E4B34BFF'
        },
        {
          text: 'おつ\nかれ',
          img: '002_otsukare.png',
          weight: '700',
          color: '#59B382FF'
        },
        {
          text: 'なる\nほど',
          img: '003_naruhodo.png',
          weight: '700',
          color: '#62C3EBFF'
        },
        {
          text: '神',
          img: '004_god.png',
          weight: '700',
          color: '#CF375CFF'
        },
        {
          text: 'ＬＧ\nＴＭ',
          img: '005_lgtm.png',
          weight: '900',
          color: '#E4B34BFF'
        },
        {
          text: '草',
          img: '006_kusa.png',
          weight: '700',
          color: '#59B382FF'
        },
        {
          text: 'お大\n事に',
          img: '007_odaijini.png',
          weight: '700',
          color: '#62C3EBFF'
        },
        {
          text: 'たす\nけて',
          img: '008_tasukete.png',
          weight: '400',
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
