<template>
  <el-table :data="cars" style="width: 100%;">
    <el-table-column fixed prop="brand" :label="$t('cars.Brand')" width="150"/>
    <el-table-column prop="model" :label="$t('cars.Model')" width="150"/>
    <el-table-column prop="year" :label="$t('cars.Year')" width="120"/>
    <el-table-column prop="milage" :label="$t('cars.Milage')" width="120"/>
    <el-table-column prop="price" :label="$t('cars.Price')" width="120"/>
    <el-table-column fixed="right" :label="Operations" width="120">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="editCar(row)">{{ $t('buttons.Edit') }}</el-button>
        <el-button link type="primary" size="small" @click="confirmDeleteCar(row)">{{
            $t('buttons.Delete')
          }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
import {ElTable, ElTableColumn} from 'element-plus';
import {CarContainer} from "@/components/SecondHomeComponents/Car";

export default {
  name: "CarList",
  components: {
    ElTable,
    ElTableColumn,
  },
  emits: ["editCar", "confirmDeleteCar"],
  props: {
    cars: Array
  },
  data() {
    return {
      carContainer: new CarContainer(),
      tableData: [],
    };
  },
  methods: {
    editCar(car) {
      this.$emit("editCar", car);
    },
    confirmDeleteCar(car) {
      this.$emit("deleteCar", car.id);
    },
    // async loadCars() {
    //   this.tableData = await this.carContainer.getCars();
    // },
    // async addCar(newCar) {
    //   await this.carContainer.addCar(newCar); // Add car to container
    //   this.loadCars(); // Update the tableData immediately after adding a car
    // },
    // handleClick(row) {
    //   console.log('Detail clicked for:', row);
    //   // Implement your logic here to show the detail of the row
    // },
  },
};
</script>


<style scoped>

</style>