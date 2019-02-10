<template>
  <canvas
    width="200"
    height="200"
    v-bind:style="{
      width: viewSize + 'px',
      height: viewSize + 'px',
      backgroundColor: 'white',
      fontKerning: 'normal',
      textRendering: 'optimizeLegibility'
    }"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import FontFaceObserver from 'fontfaceobserver'
import download from 'downloadjs'
import tinycolor, { ColorFormats } from 'tinycolor2'

@Component
export default class EmojiCanvas extends Vue {
  @Prop({ type: String })
  text!: string

  @Prop({ type: String })
  color!: string

  @Prop({ type: Number })
  size!: number

  @Prop({ type: String })
  family!: string

  @Prop({ type: String })
  weight!: string

  @Prop({ type: Number })
  viewSize!: number

  ctx: CanvasRenderingContext2D | null = null

  mounted(): void {
    const el = this.$el as HTMLCanvasElement
    this.ctx = el.getContext('2d')

    const font = new FontFaceObserver(this.family)

    font.load().then(() => {
      this.draw()
    })
  }

  draw(): void {
    if (this.ctx) {
      this.ctx.fillStyle = `rgba(${this.rgba.r}, ${this.rgba.g}, ${
        this.rgba.b
      }, ${this.rgba.a})`
      this.ctx.textAlign = 'left'
      this.ctx.textBaseline = 'top'
      this.ctx.font = `${this.weight} ${this.size}px '${this.family}'`
      this.ctx.beginPath()
      this.ctx.clearRect(0, 0, 200, 200)

      const lines: Array<string> = this.text.split('\n')

      lines.map((value: string, index) => {
        if (this.ctx) {
          this.ctx.fillText(value, 0, index * 100, 200)
        }
      })
    }
  }

  get rgba(): ColorFormats.RGBA {
    return tinycolor(this.color || '#000000FF').toRgb()
  }

  download(): void {
    if (!this.text) {
      return
    }

    const img = (this.$el as HTMLCanvasElement).toDataURL('image/png')
    const filename = `${this.text.replace(/\s+/g, '')}.png`
    download(img, filename)
  }

  @Watch('text')
  onTextChange(): void {
    this.draw()
  }

  @Watch('color')
  onColorChange(): void {
    this.draw()
  }

  @Watch('family')
  onFamilyChange(): void {
    this.draw()
  }

  @Watch('size')
  onSizeChange(): void {
    this.draw()
  }

  @Watch('weight')
  onWeightChange(): void {
    this.draw()
  }

  @Watch('viewSize')
  onViewSizeChange(): void {
    this.draw()
  }
}
</script>
