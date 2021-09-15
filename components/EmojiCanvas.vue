<template>
  <canvas
    width="512"
    height="512"
    :style="{
      width: viewSize + 'px',
      height: viewSize + 'px',
      backgroundColor: backgroundColor,
      fontKerning: 'normal',
      textRendering: 'optimizeLegibility'
    }"
  ></canvas>
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

  @Prop({ type: String })
  backgroundColor!: string

  ctx: CanvasRenderingContext2D | null = null

  canvas: HTMLCanvasElement

  mounted(): void {
    this.canvas = this.$el as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')
    this.draw()
  }

  draw(): void {
    const font = new FontFaceObserver(this.family, { weight: this.weight })
    font.load(this.text).then(() => {
      if (this.ctx) {
        this.ctx.fillStyle = `rgba(${this.rgba.r}, ${this.rgba.g}, ${
          this.rgba.b
        }, ${this.rgba.a})`
        this.ctx.textAlign = 'left'
        this.ctx.textBaseline = 'middle'
        this.ctx.font = `${this.weight} ${this.size}px '${this.family}'`
        this.ctx.beginPath()
        this.ctx.clearRect(0, 0, 512, 512)

        const lines: Array<string> = this.text.split('\n')

        // 文字のトップがキャンバス外にはみ出る場合（Firefoxなど）それが収まるオフセットを探す。はみ出ない場合は0
        const topOverflowOffset = (() => {
          this.ctx.textBaseline = 'top'
          outer: for (let y = 0; y < 512; y++) {
            this.ctx.clearRect(0, 0, 512, 512)
            this.ctx.fillText(lines[0], 0, y, 512)
            const imageData = this.ctx.getImageData(0, 0, 512, 2).data
            for (let x = 0; x < 512; x++) {
              const alpha = imageData[x * 4 + 3]
              const hasPixel = alpha > 0
              if (hasPixel) {
                continue outer
              }
            }
            this.ctx.textBaseline = 'middle'
            this.ctx.clearRect(0, 0, 512, 512)
            return y
          }
        })()

        let offset = 512 / lines.length / 2

        if (lines.length === 1 && lines[0].length > 1) {
          // 1行だけの場合は、縦に引き伸ばす
          offset = 512 / 4
          this.ctx.scale(1, 2)
        } else if (
          lines.length > 1 &&
          lines[0].length === 1 &&
          lines[1].length === 1
        ) {
          // 1列だけの場合は、横に引き伸ばす
          this.ctx.scale(2, 1)
        }

        lines.map((value: string, index) => {
          if (this.ctx) {
            this.ctx.fillText(value, 0, topOverflowOffset + offset + index * 256, 512)
          }
        })

        // reset scale
        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
      }
    })
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

  @Watch('backgroundColor')
  onBackgroundColorChange(): void {
    this.draw()
  }
}
</script>
