export default {
  async SelectProject({ commit }: any, project: any) {
    await commit('setProject', project)
  }
}
