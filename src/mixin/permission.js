import store from "@/store"

export default {
  methods: {
    checkPermission(key) {
      const { roles: { points } } = store.state.user.userInfo
      if(points) {
        console.log(key);
        return points.some(e => e == key)
      }
      return false
    }
  }
}