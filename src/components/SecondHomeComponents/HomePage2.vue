<template>
  <div class="Home2Container">
    <div class="elPopUpContainer">
      <PopUpCreator
          @carCreated="addCar"
          :carContainer="carContainer"
          :editedCar="editedCar"
      />
    </div>

    <div class="elTableContainer">
      <CarList
         :cars="cars"
          @editCar="editCar"
          @deleteCar="confirmDeleteCar"
      />
    </div>
  </div>
</template>




<script>
import PopUpCreator from "@/components/SecondHomeComponents/PopUpCreator";
import CarList from "@/components/SecondHomeComponents/CarList";
import { CarContainer } from "@/components/SecondHomeComponents/Car"; // Import the CarContainer
import Swal from 'sweetalert2';

export default {
  name: "HomePage2",
  components: {
    PopUpCreator,
    CarList,
  },
  data() {
    return {
      carContainer: new CarContainer(),
      editingCarId:null,
      tableData: [
        // Initial car data
      ],
    };
  },
  computed: {
    cars() {
      return this.carContainer.getCars()
    }
  },
  methods: {
    addCar(newCar) {
      this.tableData.push(newCar);
    },
    updateCarList(){
      this.carContainer = new CarContainer()
    },
    editCar(car) {
      this.editedCar = { ...car };
    },
    confirmDeleteCar(index){
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
          this.carContainer.deleteCar(index);
          Swal.fire('Deleted', 'Car deleted successfuly!', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Product delete was cancelled', 'error')
        }
      });
    },
    resetForm() {
      this.car = {
        brand: '',
        model: '',
        year: null,
        milage: null,
        price: null
      }
    },
    // handleClick(row) {
    //   console.log('Detail clicked for:', row);
    //   // Implement your logic here to show the detail of the row
    // },
  },
};
</script>


<style>
  /*.Home2Container {*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  width: 100%;*/
  /*  height: auto;*/
  /*  align-items: center;*/
  /*  justify-content: space-around;*/
  /*}*/

  /*.elPopUpContainer{*/
  /*  width: 20vw;*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*  justify-content: center;*/
  /*  margin-bottom: 2vw;*/
  /*}*/

  /*.elTableContainer{*/

  /*}*/
</style>