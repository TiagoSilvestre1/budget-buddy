import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
    namespaced: true,
    state(): any {
        return {
            user: null,
        }
    },
    mutations,
    getters,
    actions,
}