const authActions = {
    register({ commit }, user) {
        commit('setAuthenticated', true);
        commit('setCurrentUser', user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    },
    async login({ commit }, credentials) {
        const storedData = localStorage.getItem('currentUser');
        if (storedData) {
            const userData = JSON.parse(storedData);
            if (userData.email === credentials.email && userData.password === credentials.password) {
                commit('setAuthenticated', true);
                commit('setCurrentUser', userData);
            } else {
                return Promise.reject('Invalid email or password.');
            }
        } else {
            return Promise.reject('User not found.');
        }
    },
    logout({ commit }) {
        commit('setAuthenticated', false);
        commit('setCurrentUser', null);
        localStorage.removeItem('currentUser');
    },
};

export default authActions;