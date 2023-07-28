<template>
  <div class="homepage">
    <h1 class="create-product-h1">{{$t('title.CreateProduct')}}</h1>
    <h3 class="productCountH3">{{$t('productCount')}} : {{postsCount}}</h3>
    <form @submit.prevent="createProduct" class="creatingProductForm">
      <div class="form-groupProducts">
        <label for="title">{{$t('inputs.Title')}}:</label>
        <input maxlength="10" type="text" class="form-control" id="title" v-model="product.title" required :placeholder="$t('inputRequirements.Required')">
      </div>
      <div class="form-groupProducts">
        <label for="price">{{$t('inputs.Price')}}:</label>
        <input maxlength="10" type="number" class="form-control" id="price" v-model.number="product.price" required :placeholder="$t('inputRequirements.Required')">
      </div>
      <div class="form-groupProducts">
        <label for="imgUrl">{{$t('inputs.ImageURl')}}:</label>
        <input type="text" class="form-control" id="imgUrl" v-model="product.imgUrl" :placeholder="$t('inputRequirements.NotRequired')">
      </div>
      <div class="form-groupProducts">
        <label for="count">{{$t('inputs.Count')}}:</label>
        <input maxlength="10" type="number" class="form-control" id="count" v-model.number="product.count" required :placeholder="$t('inputRequirements.Required')">
      </div>
      <button type="submit" class="btn btn-info">{{$t('buttons.Create')}}</button>
    </form>

    <div class="product-list-container">
      <h2 class="product-list-container-h2">{{$t('title.ProductList')}}</h2>
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
      <p>{{$t('title.NoProductsAvailable')}}.</p>
    </div>
  </div>
</template>



<script>
import ProductList from './ProductList.vue';
import Swal from 'sweetalert2';
import { ProductContainer } from "@/core/ProductContainer";

export default {
  name: 'HomePage',
  components: {
    ProductList,
  },
  data() {
    return {
      productContainer: new ProductContainer(),
      product: {
        title: '',
        price: null,
        imgUrl: '',
        count: null,
      },
    };
  },
  mounted() {
    // Get products from local storage and add them to the product container
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    storedProducts.forEach((product) => {
      this.productContainer.addProduct(product);
    });
  },
  computed: {
    products() {
      return this.productContainer.getProducts();
    },
    postsCount() {
      return this.products.length;
    },
  },
  methods: {
    createProduct() {
      this.productContainer.addProduct({ ...this.product });
      this.resetForm();
    },
    editProduct(productId) {
      const editedProduct = this.products.find((product) => product.id === productId);
      if (editedProduct) {
        this.product = { ...editedProduct };
      }
    },
    confirmDeleteProduct(productId) {
      Swal.fire({
        title: this.$t('alert.AreYouSure'),
        text: this.$t('alert.DeleteConfirmationMessage'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.$t('alert.alertButtons.DeleteConfirmationButton'),
        cancelButtonText: this.$t('alert.alertButtons.CancelConfirmationButton'),
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.productContainer.deleteProduct(productId);
          Swal.fire('Deleted', 'Product deleted successfully!', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Product delete was cancelled.', 'error');
        }
      });
    },
    resetForm() {
      this.product = {
        title: '',
        price: null,
        imgUrl: '',
        count: null,
      };
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

.creatingProductForm{
  width: 28vw;
  height: 21vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.creatingProductForm label {
  font-size: 1vw;
  font-weight: bold;
}

.form-groupProducts{
  width: 28vw;
  height: 4vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-groupProducts input {
  width: 18vw;
  height: 2.8vw;
  text-align: center;
  font-size: 1vw;
}
.creatingProductForm button {
  width: 10vw;
  height: 3vw;
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
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
  0 2px 2px rgba(0,0,0,0.12),
  0 4px 4px rgba(0,0,0,0.12),
  0 8px 8px rgba(0,0,0,0.12),
  0 16px 16px rgba(0,0,0,0.12);
  font-size: 1.2vw;
  font-weight: bold;
}

@media screen and (max-width: 600px) {
  .homepage {
    width: 90vw;
  }
}

.productCountH3{
  font-size: 1.5vw;
  font-weight: bold;
}
</style>


