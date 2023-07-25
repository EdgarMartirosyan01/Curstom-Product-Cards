const authMutations = {
    setAuthenticated(state, value) {
        state.authenticated = value;
    },
    setCurrentUser(state, user) {
        state.currentUser = user;
    },
};

export default authMutations;