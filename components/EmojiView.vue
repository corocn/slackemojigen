<template>
  <div>
    <span class="font-name">{{ family }}</span>
    <div class="wrapper">
      <emoji-canvas
        class="big"
        :text="text"
        :size="size"
        :family="family"
        :color="color"
        :view-size="128"
      ></emoji-canvas>
      <emoji-canvas
        class="slack"
        :text="text"
        :size="size"
        :family="family"
        :color="color"
        :view-size="48"
      ></emoji-canvas>
      <emoji-canvas
        class="slack-reaction"
        :text="text"
        :size="size"
        :family="family"
        :color="color"
        :view-size="20"
      ></emoji-canvas>
      <div class="download">
        <fa icon="download" class="text-black" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import EmojiCanvas from '~/components/EmojiCanvas.vue'

@Component({
  components: { EmojiCanvas }
})
export default class EmojiView extends Vue {
  @Prop({ type: String })
  text!: string

  @Prop({ type: String })
  size!: string

  @Prop({ type: Object })
  color!: any

  @Prop({ type: String })
  family!: string
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 128px 48px;
  grid-auto-rows: 58px 26px 44px;
}

.big {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.slack {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  margin: 5px;
}

.slack-reaction {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  margin: 5px;
}

.download {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  margin: 5px;
}
</style>
