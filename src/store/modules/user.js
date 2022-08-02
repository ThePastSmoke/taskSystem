// 状态
import { getToken, removeToken, setToken } from '@/utils/auth'
import router from '@/router'

const state = {
  token: getToken(),
  navbarList: []
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
  },
  // 添加list
  initList(state, data) {
    state.navbarList.push(data)
  },
  //  删除list
  delList(state, data) {
    if (data === '') {
      state.navbarList = []
      router.push('/')
    } else {
      state.navbarList = state.navbarList.filter((i) => i !== data)
    }
  },
  //  删除除了这个的list
  delListOnes(state, data) {
    state.navbarList = state.navbarList.filter((i) => i === data)
  },
  //  关闭右侧list
  delRightList(state, data) {
    const index = state.navbarList.indexOf(data)
    state.navbarList.splice(index + 1, state.navbarList.length - index - 1)
  },
  //  关闭左侧list
  delLeftList(state, data) {
    const index = state.navbarList.indexOf(data)
    state.navbarList.splice(0, index)
  }
}
// 执行异步
const actions = {
  login(context, data) {
    context.commit('setToken', 111)
  }
  // 存储navbar的list
  // initlist(context, data) {}
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
