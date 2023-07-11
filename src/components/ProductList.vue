<template>
  <div class="product-card">
    <div class="img-container">
      <img class="product-img" :src="product.imgUrl" alt="product" />
    </div>
    <div class="product-card-info">
      <div class="product-card-info-container">
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="price">{{ product.price }}$</p>
        <p class="count">Available {{ product.count }}</p>
        <span class="btn-container">
          <button class="btn btn-info" @click="editProduct">Edit</button>
          <button class="btn btn-danger" @click="deleteProduct">Delete</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  emits: [
      'editProduct',
      'deleteProduct'
  ],
  methods: {
    editProduct() {
      this.$emit("editProduct", this.product.id);
    },
    deleteProduct() {
      this.$emit("deleteProduct", this.product.id);
    },
  },
};
</script>

<style scoped>
.product-card {
  width: 30vw;
  height: 13vw;
  border-radius: 0.5vw;
  display: flex;
  align-items: center;
  background-color: gray;
  justify-content: space-between;
  margin-top: 1vw;
}

.img-container {
  width: 13vw;
  height: 12vw;
  background-color: #838383;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-img {
  width: 10vw;
  height: 10vw;
}

.product-card-info {
  width: 16.5vw;
  height: 12vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.product-card-info-container {
  height: 12vw;
  width: 16vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  text-align: center;
}

.product-title {
  font-size: 1.2vw;
  font-weight: bold;
  color: white;
  width: 12vw;
  height: 2vw;
}

.count {
  font-size: 0.8vw;
  width: 12vw;
  height: 2vw;
  font-weight: bold;
  color: white;
}

.price {
  width: 12vw;
  height: 2vw;
  font-size: 0.8vw;
  font-weight: bold;
  color: white;
}

.btn-container {
  width: 12vw;
  height: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.btn {
  width: 10vw;
  height: 2vw;
  font-size: 1vw;
  font-weight: bold;
}
</style>
