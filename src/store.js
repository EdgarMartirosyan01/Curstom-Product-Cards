import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid'; // Add this line to import uuidv4

const store = createStore({
    state: {
        authenticated: false,
        products: [],
    },
    mutations: {
        setAuthenticated(state, value) {
            state.authenticated = value;
        },
        setProducts(state, products) {
            state.products = products;
        },
        addProduct(state, product) {
            state.products.push(product);
        },
        updateProduct(state, updatedProduct) {
            const index = state.products.findIndex(
                (product) => product.id === updatedProduct.id
            );
            if (index !== -1) {
                state.products.splice(index, 1, updatedProduct);
            }
        },
        deleteProduct(state, productId) {
            state.products = state.products.filter(
                (product) => product.id !== productId
            );
        },
    },
    actions: {
        login({ commit }) {
            commit('setAuthenticated', true);
        },
        logout({ commit }) {
            commit('setAuthenticated', false);
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

export default store;