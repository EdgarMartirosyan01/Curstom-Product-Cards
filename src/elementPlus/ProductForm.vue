<template>
  <el-form
      label-width="150px"
      :model="product"
      style="max-width: 460px;"
      @submit.prevent="createOrUpdateProduct"
      clearable
      autocomplete="off"
  >
    <el-form-item :label="$t('inputs.Title') + ':'" prop="title">
      <el-input
          v-model="product.title"
          maxlength="10"
          type="text"
          required
          :placeholder="$t('inputRequirements.Required')"
          clearable
          autocomplete="off"
      />
    </el-form-item>

    <el-form-item :label="$t('inputs.Price') + ':'" prop="price">
      <el-input
          v-model.number="product.price"
          maxlength="10"
          type="number"
          required
          :placeholder="$t('inputRequirements.Required')"
          clearable
          autocomplete="off"
      />
    </el-form-item>

    <el-form-item :label="$t('inputs.ImageURl') + ':'" prop="imgUrl">
      <el-input
          v-model="product.imgUrl"
          :placeholder="$t('inputRequirements.NotRequired')"
          type="text"
          clearable
          autocomplete="off"
      />
    </el-form-item>

    <el-form-item :label="$t('inputs.Count') + ':'" prop="count">
      <el-input
          v-model.number="product.count"
          maxlength="10"
          type="number"
          required
          :placeholder="$t('inputRequirements.Required')"
      />
    </el-form-item>

    <el-button type="primary" native-type="submit" style="margin-left: 11.5vw ">
      {{ editedProduct ? $t('buttons.Update') : $t('buttons.Create') }}
    </el-button>
  </el-form>
</template>

<script>
import { Product } from "@/core/productContainer";

export default {
  name: 'ProductForm',
  props: {
    productContainer: Object,
    editedProduct: Object, // Add editedProduct as a prop
  },
  data() {
    return {
      product: {
        title: '',
        price: null,
        imgUrl: '',
        count: null,
      },
    };
  },
  computed: {
    // ... (other computed properties)
  },
  watch: {
    // Watch for changes in the editedProduct prop and update the form data accordingly
    editedProduct: {
      handler(newProductData) {
        this.product = { ...newProductData };
      },
      immediate: true,
    },
  },
  methods: {
    createOrUpdateProduct() {
      if (this.editedProduct) {
        // Update the existing product
        this.productContainer.updateProduct(this.editedProduct.id, this.product);
      } else {
        // Create a new product
        const newProduct = new Product(
            this.product.title,
            this.product.price,
            this.product.count,
            this.product.imgUrl
        );
        this.productContainer.addProduct(newProduct);
      }

      this.$emit('productCreated'); // Emit the event when a product is created or updated
      this.resetForm();
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



<!--<form @submit.prevent="createProduct" class="creatingProductForm">-->
<!--<div class="form-groupProducts">-->
<!--  <label for="title">{{$t('inputs.Title')}}:</label>-->
<!--  <input maxlength="10" type="text" class="form-control" id="title" v-model="product.title" required :placeholder="$t('inputRequirements.Required')">-->
<!--</div>-->




<!--<div class="form-groupProducts">-->
<!--  <label for="price">{{$t('inputs.Price')}}:</label>-->
<!--  <input maxlength="10" type="number" class="form-control" id="price" v-model.number="product.price" required :placeholder="$t('inputRequirements.Required')">-->
<!--</div>-->


<!--<div class="form-groupProducts">-->
<!--  <label for="imgUrl">{{$t('inputs.ImageURl')}}:</label>-->
<!--  <input type="text" class="form-control" id="imgUrl" v-model="product.imgUrl" :placeholder="$t('inputRequirements.NotRequired')">-->
<!--</div>-->


<!--<div class="form-groupProducts">-->
<!--  <label for="count">{{$t('inputs.Count')}}:</label>-->
<!--  <input maxlength="10" type="number" class="form-control" id="count" v-model.number="product.count" required :placeholder="$t('inputRequirements.Required')">-->
<!--</div>-->



<!--<button type="submit" class="btn btn-info">{{$t('buttons.Create')}}</button>-->
<!--</form>-->