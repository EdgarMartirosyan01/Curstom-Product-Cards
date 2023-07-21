const productMutations = {
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
};

export default productMutations;
