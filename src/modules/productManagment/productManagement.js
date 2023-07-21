import productActions from "@/modules/productManagment/productActions";
import productMutations from "@/modules/productManagment/productMutations";


const productManagement = {
    namespaced: true,
    state: {
        products: [],
    },
    actions: productActions,
    mutations: productMutations
}


export default productManagement
