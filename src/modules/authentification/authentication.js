import authActions from "@/modules/authentification/authActions";
import authMutations from "@/modules/authentification/authMutations";

const authenticationModule = {
    namespaced: true,
    state: {
        authenticated: false,
        currentUser: null,
    },
    actions: authActions,
    mutations: authMutations
}


export default authenticationModule

