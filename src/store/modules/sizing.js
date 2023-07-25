const state = () => ({
  sideLength: 0,
})

const getters = {
  getSideLength (state) {
    return state.sideLength
  }
}

const mutations = {
  changeSideLength (state, length) {
    state.sideLength = length
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
