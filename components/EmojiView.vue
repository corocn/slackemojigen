<template>
  <div class="wrapper mt-3 border-gray-lighter border-t border-solid p-2">
    <div class="emoji-view-header flex justify-between">
      <span class="font-name">{{ family }}</span>
      <fa
        icon="arrow-circle-down"
        class="text-black cursor-pointer"
        @click="onClickDownload"
      />
    </div>
    <div class="emoji-view-body mt-3">
      <emoji-canvas
        class="s128"
        :text="text"
        :size="size"
        :family="family"
        :color="color"
        :view-size="128"
        ref="canvas"
      ></emoji-canvas>
      <emoji-canvas
        class="s64"
        :text="text"
        :size="size"
        :family="family"
        :color="color"
        :view-size="64"
      ></emoji-canvas>
      <emoji-canvas
        class="s32"
        :text="text"
        :size="size"
        :family="family"
        :color="color"
        :view-size="32"
      ></emoji-canvas>
      <emoji-canvas
        class="s16"
        :text="text"
        :size="size"
        :family="family"
        :color="color"
        :view-size="16"
      ></emoji-canvas>
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

  onClickDownload() {
    ;(this.$refs.canvas as EmojiCanvas).download()
  }
}
</script>

<style scoped>
.wrapper {
  width: 274px;
}

.s64 {
  margin-bottom: 1px;
}
.s32 {
  margin-bottom: 2px;
}
.s16 {
  margin-bottom: 3px;
}
</style>
