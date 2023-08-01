const productMutations = {
    setProducts(state, products) {
        state.products = products; // No need to convert to Set here
    },
    // addProduct(state, product) {
    //     state.products.push(product); // Use push to add a product to the array
    // },
    // updateProduct(state, updatedProduct) {
    //     const index = state.products.findIndex((product) => product.id === updatedProduct.id);
    //     if (index !== -1) {
    //         state.products.splice(index, 1, updatedProduct); // Use splice to update the product in the array
    //     }
    // },
    deleteProduct(state, productId) {
        state.products = state.products.filter((product) => product.id !== productId); // Use filter to remove the product from the array
    },
};

export default productMutations;
