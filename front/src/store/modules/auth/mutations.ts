export default {
    setUser(state: any, user: any) {
        state.user = user;
        localStorage.setItem('user', user);
        alert('Logged in with:  ' + user);
    },
};