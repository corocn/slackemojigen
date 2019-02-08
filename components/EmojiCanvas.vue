<template>
  <canvas
    width="200"
    height="200"
    v-bind:style="{ width: viewSize + 'px', height: viewSize + 'px' }"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class EmojiCanvas extends Vue {
  @Prop({ type: String })
  text!: string

  @Prop({ type: Object })
  color!: any

  @Prop({ type: String })
  size!: number

  @Prop({ type: String })
  family!: string

  @Prop({ type: Number })
  viewSize!: number

  ctx: CanvasRenderingContext2D | null = null

  mounted(): void {
    const el = this.$el as HTMLCanvasElement
    this.ctx = el.getContext('2d')
    this.draw()
  }

  draw(): void {
    if (this.ctx) {
      this.ctx.textBaseline = 'top'
      this.ctx.textAlign = 'left'

      const { r, g, b, a } = this.color || { r: 0, g: 0, b: 0, a: 1 }
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
      this.ctx.font = `bold ${this.size}px '${this.family}'`
      this.ctx.beginPath()
      this.ctx.clearRect(0, 0, 200, 200)

      const lines: Array<string> = this.text.split('\n')

      lines.map((value: string, index) => {
        if (this.ctx) {
          this.ctx.fillText(value, 0, index * this.size)
        }
      })
    }
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

  @Watch('viewSize')
  onViewSizeChange(): void {
    this.draw()
  }
}
</script>
