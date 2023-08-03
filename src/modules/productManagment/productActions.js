// import { ProductContainer, Product } from "@/core/productContainer";
// const productContainer = new ProductContainer();

// const productActions = {
    // createProduct({ commit }, productData) {
    //     const newProduct = new Product(
    //         productData.title,
    //         productData.price,
    //         productData.count,
    //         productData.imgUrl
    //     );
    //
    //     productContainer.addProduct(newProduct);
    //     commit('setProducts', productContainer.getProducts());
    // },
    // updateProduct({ commit }, { productId, updatedData }) {
    //     productContainer.updateProduct(productId, updatedData);
    //     commit('setProducts', productContainer.getProducts());
    // },
    // deleteProduct({ commit, state }, productId) {
    //     const updatedProducts = state.products.filter((product) => product.id !== productId);
    //     commit('deleteProduct', productId);
    //     localStorage.setItem('products', JSON.stringify(updatedProducts));
    // },
// };

// export default productActions;