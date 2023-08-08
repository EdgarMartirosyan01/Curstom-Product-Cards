<template>
  <div class="homepage">
    <h1 class="create-product-h1">{{$t('title.CreateProduct')}}</h1>
    <h3 class="productCountH3">{{$t('productCount')}} : {{postsCount}}</h3>

          <ProductForm :productContainer="productContainer" @productCreated="updateProductList" />
    <div class="product-list-container">
      <h2 class="product-list-container-h2">{{$t('title.ProductList')}}</h2>
      <div class="product-list">
        <router-link class="goingToHome2" to="/home2">{{$t('cars.GoToCars')}}</router-link>
          <ProductList
              v-for="product in products"
              :key="product.id"
              :product="product"
              @editProduct="editProduct"
              @deleteProduct="confirmDeleteProduct"
              @productDeleted="updateProductList"
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
import {ProductContainer,} from "@/core/productContainer";
import ProductForm from "@/elementPlus/ProductForm";

export default {
  name: 'HomePage',
  components: {
    ProductList,
    ProductForm
  },
  data() {
    return {
      productContainer: new ProductContainer(),
      editingProductId: null,
      editedProduct: null, // Initialize the editedProduct prop to null
    };
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
    updateProductList() {
      this.productContainer = new ProductContainer();
    },
    editProduct(productId) {
      this.editingProductId = productId;
      const editedProduct = this.products.find((product) => product.id === productId);
      if (editedProduct) {
        this.editedProduct = { ...editedProduct }; // Pass the edited product data to the ProductForm component
      }
    },
    confirmDeleteProduct(index) {
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
          this.productContainer.deleteProduct(index);
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

/*.creatingProductForm{*/
/*  width: 28vw;*/
/*  height: 21vw;*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  align-items: center;*/
/*  background-color: #167bff;*/
/*}*/

.creatingProductForm label {
  font-size: 1vw;
  font-weight: bold;
}

/*.form-groupProducts{*/
/*  width: 28vw;*/
/*  height: 4vw;*/
/*  display: flex;*/
/*  justify-content: space-between;*/
/*  align-items: center;*/
/*}*/
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

/*.btn{*/
/*  margin-top: 1vw;*/
/*  box-shadow: 0 1px 1px rgba(0,0,0,0.12),*/
/*  0 2px 2px rgba(0,0,0,0.12),*/
/*  0 4px 4px rgba(0,0,0,0.12),*/
/*  0 8px 8px rgba(0,0,0,0.12),*/
/*  0 16px 16px rgba(0,0,0,0.12);*/
/*  font-size: 1.2vw;*/
/*  font-weight: bold;*/
/*}*/

@media screen and (max-width: 600px) {
  .homepage {
    width: 90vw;
  }
}

.productCountH3{
  font-size: 1.5vw;
  font-weight: bold;
}

.goingToHome2{
  font-size: 1.2vw;
  font-weight: bold;
  color: black;
  text-decoration: none;
  background-color: #eff2ff;
  display: flex;
  justify-content: center;
  width: auto;
  height: 2.5vw;
  align-items: center;
  text-align: center;
  border-radius: 0.6vw;
  margin-top: 1vw;
}.goingToHome2:hover{
  background-color: #498eff;
  color: white;
  transition: 0.5s;
 }
</style>

<comment>
// mounted() {
// const product1 = new Product("Example 1", 100, 150, "https://www.freepnglogos.com/uploads/company-logo-png/bmw-car-company-logo-png-transparent-image-3.png");
// const product2 = new Product("Example 2", 200, 350, "https://e7.pngegg.com/pngimages/621/343/png-clipart-new-product-development-business-coupon-service-new-food-company.png");
// const product3 = new Product("Example 3", 300, 450, "https://img.lovepik.com/element_origin_pic/17/07/13/3636be6ae653b1d7395b50be98001c69.png_wh860.png");
// this.productContainer.addProduct(product1);
// this.productContainer.addProduct(product2);
// this.productContainer.addProduct(product3);
// console.log(this.productContainer)

// setInterval(() => {
//     this.productContainer.addProduct(product1)
// }, 2000)
// Get products from local storage and add them to the product container
// const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
// storedProducts.forEach((product) => {
//   this.productContainer.addProduct(product);
// });
// },
</comment>