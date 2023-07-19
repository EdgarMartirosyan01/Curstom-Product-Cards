<template>
  <div class="homepage">
    <h1 class="create-product-h1">{{$t('title.CreateProduct')}}</h1>
    <h2>{{postsCount}}</h2>
    <form @submit.prevent="createProduct">
      <div class="form-group">
        <label for="title">{{$t('inputs.Title')}}:</label>
        <input maxlength="10" type="text" class="form-control" id="title" v-model="product.title" required>
      </div>
      <div class="form-group">
        <label for="price">{{$t('inputs.Price')}}:</label>
        <input maxlength="10" type="number" class="form-control" id="price" v-model.number="product.price" required>
      </div>
      <div class="form-group">
        <label for="imgUrl">{{$t('inputs.ImageURl')}}:</label>
        <input type="text" class="form-control" id="imgUrl" v-model="product.imgUrl" required>
      </div>
      <div class="form-group">
        <label for="count">{{$t('inputs.Count')}}:</label>
        <input maxlength="10" type="number" class="form-control" id="count" v-model.number="product.count" required>
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
    postsCount() {
      return this.products.length;
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
        title: this.$t('alert.AreYouSure'), // Accessing translated string
        text: this.$t('alert.DeleteConfirmationMessage'), // Accessing translated string
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.$t('alert.alertButtons.DeleteConfirmationButton'), // Accessing translated string
        cancelButtonText: this.$t('alert.alertButtons.CancelConfirmationButton'), // Accessing translated string
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(productId);
          Swal.fire(this.$t('alert.delete.Deleted'), this.$t('alert.delete.ProductDeletedMessage'), 'success'); // Accessing translated string
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(this.$t('alert.cancel.CancelledTitle'), this.$t('alert.cancel.ProductSafeMessage'), 'error'); // Accessing translated string
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
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
  0 2px 2px rgba(0,0,0,0.12),
  0 4px 4px rgba(0,0,0,0.12),
  0 8px 8px rgba(0,0,0,0.12),
  0 16px 16px rgba(0,0,0,0.12);
}

@media screen and (max-width: 600px) {
  .homepage {
    width: 90vw;
  }
}
</style>


