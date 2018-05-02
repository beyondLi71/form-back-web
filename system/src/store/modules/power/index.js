import api from '@/api/api'
const state = {
  powerNav: {},
  powerData: {},
  personnelData: {}
}

const mutations = {
  changePowerNav (state, data) {
    state.powerNav = data
  },
  setPowerData (state, data) {
    state.powerData = data
  },
  setPersonnelData (state, data) {
    state.personnelData = data
  }
}

const actions = {
  getPowerData ({commit}) {
    api.configManage.getPowerList('5adec319d9dae869a2a705b6/example/power').then((res) => {
      commit('setPowerData', res.data)
    })
  },
  getpersonnel ({commit}) {
    api.configManage.getpersonnelList().then((res) => {
      commit('setPersonnelData', res.data)
    })
  }
}

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
}
