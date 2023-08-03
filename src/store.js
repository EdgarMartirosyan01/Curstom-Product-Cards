import { createStore } from 'vuex';
import authenticationModule from "@/modules/authentification/authentication";
// import productManagement from "@/modules/productManagment/productManagement";
// import authMutations from "@/modules/authentification/authMutations";
// import productMutations from "@/modules/productManagment/productMutations";

const store = createStore({
    modules: {
        authenticationModule: authenticationModule,
        // productManagement: productManagement
    },
    mutations: {
        // ...authMutations,
        // ...productMutations,
    }
});

const storedUser = localStorage.getItem('currentUser');
if (storedUser) {
    store.commit('authenticationModule/setCurrentUser', JSON.parse(storedUser));
    store.commit('authenticationModule/setAuthenticated', true);
    // store.commit('productManagement/setProducts', JSON.parse(localStorage.getItem('products')) || []);
}

export default store;