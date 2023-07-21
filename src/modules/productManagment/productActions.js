import {v4 as uuidv4} from "uuid";

const productActions = {

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
}

export default productActions