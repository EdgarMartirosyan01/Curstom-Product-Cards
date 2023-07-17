<template>
  <div class="homepage">
    <h1 class="create-product-h1">Create a Product</h1>

    <form @submit.prevent="createProduct">
      <div class="form-group">
        <label for="title">Title:</label>
        <input maxlength="10" type="text" class="form-control" id="title" v-model="product.title" required>
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input maxlength="10" type="number" class="form-control" id="price" v-model.number="product.price" required>
      </div>
      <div class="form-group">
        <label for="imgUrl">Image URL:</label>
        <input type="text" class="form-control" id="imgUrl" v-model="product.imgUrl" required>
      </div>
      <div class="form-group">
        <label for="count">Count:</label>
        <input maxlength="10" type="number" class="form-control" id="count" v-model.number="product.count" required>
      </div>
      <button type="submit" class="btn btn-info">Create</button>
    </form>

    <div class="product-list-container">
      <h2 class="product-list-container-h2">Product List</h2>
      <div class="product-list">
        <ProductList
            v-for="product in products"
            :key="product.id"
            :product="product"
            @editProduct="editProduct"
            @deleteProduct="confirmDeleteProduct"
        />
      </div>
    </div>

    <div v-if="products.length === 0">
      <p>No products available.</p>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import ProductList from './ProductList.vue';

export default {
  name: 'HomePage',
  components: {
    ProductList,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  data() {
    return {
      product: {
        title: '',
        price: null,
        imgUrl: '',
        count: null,
      },
      editingProductId: null,
    };
  },
  methods: {
    createProduct() {
      if (this.editingProductId) {
        const editedProductIndex = this.products.findIndex(
            (product) => product.id === this.editingProductId
        );
        if (editedProductIndex !== -1) {
          const updatedProduct = { ...this.product, id: this.editingProductId };
          this.$store.commit('updateProduct', updatedProduct);
          this.editingProductId = null;
        }
      } else {
        const productData = { ...this.product, id: uuidv4() };
        this.$store.dispatch('createProduct', productData);
      }
      this.resetForm();
    },
    resetForm() {
      this.product.title = '';
      this.product.price = null;
      this.product.imgUrl = '';
      this.product.count = null;
    },
    editProduct(productId) {
      const editedProduct = this.products.find((product) => product.id === productId);
      if (editedProduct) {
        this.product.title = editedProduct.title;
        this.product.price = editedProduct.price;
        this.product.imgUrl = editedProduct.imgUrl;
        this.product.count = editedProduct.count;
        this.editingProductId = productId;
      }
    },
    confirmDeleteProduct(productId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this product!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(productId);
          Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your product is safe.', 'error');
        }
      });
    },
    deleteProduct(productId) {
      this.$store.dispatch('deleteProduct', productId);
    },
  },
};
</script>


<style>
.homepage {
  width: 35vw;
  height: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.create-product-h1 {
  font-size: 3vw;
  font-weight: bold;
}

.product-list-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;
}
.product-list-container-h2{
  margin-top: 1vw;
}
.product-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.btn{
  margin-top: 1vw;
}

@media screen and (max-width: 600px) {
  .homepage {
    width: 90vw;
  }
}
</style>


