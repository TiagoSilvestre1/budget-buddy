export default {
  setUser(state: any, user: any) {
    state.user = user
    localStorage.setItem('user', user)
  }
}
