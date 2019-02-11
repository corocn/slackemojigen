<template>
  <img
    class="m-1 cursor-pointer"
    width="22"
    height="22"
    :src="imagePath"
    @click="click"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PresetButton extends Vue {
  @Prop({ type: String })
  text!: string

  @Prop({ type: String })
  img!: string

  @Prop({ type: String })
  weight!: string

  @Prop({ type: String })
  color!: string

  click(): void {
    this.$emit('click', {
      text: this.text,
      weight: this.weight,
      color: this.color
    })
  }

  get imagePath(): string {
    return `presets/${this.img}`
  }
}
</script>
