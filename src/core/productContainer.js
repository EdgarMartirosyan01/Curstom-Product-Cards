import { v4 as uuidv4 } from "uuid";

export class ProductContainer {
    constructor() {
        this.products = this.getProductsFromLocalStorage();
    }

    addProduct(productData) {
        if (productData.id) {
            // Editing an existing product
            this.updateProduct(productData);
        } else {
            // Creating a new product
            const product = { ...productData, id: uuidv4() };
            this.products.push(product);
        }
        this.saveProductsToLocalStorage();
    }

    updateProduct(updatedProduct) {
        const index = this.products.findIndex((product) => product.id === updatedProduct.id);
        if (index !== -1) {
            this.products.splice(index, 1, updatedProduct);
            this.saveProductsToLocalStorage();
        }
    }

    deleteProduct(productId) {
        this.products = this.products.filter((product) => product.id !== productId);
        this.saveProductsToLocalStorage();
    }

    getProducts() {
        return this.products;
    }

    getProductsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }

    saveProductsToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }
}

