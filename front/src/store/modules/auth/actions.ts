export default {
    async LogIn({commit}: any, user: any) {
        await commit("setUser", user.get("username"));
    },

    async LogOut({ commit }: any) {
        let user = null;
        commit("setUser", user);
    },
};