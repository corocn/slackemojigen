<template>
  <button @click="click">{{ text.replace(/\s+/g, '') }}</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PresetButton extends Vue {
  @Prop({ type: String })
  text!: string

  @Prop({ type: String })
  weight!: string

  @Prop({ type: Object })
  color!: any

  click(): void {
    this.$emit('click', {
      text: this.text,
      weight: this.weight,
      color: this.color
    })
  }
}
</script>
