<template>
  <div class="wrapper mb-3 border-gray-lighter border-t border-solid p-2">
    <div class="emoji-view-header flex justify-between">
      <span class="font-name">{{ family }}</span>
      <fa
        icon="download"
        class="text-black cursor-pointer"
        @click="onClickDownload"
      />
    </div>
    <div class="emoji-view-body mt-3">
      <emoji-canvas
        ref="canvas"
        class="s128"
        :text="text"
        :size="calculatedSize"
        :family="family"
        :color="color"
        :weight="weight"
        :view-size="128"
        :background-color="backgroundColor"
      />
      <emoji-canvas
        class="s32 mx-1"
        :text="text"
        :size="calculatedSize"
        :family="family"
        :color="color"
        :weight="weight"
        :view-size="40"
        :background-color="backgroundColor"
      />
      <emoji-canvas
        class="s16 mx-1"
        :text="text"
        :size="calculatedSize"
        :family="family"
        :color="color"
        :weight="weight"
        :view-size="20"
        :background-color="backgroundColor"
      />
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
  color!: string

  @Prop({ type: String })
  backgroundColor!: string

  @Prop({ type: String })
  family!: string

  @Prop({ type: String })
  weight!: string

  onClickDownload() {
    ;(this.$refs.canvas as EmojiCanvas).download()
  }

  get calculatedSize() {
    if (this.text.length === 1) {
      return 512
    }
    return 256
  }
}
</script>

<style scoped>
.wrapper {
  width: 280px;
}

.s64 {
  margin-bottom: 1px;
}
.s32 {
  margin-bottom: 3px;
}
.s16 {
  margin-bottom: 5px;
}
</style>
