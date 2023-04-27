export default {
    isAuthenticated: (state: any) => !!state.user,
    getUser: (state: any) => state.user,
};