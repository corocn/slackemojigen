<template>
  <canvas width="200" height="200" class="canvas" :memo="text + fontFamily" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class EmojiView extends Vue {
  @Prop({ type: String })
  text!: string

  @Prop({ type: String })
  size!: string

  @Prop({ type: String })
  fontFamily!: string

  ctx: CanvasRenderingContext2D | null = null

  mounted(): void {
    const el = this.$el as HTMLCanvasElement
    this.ctx = el.getContext('2d')
    this.draw()
  }

  draw(): void {
    if (this.ctx) {
      const size: number = parseFloat(this.size)

      this.ctx.textBaseline = 'top'
      this.ctx.textAlign = 'left'

      this.ctx.fillStyle = 'rgb(255, 165, 0)'
      this.ctx.font = `bold ${size}px '${this.fontFamily}'`
      this.ctx.beginPath()
      this.ctx.clearRect(0, 0, 200, 200)

      const lines: Array<string> = this.text.split('\n')

      lines.map((value: string, index) => {
        if (this.ctx) {
          this.ctx.fillText(value, 0, index * size)
        }
      })
    }
  }

  @Watch('text')
  onTextChange(): void {
    this.draw()
  }

  @Watch('size')
  onSizeChange(): void {
    this.draw()
  }

  @Watch('fontFamily')
  onFontFamilyChange(): void {
    this.draw()
  }
}
</script>

<style scoped>
canvas {
  border: 1px dotted lightgray;
}
</style>
