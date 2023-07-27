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
    deleteProduct({ commit, state }, productId) {
        const updatedProducts = state.products.filter((product) => product.id !== productId);
        commit('deleteProduct', productId);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    },
}

export default productActions