const productMutations = {
    setProducts(state, products) {
        // Use a Set to ensure unique products based on their IDs
        state.products = new Set(products);
    },
    addProduct(state, product) {
        state.products.add(product); // Use the add() method of Set to add a unique product
    },
    updateProduct(state, updatedProduct) {
        const index = state.products.findIndex((product) => product.id === updatedProduct.id);
        if (index !== -1) {
            state.products[index] = updatedProduct;
        }
    },
    deleteProduct(state, productId) {
        state.products = new Set([...state.products].filter((product) => product.id !== productId));
    },
};

export default productMutations;

