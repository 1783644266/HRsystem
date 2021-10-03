import store from "@/store"

export default {
  methods: {
    checkPermission(key) {
      const { roles: { points } } = store.state.user.userInfo
      if(points) {
        return points.some(e => e == key)
      }
      return false
    }
  }
}