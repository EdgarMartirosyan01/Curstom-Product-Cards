import { v4 as uuidv4 } from "uuid";

export class Product {
    constructor(title, price, count, imgUrl) {
        this.id = uuidv4();
        this.title = title;
        this.price = price;
        this.count = count;
        this.imgUrl = imgUrl;
    }
}

export class ProductContainer {
    constructor() {
        const savedProducts = this.getProductsFromLocalStorage();
        if (savedProducts) {
            this.products = savedProducts.map((pr) => new Product(pr.title, pr.price, pr.count, pr.imgUrl));
        } else {
            this.products = [];
        }
        // console.log(this.products);
    }

    addProduct(productData) {
        this.products.push(productData)
        this.saveProductsToLocalStorage();
    }
    updateProduct(productId, updatedData) {
        const productIndex = this.products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            const originalProduct = this.products[productIndex];
            this.products[productIndex] = new Product(
                updatedData.title || originalProduct.title,
                updatedData.price || originalProduct.price,
                updatedData.count || originalProduct.count,
                updatedData.imgUrl || originalProduct.imgUrl
            );
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
        return JSON.parse(localStorage.getItem("products")) || [];
    }
    saveProductsToLocalStorage() {
        localStorage.setItem("products", JSON.stringify(this.products));
    }
}