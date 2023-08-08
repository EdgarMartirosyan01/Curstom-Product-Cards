<template>
  <div class="PopTopButtons">
    <el-button @click="openDialog"> {{$t('cars.AddCar')}} </el-button>
    <router-link class="goToProducts" to="/"> {{$t('cars.GoToProducts')}} </router-link>
  </div>

  <el-dialog @close="closeDialog" v-model="isDialogVisible" :title="$t('cars.AddToSellYourCar')">
    <el-form label-width="150px" style="max-width: 460px;" clearable autocomplete="off">
      <el-form-item :label="$t('cars.Brand')">
        <el-input
            maxlength="10"
            type="text"
            required
            :placeholder="$t('inputRequirements.Required')"
            clearable
            autocomplete="off"
            v-model="car.brand"
        />
      </el-form-item>
      <el-form-item :label="$t('cars.Model')">
        <el-input
            maxlength="10"
            type="text"
            required
            :placeholder="$t('inputRequirements.Required')"
            clearable
            autocomplete="off"
            v-model="car.model"
        />
      </el-form-item>
      <el-form-item :label="$t('cars.Year')">
        <el-input
            :placeholder="$t('inputRequirements.NotRequired')"
            type="text"
            clearable
            autocomplete="off"
            v-model="car.year"
        />
      </el-form-item>
      <el-form-item :label="$t('cars.Milage')">
        <el-input
            maxlength="10"
            type="number"
            required
            :placeholder="$t('inputRequirements.Required')"
            v-model="car.milage"
        />
      </el-form-item>
      <el-form-item :label="$t('cars.Price')">
        <el-input
            maxlength="10"
            type="number"
            required
            :placeholder="$t('inputRequirements.Required')"
            v-model="car.price"
        />
      </el-form-item>

      <el-button
          type="primary"
          native-type="submit"
          style="margin-left: 11.5vw"
          @click="createOrUpdateCar"
      >
        {{ editedCar ? $t('buttons.Update') : $t('buttons.Create') }}
      </el-button>
    </el-form>
  </el-dialog>
</template>

<script>
import { Car } from "@/components/SecondHomeComponents/Car";

export default {
  name: "PopUpCreator",
  props: {
    carContainer: Object, // Pass carContainer as a prop
  },
  data() {
    return {
      isDialogVisible: false,
      car: new Car("", "", "", "", ""), // Initialize with default values
      editingCarId: null,
      editedCar: null,
    };
  },
  methods: {
    openDialog() {
      this.isDialogVisible = true;
    },
    closeDialog() {
      this.isDialogVisible = false;
    },
    createOrUpdateCar() {
      if (this.editedCar) {
        this.carContainer.updateCar(this.editedCar.id, this.car);
      } else {
        const newCar = new Car(
            this.car.brand,
            this.car.model,
            this.car.year,
            this.car.milage,
            this.car.price
        );
        this.carContainer.addCar(newCar);
      }
      this.resetForm();
      this.closeDialog();
    },
    resetForm() {
      this.car = new Car("", "", "", "", ""); // Reset to default values
      this.editedCar = null;
    },
  },
};
</script>

<style>
  .PopTopButtons{
    width: auto;
    height: auto;
    display: flex;
    justify-content: space-between;
  }

  .goToProducts{
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
  }.goToProducts:hover{
       background-color: #498eff;
     color: white;
     transition: 0.5s;
   }
</style>