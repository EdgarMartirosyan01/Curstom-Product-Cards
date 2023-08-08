import { v4 as uuidv4 } from "uuid";


export class Car {
    constructor(brand, model, year, milage, price) {
        this.id = uuidv4();
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.milage = milage;
        this.price = price;
    }
}

export class CarContainer {
    constructor() {
        const savedCars = this.getCarsFromLocalStorage();
        if (savedCars) {
            this.cars = savedCars.map((car) =>
                new Car(car.brand, car.model, car.year, car.milage, car.price)
            );
        } else {
            this.cars = [];
        }
    }

    addCar(carData) {
        this.cars.push(carData);
        this.saveCarsToLocalStorage();
    }


    updateCar(carId, updatedCar) {
        const carIndex = this.cars.findIndex((car) => car.id === carId);
        if (carIndex !== -1) {
            this.cars[carIndex] = updatedCar;
            this.saveCarsToLocalStorage();
        }
    }

    deleteCar(carId) {
        this.cars = this.cars.filter((car) => car.id !== carId);
        this.saveCarsToLocalStorage()
    }

    getCars() {
        return this.cars;
    }

    getCarsFromLocalStorage() {
        return JSON.parse(localStorage.getItem("cars")) || [];
    }

    saveCarsToLocalStorage() {
        localStorage.setItem("cars", JSON.stringify(this.cars));
    }
}
