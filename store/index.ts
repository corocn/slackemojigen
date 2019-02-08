export const state = () => ({
  fontLoaded: false
})

export const mutations = {
  activeWebFont (state) {
    state.fontLoaded = true
  }
}
