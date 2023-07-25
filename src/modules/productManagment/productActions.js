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
        const productsArray = [...state.products];
        const index = productsArray.findIndex((product) => product.id === updatedProduct.id);
        if (index !== -1) {
            productsArray[index] = updatedProduct;
            commit('updateProduct', new Set(productsArray));
            localStorage.setItem('products', JSON.stringify([...productsArray]));
        }
    },
    deleteProduct({ commit, state }, productId) {
        const updatedProducts = state.products.filter((product) => product.id !== productId);
        commit('deleteProduct', productId);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    },
}

export default productActions