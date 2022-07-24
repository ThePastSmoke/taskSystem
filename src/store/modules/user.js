// 状态
import { getToken, removeToken, setToken } from '@/utils/auth'

const state = {
  token: getToken()
}
// 修改状态
const mutations = {
  // 存储token vuex cookie
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  }
}
// 执行异步
const actions = {
  login(context, data) {
    context.commit('setToken', 111)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
