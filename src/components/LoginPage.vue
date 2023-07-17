<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>

    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" v-model="email" placeholder="Email">
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" v-model="password" placeholder="Password">
    </div>

    <button class="btn btn-primary btn-block">Login</button>

    <p v-if="error" class="error-message">{{ error }}</p>
  </form>
</template>



<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    handleSubmit() {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const userData = JSON.parse(storedData);
        if (userData.email === this.email && userData.password === this.password) {
          this.$store.dispatch('login');
          this.$router.push('/');
        } else {
          this.error = 'Invalid email or password.';
        }
      } else {
        this.error = 'User not found.';
      }
    },
  },
};
</script>



<style>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
