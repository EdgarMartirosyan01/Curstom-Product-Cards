import { v4 as uuidv4 } from "uuid";

export class Product {
    constructor(name, price, count, imgUrl) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.count = count;
        this.imgUrl = imgUrl;
    }
}

export class ProductContainer {
    constructor() {
        const savedProducts = this.getProductsFromLocalStorage();
        if (savedProducts) {
            this.products = savedProducts.map((pr) => new Product(pr.name, pr.price, pr.count, pr.imgUrl));
        } else {
            this.products = [];
        }

        console.log(this.products);
    }

    addProduct(productData) {
        // if (productData.id) {
        //     // Editing an existing product
        //     this.updateProduct(productData);
        // } else {
        //     // Creating a new product
        //     const product = new Product(productData.name, productData.price, productData.count, productData.imgUrl);
        //     this.products.push(product);
        // }
        this.products.push(productData)
        this.saveProductsToLocalStorage();
    }

    updateProduct(updatedProduct) {
        let originalProduct = this.products[0]; //instanceof Product

        originalProduct.price = updatedProduct.price
        // const index = this.products.findIndex((product) => product.id === updatedProduct.id);
        // if (index !== -1) {
        //     this.products.splice(index, 1, updatedProduct);
        //     this.saveProductsToLocalStorage();
        // }
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

