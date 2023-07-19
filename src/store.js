import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

const store = createStore({
    state: {
        authenticated: false,
        currentUser: null,
        products: [],
    },
    mutations: {
        setAuthenticated(state, value) {
            state.authenticated = value;
        },
        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        setProducts(state, products) {
            state.products = products;
        },
        addProduct(state, product) {
            state.products.push(product);
        },
        updateProduct(state, updatedProduct) {
            const index = state.products.findIndex((product) => product.id === updatedProduct.id);
            if (index !== -1) {
                state.products.splice(index, 1, updatedProduct);
            }
        },
        deleteProduct(state, productId) {
            state.products = state.products.filter((product) => product.id !== productId);
        },
    },
    actions: {
        register({ commit }, user) {
            // In a real application, you might want to add server-side validation and store the user data securely.
            commit('setCurrentUser', user);
            commit('setAuthenticated', true);
            localStorage.setItem('currentUser', JSON.stringify(user)); // Save user data to local storage
        },
        async login({ commit }, credentials) {
            const storedData = localStorage.getItem('currentUser');
            if (storedData) {
                const userData = JSON.parse(storedData);
                if (userData.email === credentials.email && userData.password === credentials.password) {
                    commit('setCurrentUser', userData);
                    commit('setAuthenticated', true);
                } else {
                    // Return an error message here instead of throwing an error
                    return Promise.reject('Invalid email or password.');
                }
            } else {
                // Return an error message here instead of throwing an error
                return Promise.reject('User not found.');
            }
        },
        logout({ commit }) {
            commit('setCurrentUser', null);
            commit('setAuthenticated', false);
            localStorage.removeItem('currentUser'); // Remove user data from local storage on logout
        },
        fetchProducts({ commit }) {
            const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
            commit('setProducts', storedProducts);
        },
        createProduct({ commit, state }, product) {
            const productData = { ...product, id: uuidv4() };
            commit('addProduct', productData);
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        updateProduct({ commit, state }, updatedProduct) {
            commit('updateProduct', updatedProduct);
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        deleteProduct({ commit, state }, productId) {
            commit('deleteProduct', productId);
            localStorage.setItem('products', JSON.stringify(state.products));
        },
    },
});

const storedUser = localStorage.getItem('currentUser');
if (storedUser) {
    store.commit('setCurrentUser', JSON.parse(storedUser));
    store.commit('setAuthenticated', true);
    store.dispatch('fetchProducts'); // Fetch products on initial load
}

export default store;

